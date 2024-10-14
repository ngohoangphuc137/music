<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Http\Response;
use App\Http\Resources\Api\SongsResource;
use App\Http\Resources\Api\LinkResource;

class SongController extends Controller
{
    public function getIdSong()
    {
        $song = Song::query()->select('id as idSong')->inRandomOrder()->first();
        return response()->json([
            'data' => $song,
        ], 200);
    }
    public function infoSong(Request $request)
    {
        $data = null;
        if (isset($request->id)) {
            $data = Song::query()
                ->select([
                    'id',
                    'music_genre_id',
                    'album_id',
                    'name',
                    'thumbnail',
                    'alias',
                    'audio_file',
                    'duration',
                    'release_date',
                    'total_listens',
                    'isOffical',
                    'isPrivate'
                ])
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
                            ])->withCount('favoritesAlbums');
                    },
                    'music_genre:id,name_genre'
                ])
                ->find($request->id);
        }
        return response()->json([
            'data' => new SongsResource($data),
            'ms' => 'success',
            'status'=>200
        ], Response::HTTP_OK);
    }
    public function linkSong(Request $request)
    {
        $linkSong = null;
        if (isset($request->id)) {
            $linkSong = Song::query()->select(['audio_file'])->find($request->id);
        }
        if ($linkSong === null) {
            return response()->json([
                'data' => null,
                'ms' => 'link bài hát này không tồn tại'
            ], 200);
        }
        return response()->json([
            'data' => new LinkResource($linkSong),
        ], 200);

    }
    public function musicFavorites()
    {
        $musicFavorites = Song::query()
            ->select(['id', 'music_genre_id', 'album_id', 'name', 'thumbnail', 'alias', 'duration', 'release_date', 'total_listens', 'isOffical', 'isPrivate'])
            ->whereRelation('favoritesSong', function ($query) {
                $query->where('favourited', true);
            })
            ->withCount([
                'favoritesSong' => function ($query) {
                    $query->where('favourited', true);
                }
            ])
            ->with([
                'song_composers',
                'artist' => function ($query) {
                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.alias'])
                        ->withCount([
                            'followers' => function ($query) {
                                $query->where('is_active', true);
                            }
                        ]);
                },
                'album' => function ($query) {
                    $query->select('albums.id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.user_id')
                        ->withCount([
                            'favoritesAlbums' => function ($query) {
                                $query->where('favourited', true);
                            },
                        ])
                        ->with([
                            'albumArtists' => function ($query) {
                                $query->withCount([
                                    'followers' => function ($query) {
                                        $query->where('is_active', true);
                                    }
                                ]);
                            }
                        ]);
                },
            ])->get();
        return SongsResource::collection($musicFavorites);
    }

}
