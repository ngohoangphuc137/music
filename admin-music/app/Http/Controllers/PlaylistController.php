<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Models\Album;
use App\Models\AlbumSong;
use App\Models\AlbumGenre;
use App\Models\Artist;
use App\Models\MusicGenre;
use App\Models\Song;
use App\Http\Controllers\ConvertVnCharset;


class PlaylistController extends Controller
{
    const PATH_VIEW_PLAYLIST = 'admin.playlists.';
    const PATH_UPLOAD = 'albums';
    public $convertVnCharset;
    public function __construct()
    {
        $this->convertVnCharset = new ConvertVnCharset();
    }
    public function playList()
    {
        $album = Album::query()
            ->select(['id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
            ->with([
                'albumArtists:id,name',
                'albumGenres:id,name_genre',
            ])
            ->withCount('albumSongs')
            ->where('isAlbum', false)
            ->get();
        return view(self::PATH_VIEW_PLAYLIST . 'index', compact('album'));
    }
    public function create()
    {
        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', '_lft', '_rgt', 'parent_id'])
            ->withDepth()
            ->get()
            ->toFlatTree();
        return view(self::PATH_VIEW_PLAYLIST . 'create', compact(['genre']));
    }
    public function createPlayList(Request $request){
        try {
            $data = $request->except('thumbnail', 'artists', 'genre');
            $nameArtits = $this->getArtistAlias($request);

            $data['aliasTitle'] = $this->convertVnCharset->convertVnCharset($request->title);
            $data['user_id'] = Auth::user()->id;
            $data['isAlbum'] = 0;

            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
            }

            $album = Album::query()->create($data);
            //create data in table 
            foreach ($request->genre as $value) {
                AlbumGenre::query()->create([
                    'album_id' => $album->id,
                    'music_genre_id' => $value
                ]);
            }
            return redirect()->back()->with('success', 'Thêm thành công');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }
    public function getArtistAlias($request)
    {
        $nameArtits = null;
        $artits = Artist::query()->select(['alias'])->whereIn('id', collect($request->artists))->get();
        $nameArtits = collect($artits)->pluck('alias')->implode('-');
        return $nameArtits;
    }
    public function edit(string $id)
    {
        $album = Album::query()
            ->select(['id', 'title', 'isAlbum', 'description'])
            ->with(['albumArtists:id,name', 'albumGenres:id,name_genre'])
            ->findOrFail($id);


        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', '_lft', '_rgt', 'parent_id'])
            ->with(['album' => function ($query) use ($album) {
                $query->where('album_id', $album->id);
            }])
            ->withDepth()
            ->get()
            ->toFlatTree();
        return view(self::PATH_VIEW_PLAYLIST . __FUNCTION__, compact(['genre', 'album']));
    }
    public function update(Request $request, string $id)
    {
        $album = Album::query()->findOrFail($id);
        $data = $request->except(['thumbnail']);
        $data['isAlbum'] ??= 0;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
        }
        if ($request->hasFile('thumbnail') && Storage::exists($album->thumbnail)) {
            Storage::delete($album->thumbnail);
        }

        $album->update($data);

        $genre = collect($request->genre)->toArray();

        $album_genres = AlbumGenre::query()->where('album_id', $id)->get()->pluck('music_genre_id')->toArray();

        $this->updateAlbum_Artist_Genre($genre, $album_genres, $id);

        return back()->with('success', 'Sửa thành công');
    }
    public function updateAlbum_Artist_Genre($dataRequest, $dataTable, $id_album)
    {

        $getDiffDataRequest = array_diff($dataRequest, $dataTable);
        $getIntersect = array_intersect($dataRequest, $dataTable);
        $getDiffDataTable = array_diff($dataTable, $dataRequest);
        try {
            DB::beginTransaction();
            if ($dataTable == $getIntersect) {
                if (!empty($getDiffDataRequest)) {
                    foreach ($getDiffDataRequest as  $value) {
                        MusicGenre::query()->create([
                            'album_id' => $id_album,
                            'music_genre_id' => $value
                        ]);
                    }
                }
            } else {
                if (!empty($getDiffDataRequest)) {
                    foreach ($getDiffDataRequest as  $value) {
                        MusicGenre::query()->create([
                            'album_id' => $id_album,
                            'music_genre_id' => $value
                        ]);
                    }
                }
                if (!empty($getDiffDataTable)) {
                    foreach ($getDiffDataTable as $value) {
                        MusicGenre::query()
                            ->where('album_id', $id_album)
                            ->where('music_genre_id', $value)
                            ->delete();
                    }
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
    public function viewPlayList(string $id)
    {
        $album = Album::query()
            ->with([
                'albumArtists',
                'songAlbumBeLongToMany' => function ($query) {
                    $query->select('songs.id', 'songs.music_genre_id', 'songs.name', 'songs.thumbnail', 'songs.duration')->with('artist:id,name');
                }
            ])
            ->where('isAlbum', false)
            ->findOrFail($id);

        return view(self::PATH_VIEW_PLAYLIST . __FUNCTION__, compact(['album']));
    }
    public function addSongPlayList(string $id)
    {
        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();
        $album = Album::query()->with('albumGenres')->findOrFail($id);

        return view(self::PATH_VIEW_PLAYLIST . __FUNCTION__, compact(['musicGenre', 'album']));
    }
    public function song($genre, $id)
    {
        $genreSongs = MusicGenre::query()->select(['id'])->descendantsOf($genre);
        $pluckGenreId = collect($genreSongs)->pluck('id');

        $songAbum = Song::query()
            ->select(['id', 'name', 'thumbnail'])
            ->whereDoesntHave('albumSong', function ($query) use ($id) {
                $query->where('album_id', $id);
            })
            ->whereIn('music_genre_id', $pluckGenreId->isEmpty() ? [$genre] : $pluckGenreId)
            ->get();
        return response()->json([
            'data' => $songAbum,
        ]);
    }
    public function store(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            foreach ($request->data as $value) {
                AlbumSong::query()->create([
                    'album_id' => $id,
                    'song_id' => $value
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Success',
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'error',
            ], 200);
        }
    }
    public function destroy(string $idSong, string $idAlbum)
    {
        AlbumSong::query()
            ->where('album_id', $idAlbum)
            ->where('song_id', $idSong)
            ->first()->delete();
        return back();
    }
}
