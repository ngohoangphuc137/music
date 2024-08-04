<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Album;
use App\Models\AlbumSong;
use App\Models\Artist;
use App\Models\MusicGenre;
use App\Models\Song;


class PlaylistController extends Controller
{
    const PATH_VIEW_PLAYLIST = 'admin.playlists.';
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
    public function createPlayList()
    {
        $artists = Artist::query()
            ->select(['id', 'name'])
            ->get();

        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', '_lft', '_rgt', 'parent_id'])
            ->withDepth()
            ->get()
            ->toFlatTree();
        return view(self::PATH_VIEW_PLAYLIST . 'create', compact(['artists', 'genre']));
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
