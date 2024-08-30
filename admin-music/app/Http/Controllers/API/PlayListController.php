<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Album;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Resources\Api\SongsResource;

class PlayListController extends Controller
{
    public function getPlayList(Request $request)
    {
        $album = null;
        if (isset($request->id)) {
            $album = Album::query()
                ->select(['id', 'user_id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
                ->withCount([
                    'favoritesAlbums' => function ($query) {
                        $query->where('favourited', true);
                    },

                ])
                ->with([
                    'albumArtists',
                    'albumGenres',
                    'songAlbumBeLongToMany' => function ($query) {
                        $query->withCount([
                            'favoritesSong' => function ($query) {
                                $query->where('favourited', true);
                            }
                        ])
                            ->with([
                                'artist',
                                'song_composers',
                                'album' => function ($query) {
                                    $query->select('albums.id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.user_id')
                                        ->withCount([
                                            'favoritesAlbums' => function ($query) {
                                                $query->where('favourited', true);
                                            },
                                        ]);
                                }
                            ]);

                    }
                ])
                ->find($request->id);
        }

        return response()->json([
            'data' => new AlbumResource($album),
        ]);
    }
}
