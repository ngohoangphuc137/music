<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\AlbumArtist;
use App\Models\SongImplementer;
use App\Http\Resources\Api\SongsResource;
use App\Http\Resources\Api\ArtistResource;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Controllers\API\CustomPaginateController;

class ArtistController extends Controller
{
    const TYPE_ARTIST_SONG = 'song';
    const TYPE_ARTIST_ALBUM = 'album';
    public $Paginate;

    public function __construct()
    {
        $this->Paginate = new CustomPaginateController;
    }
    public function artist(Request $request)
    {
        if (!isset($request->alias)) {
            return response()->json([
                'msg' => 'Not found id',
                'status' => 404
            ], 404);
        }
        $artist = Artist::query()
            ->select(['id', 'country_id', 'name', 'realname', 'alias', 'thumbnail'])
            ->withCount([
                'followers' => function ($query) {
                    $query->where('is_active', true);
                }
            ])
            ->with(
                [
                    'country',
                    'songImplementersMany' => function ($query) {
                        $query
                            ->withCount([
                                'favoritesSong' => function ($query) {
                                    $query->where('favourited', true);
                                }
                            ])
                            ->with([
                                'song_composers' => function ($query) {
                                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.realname', 'artists.alias'])
                                        ->withCount([
                                            'followers' => function ($query) {
                                                $query->where('is_active', true);
                                            }
                                        ]);
                                },
                                'artist' => function ($query) {
                                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.realname', 'artists.alias'])
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
                                            },
                                            'albumGenres'
                                        ]);
                                },
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
                                },
                                'albumGenres'
                            ]);
                    }
                ]
            )
            ->where('alias', $request->alias)
            ->first();
        if (!$artist) {
            return response()->json([
                'msg' => 'Not found id',
                'status' => 404
            ], 404);
        }
        $sectionArtist = new ArtistResource($artist);
        $sectionArtistArray = $sectionArtist->toArray(request());

        $sectionSongs = $this->songImplementersMany($artist->songImplementersMany);
        $sectionAlbum = $this->allAlbumArtist($artist->album);
        unset($artist->songImplementersMany);
        unset($artist->album);

        $data = array_merge($sectionArtistArray, [
            'sections' => [
                $sectionSongs,
                $sectionAlbum
            ]
        ]);


        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => $data
        ], 200);
    }
    public function songImplementersMany($data)
    {
        $data = [
            'title' => 'Bài hát',
            'sectionId' => 'songs',
            'item' => SongsResource::collection($data)
        ];
        return $data;
    }
    public function allAlbumArtist($data)
    {
        $data = [
            'title' => 'album',
            'sectionId' => 'album',
            'item' => AlbumResource::collection($data)
        ];
        return $data;
    }
    public function getListAllSong_album(Request $request)
    {
        if (!isset($request->id) || !isset($request->type)) {
            return response()->json([
                'msg' => 'Not found or incorrect url data entered',
                'status' => 404
            ], 404);
        }
        if ($request->type == self::TYPE_ARTIST_SONG) {
            return $this->listSong($request->id, $request);
        } elseif ($request->type == self::TYPE_ARTIST_ALBUM) {
            return $this->listAlbum($request->id,$request);
        } else {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
    }
    public function listSong($idArtist, $request)
    {
        $query = SongImplementer::query()
            ->with([
                'songs' => function ($query) {
                    $query
                        ->withCount([
                            'favoritesSong' => function ($query) {
                                $query->where('favourited', true);
                            }
                        ])
                        ->with([
                            'song_composers' => function ($query) {
                                $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.realname', 'artists.alias'])
                                    ->withCount([
                                        'followers' => function ($query) {
                                            $query->where('is_active', true);
                                        }
                                    ]);
                            },
                            'artist' => function ($query) {
                                $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.realname', 'artists.alias'])
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
                                        },
                                        'albumGenres'
                                    ]);
                            },
                        ]);
                }
            ])
            ->where('artist_id', $idArtist);
        $result = $this->Paginate->customPaginate($query, $request, 10);
        $result['item'] = SongsResource::collection(collect($result['item'])->pluck('songs'));
        return response()->json([
            'status'=>200,
            'msg'=>'success',
            'data' => $result
        ]);
    }
    public function listAlbum($idArtist,$request)
    {
        $query = AlbumArtist::query()
            ->select(['id','album_id','artist_id'])
            ->with([
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
                            },
                            'albumGenres'
                        ]);
                }
            ])
            ->where('artist_id',$idArtist);
         $listAlbum = $this->Paginate->customPaginate($query,$request,15);
         $listAlbum['item']=AlbumResource::collection(collect($listAlbum['item'])->pluck('album'));
  
        return response()->json([
            'status'=>200,
            'msg'=>'success',
            'data' => $listAlbum
        ]);
    }
}
