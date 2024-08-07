<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Album;
use App\Models\AlbumArtist;
use App\Models\AlbumGenre;
use App\Models\AlbumSong;
use App\Models\Artist;
use App\Models\Song;
use App\Models\MusicGenre;
use App\Http\Requests\AlbumRequest;
use App\Http\Controllers\ConvertVnCharset;
use App\Http\Resources\SongsResource;

class AlbumController extends Controller
{
    const PATH_VIEW = 'admin.albums.';
    const PATH_UPLOAD = 'albums';

    const PATH_LINK = '/album/';
    public $convertVnCharset;
    public $song;
    public function __construct()
    {
        $this->convertVnCharset = new ConvertVnCharset();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $album = Album::query()
            ->select(['id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
            ->with([
                'albumArtists:id,name',
                'albumGenres:id,name_genre',
            ])
            ->withCount('albumSongs')
            ->where('isAlbum', true)
            ->get();

        return view(self::PATH_VIEW . __FUNCTION__, compact('album'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $artists = Artist::query()
            ->select(['id', 'name'])
            ->get();

        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', '_lft', '_rgt', 'parent_id'])
            ->withDepth()
            ->get()
            ->toFlatTree();

        return view(self::PATH_VIEW . __FUNCTION__, compact(['artists', 'genre']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function getArtistAlias($request)
    {
        $nameArtits = null;
        $artits = Artist::query()->select(['alias'])->whereIn('id', collect($request->artists))->get();
        $nameArtits = collect($artits)->pluck('alias')->implode('-');
        return $nameArtits;
    }
    public function store(AlbumRequest $request, $isAlbum = null)
    {
        try {
            $data = $request->except('thumbnail', 'artists', 'genre');
            $nameArtits = $this->getArtistAlias($request);

            $data['aliasTitle'] = $this->convertVnCharset->convertVnCharset($request->title) . '-' . $nameArtits;
            $data['user_id'] = Auth::user()->id;
            $data['isAlbum'] = $isAlbum;

            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
            }

            $album = Album::query()->create($data);

            // create data in table AlbumArtist
            foreach ($request->artists as  $value) {
                AlbumArtist::query()->create([
                    'album_id' => $album->id,
                    'artist_id' => $value
                ]);
            }
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
    public function viewAlbum(string $id)
    {
        $album = Album::query()->with([
            'albumArtists',
            'songAlbumBeLongToMany' => function ($query) {
                $query->select('songs.id', 'songs.album_id', 'songs.music_genre_id', 'songs.name', 'songs.thumbnail', 'songs.duration')
                    ->with([
                        'artist:id,name',
                    ]);
            },
        ])->findOrFail($id);

        return view(self::PATH_VIEW . __FUNCTION__, compact(['album']));
    }
    public function addSongAlbum(string $id)
    {
        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();
        $album = Album::query()->with('albumGenres')->findOrFail($id);

        return view(self::PATH_VIEW . __FUNCTION__, compact(['musicGenre', 'album']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $album = Album::query()
            ->select(['id', 'title', 'isAlbum', 'description'])
            ->with(['albumArtists:id,name', 'albumGenres:id,name_genre'])
            ->findOrFail($id);

        $artists = Artist::query()
            ->select(['id', 'name'])
            ->with(['album' => function ($query) use ($album) {
                $query->where('album_id', $album->id);
            }])
            ->get();

        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', '_lft', '_rgt', 'parent_id'])
            ->with(['album' => function ($query) use ($album) {
                $query->where('album_id', $album->id);
            }])
            ->withDepth()
            ->get()
            ->toFlatTree();
        return view(self::PATH_VIEW . __FUNCTION__, compact(['artists', 'genre', 'album']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AlbumRequest $request, string $id)
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

        $artists = collect($request->artists)->toArray();
        $genre = collect($request->genre)->toArray();

        $album_artists = AlbumArtist::query()->where('album_id', $id)->get()->pluck('artist_id')->toArray();
        $album_genres = AlbumGenre::query()->where('album_id', $id)->get()->pluck('music_genre_id')->toArray();

        $this->updateAlbum_Artist_Genre($artists, $album_artists, 'AlbumArtist', $id);
        $this->updateAlbum_Artist_Genre($genre, $album_genres, 'AlbumGenre', $id);

        return back()->with('success', 'Sửa thành công');
    }
    public function updateAlbum_Artist_Genre($dataRequest, $dataTable, $table, $id_album)
    {
        $class = $table == 'AlbumArtist' ? 'App\Models\AlbumArtist' : 'App\Models\AlbumGenre';
        $column = $table == 'AlbumArtist' ? 'artist_id' : 'music_genre_id';

        $getDiffDataRequest = array_diff($dataRequest, $dataTable);
        $getIntersect = array_intersect($dataRequest, $dataTable);
        $getDiffDataTable = array_diff($dataTable, $dataRequest);
        try {
            DB::beginTransaction();
            if ($dataTable == $getIntersect) {
                if (!empty($getDiffDataRequest)) {
                    foreach ($getDiffDataRequest as  $value) {
                        $class::query()->create([
                            'album_id' => $id_album,
                            $column => $value
                        ]);
                    }
                }
            } else {
                if (!empty($getDiffDataRequest)) {
                    foreach ($getDiffDataRequest as  $value) {
                        $class::query()->create([
                            'album_id' => $id_album,
                            $column => $value
                        ]);
                    }
                }
                if (!empty($getDiffDataTable)) {
                    foreach ($getDiffDataTable as $value) {
                        $class::query()
                            ->where('album_id', $id_album)
                            ->where($column, $value)
                            ->delete();
                    }
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $album = Album::query()->findOrFail($id);
            $albumArtists = AlbumArtist::query()->where('album_id', $album->id)->get();
            $albumGenre = AlbumGenre::query()->where('album_id', $album->id)->get();
            $albumSong = AlbumSong::query()->where('album_id', $album->id)->get();
            $song = Song::query()->with(['song_composers_hasMany','song_implementers_hasMany'])->where('album_id', $album->id)->get();

            DB::beginTransaction();
            foreach ($albumArtists as $value) {
                AlbumArtist::destroy($value->id);
            }

            foreach ($albumGenre as $value) {
                $value->delete();
            }

            if (!$albumSong->isEmpty()) {
                foreach ($albumSong as  $value) {
                    $value->delete();
                }
            }
            foreach ($song as $value) {
                $this->delete_relationship_table($value->song_composers_hasMany);
                $this->delete_relationship_table($value->song_implementers_hasMany);
                if (Storage::exists($value->thumbnail)) {
                    Storage::delete($value->thumbnail);
                }
                $value->delete();
            }
            $album->delete();
            DB::commit();

            if (Storage::exists($album->thumbnail)) {
                Storage::delete($album->thumbnail);
            }
            return back();
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->with('error', $exception->getMessage());
        }
    }
    public function delete_relationship_table($data)
    {
        foreach ($data as $value) {
            $value->delete();
        }
    }
}
