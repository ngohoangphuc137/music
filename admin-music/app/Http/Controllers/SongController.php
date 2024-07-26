<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SongRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Database\Eloquent\Builder;
use App\Jobs\UploadMp3ToS3;
use App\Http\Resources\SongsResource;

use App\Models\Artist;
use App\Models\MusicGenre;
use App\Models\Album;
use App\Models\Song;
use App\Models\SongComposer;
use App\Models\SongImplementer;
use App\Models\AlbumArtist;
use App\Models\AlbumGenre;
use App\Models\AlbumSong;
use App\Http\Controllers\ConvertVnCharset;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

use getID3;

class SongController extends Controller
{
    const PATH_UPLOAD_SONG = 'songs';
    const PATH_UPLOAD_ALBUM = 'albums';
    const PATH_VIEW = 'admin.songs.';
    const PATH_LINK_SONG = '/bai-hat/';
    const PATH_LINK_ALBUM = '/album/';
    /**
     * Display a listing of the resource.
     */
    public $convertVnCharset;
    public function __construct()
    {
        $this->convertVnCharset = new ConvertVnCharset();
    }
    public function index()
    {
        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();

        return view(self::PATH_VIEW . 'index', compact(['musicGenre']));
    }
    public function apiSongs($id)
    {
        $genre = MusicGenre::query()->select(['id'])->descendantsOf($id);
        $pluckGenreId = collect($genre)->pluck('id');
        $songs = Song::query()
            ->select([
                "id",
                "music_genre_id",
                "name",
                'thumbnail',
                "alias",
                "audio_file",
                "duration",
                DB::raw("DATE_FORMAT(release_date,'%d-%m-%Y') as release_date"),
                "total_listens",
                "isOffical",
                "isPrivate"
            ])
            ->with([
                'artist:id,name',
                'song_composers:id,name',
                'music_genre:id,name_genre',
            ])
            ->whereIn('music_genre_id', $pluckGenreId->isEmpty() ? [$id] : $pluckGenreId)
            ->whereRaw('isOffical=true')
            ->orderBy('id', 'asc')
            ->get();
        $data = SongsResource::collection($songs);

        return response()->json([
            'data' => $data,
            'status_code' => 200,
            'message' => 'ok'
        ]);
    }
    public function apiGenre($id)
    {
        $musicGenre = MusicGenre::query()
            ->select(['id', 'name_genre', 'alias', '_lft', '_rgt'])
            ->with('ancestors:id,name_genre,alias,_lft,_rgt')->findOrFail($id);
        $musicGenre->makeHidden(['_lft', '_rgt']);
        $parent = $musicGenre->ancestors->isEmpty() ? $musicGenre : $musicGenre->ancestors[0];
        unset($musicGenre->ancestors);
        $musicGenre['parent'] = [
            'id' => $parent->id,
            'name_genre' => $parent->name_genre,
            'alias' => $parent->alias,
        ];
        $musicGenre['childs'] = MusicGenre::query()->select(['id', 'name_genre', 'alias'])->where('parent_id', '=', $parent->id)->get();

        return response()->json([
            'data' => $musicGenre
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $artists = Artist::query()->select(['id', 'name'])->get();

        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();

        $album = Album::query()->select(['id', 'title'])->get();

        return view(self::PATH_VIEW . 'create', compact(['artists', 'musicGenre', 'album']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SongRequest $request)
    {
        try {

            DB::beginTransaction();

            $data = $this->prepareSongData($request);
            $song = $this->createSong($data);
            $this->createComposersAndImplementer($request, $song);
            if ($request->albumSelect == 'createAlbum') {
                $this->createAlbum($request, $song);
            }
            if ($request->albumSelect == 'chooseAlbum') {
                $this->chooseAlbum($request, $song);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Thêm thành công');
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->with('error', $exception->getMessage());
        }
    }

    public function prepareSongData($request)
    {
        $getID3 = new getID3;
        $duratio = $getID3->analyze($request->audio_file);

        $data = $request->except(['thumbnail', 'audio_file', 'album', 'albumSelect', 'song_composers', 'artits']);
        $data['isOffical'] ??= 0;
        $data['isPrivate'] ??= 0;
        $data['alias'] = $this->convertVnCharset->convertVnCharset($request->name);
        $data['duration'] = $duratio['playtime_seconds'];

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD_SONG, $request->file('thumbnail'));
        }
        if ($request->hasFile('audio_file')) {
            $file = $request->file('audio_file');
            $filePath = $file->store('temp');
            $audioFilePath = $request->file('audio_file')->store('temp', 'public');
            $data['audio_file'] = 'songs/' . basename($filePath);
            UploadMp3ToS3::dispatch($audioFilePath);
        }

        return $data;
    }
    public function createSong($data)
    {
        $song = Song::query()->create($data);
        $song->link = self::PATH_LINK_SONG . $song->alias . '/' . $song->id;
        $song->save();

        return $song;
    }
    public function createComposersAndImplementer($request, $song)
    {
        // thêm nghệ sĩ sáng tác
        foreach ($request->song_composers as $value) {
            SongImplementer::query()->create([
                'song_id' => $song->id,
                'artist_id' => $value
            ]);
        }
        //Thêm nghệ sĩ thực hiện bài hát 
        foreach ($request->artits as $value) {
            SongComposer::query()->create([
                'song_id' => $song->id,
                'artist_id' => $value
            ]);
        }
    }
    public function createAlbum($request, $song)
    {
        $nameArtits = $this->getArtistAlias($request);
        $genre = MusicGenre::query()
            ->select(['id', 'parent_id'])
            ->ancestorsAndSelf($request->music_genre_id);
        $dataAlbum = [
            'title' => $request->name,
            'aliasTitle' => $song->alias . $nameArtits,
            'thumbnail' => $request->hasFile('thumbnail') ? Storage::put(self::PATH_UPLOAD_ALBUM, $request->file('thumbnail')) : null,
        ];

        $album = Album::query()->create($dataAlbum);

        foreach ($request->artits as $value) {
            AlbumArtist::query()->create([
                'album_id' => $album->id,
                'artist_id' => $value
            ]);
        }
        foreach ($genre as $value) {
            AlbumGenre::query()->create([
                'album_id' => $album->id,
                'music_genre_id' => $value->id
            ]);
        }
        AlbumSong::query()->create([
            'album_id' => $album->id,
            'song_id' => $song->id
        ]);

        $album->link = self::PATH_LINK_ALBUM . $album->aliasTitle . '/' . $album->id;
        $album->save();
    }
    public function chooseAlbum($request, $song)
    {
        AlbumSong::query()->create([
            'album_id' => $request->album,
            'song_id' => $song->id
        ]);
    }
    public function getArtistAlias($request)
    {
        $nameArtits = null;
        $artits = Artist::query()->select(['alias'])->whereIn('id', $request->artits)->get();
        foreach ($artits as $value) {
            $nameArtits .= '-' . $value->alias;
        }
        return $nameArtits;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $song = Song::query()
            ->select(['id', 'music_genre_id', 'name', 'thumbnail', 'audio_file', 'release_date', 'lyrics', 'isOffical', 'isPrivate'])
            ->with(['song_composers:id', 'artist:id'])
            ->findOrFail($id);

        $artists = Artist::query()
            ->select(['id', 'name'])
            ->with([
                'songComposers' => function ($query) use ($id) {
                    $query->select(['id','song_id','artist_id'])->where('song_id', $id);
                },
                'songImplementers'=>function ($query) use ($id) {
                    $query->select(['id','song_id','artist_id'])->where('song_id', $id);
                }
            ])
            ->get();

        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();

        //dd($artists->toArray());
        return view(self::PATH_VIEW . 'edit', compact(['artists', 'musicGenre', 'song']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->except(['thumbnail', 'audio_file', 'song_composers']);
        $data['isOffical'] ??= 0;
        $data['isPrivate'] ??= 0;
        $composers  = collect($request->artits)->toArray();

        $song_composers = SongComposer::query()->where('song_id', $id)->get()->pluck('artist_id')->toArray();

        $a = array_diff($composers, $song_composers);
        dd($data, $song_composers, $composers, $a);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $song = Song::query()->findOrFail($id);
            $songComposer = SongComposer::query()->where('song_id', '=', $song->id)->get();
            $songmplementer = SongImplementer::query()->where('song_id', '=', $song->id)->get();
            $AlbumSong = AlbumSong::query()->where('song_id', $song->id)->get();
            DB::beginTransaction();
            foreach ($songComposer as $value) {
                $value->delete();
            }
            foreach ($songmplementer as $value) {
                $value->delete();
            }
            if (!$AlbumSong->isEmpty()) {
                foreach ($AlbumSong as $value) {
                    $value->delete();
                }
            }
            $song->delete();
            if (Storage::disk('s3')->exists($song->audio_file)) {
                Storage::disk('s3')->delete($song->audio_file);
            }
            if (Storage::exists($song->thumbnail) & !empty($song->thumbnail)) {
                Storage::delete($song->thumbnail);
            }
            DB::commit();
            return response()->json([
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } catch (\Exception  $e) {
            DB::rollBack();
            return response()->json([
                'status_code' => 500,
                'message' => 'lỗi máy chủ'
            ]);
        }
    }
    public function testQueues(Request $request)
    {
        $file = $request->file('file');
        $filePath = $file->store('temp');
        $audioFilePath = $request->file('file')->store('temp', 'public');
        UploadMp3ToS3::dispatch($audioFilePath);
        //dd('songs/' . basename($filePath));
    }
}
