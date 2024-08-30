<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Song;
use App\Http\Resources\Api\SongsResource;
use App\Http\Resources\Api\AlbumResource;
use App\Models\Topic;
use App\Models\Album;

class HomeController extends Controller
{
    public function home()
    {
        $data = array();
        $data[] = $this->songAustanding();

        $topic = Topic::query()->with('topicItemAlbum')->limit(2)->get();
        foreach ($topic as $key => $value) {
            $data[] = [
                'title' => $value->title,
                'sectionId' => 'topic'.$key+1,
                'item' => AlbumResource::collection($value->topicItemAlbum),
            ];
        }
        $data[] = $this->getTrendingAlbums();

        return response()->json([
            'data' => $data
        ]);
    }
    public function songAustanding()
    {
        $song = Song::query()
            ->select(['id', 'music_genre_id', 'album_id', 'name', 'thumbnail', 'alias', 'duration', 'release_date', 'total_listens', 'isOffical', 'isPrivate'])
            ->whereRelation('favoritesSong', function ($query) {
                $query->where('favourited', true);
            })
            ->withCount(
                [
                    'favoritesSong' => function ($query) {
                        $query->where('favourited', true);
                    }
                ]
            )
            ->with([
                'artist' => function ($query) {
                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.alias'])
                        ->withCount('followers');
                },
                'song_composers' => function ($query) {
                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.alias'])
                        ->withCount('followers');
                },
                'album' => function ($query) {
                    $query->select(['albums.id', 'albums.user_id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.description'])
                        ->with([
                            'albumArtists' => function ($query) {
                                $query->withCount('followers');
                            },
                            'albumGenres:id,name_genre',
                            'user:id,name,email,type'
                        ]);
                },
                'music_genre:id,name_genre'
            ])
            ->orderBy('favorites_song_count', 'desc')
            ->limit(9)
            ->get();

        $song = [
            'title' => 'Bài hát yêu thích',
            'sectionId' => 'song',
            'item' => SongsResource::collection($song)
        ];
        return $song;
    }
    public function getTrendingAlbums()
    {
        $album = Album::query()
            ->select(['id', 'user_id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
            ->whereRelation('favoritesAlbums', function ($query) {
                $query->where('favourited', true);
            })
            ->withCount([
                'favoritesAlbums' => function ($query) {
                    $query->where('favourited', true);
                }
            ])
            ->where('isAlbum', true)
            ->orderBy('favorites_albums_count', 'desc')
            ->limit(5)
            ->get();
        $data = [
            'title' => 'Album Thịnh Hành',
            'sectionId' => 'album',
            'item' => AlbumResource::collection($album)
        ];
        return $data;
    }
}