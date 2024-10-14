<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Follow;
use App\Models\FavoritesAlbum;
use App\Models\Album;
use App\Models\FavoritesSong;
use App\Http\Resources\Api\SongsResource;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Resources\Api\ArtistResource;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use voku\helper\ASCII;
use App\Models\AlbumSong;
use App\Models\ImagePlaylistUser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\RecentlyHeard;
use App\Http\Controllers\API\CustomPaginateController;

class UserLibaryController extends Controller
{
    const PLAYLIST_ALL = 'all';
    const PLAYLIST_OWNER = 'owner';
    const PATH_UPLOAD = 'albums';
    const IMAGE_ALBUM_DEFAUT = 'album_default.png';
    public $Paginate;

    public function __construct()
    {
        $this->Paginate = new CustomPaginateController;
    }
    public function userLibary(Request $request)
    {
        $user = $request->user();
        $songFavou = $this->songLibary($user->id);
        $playlistFavou = $this->playlistAlbumLibary($user->id, false, true);
        $albumFavou = $this->playlistAlbumLibary($user->id, true);
        $artistFollow = $this->artistLibary($user->id, true);
        $data = [
            'artist' => $artistFollow,
            'song' => $songFavou,
            'playlist' => $playlistFavou,
            'album' => $albumFavou,
        ];
        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => $data
        ]);

    }
    public function songLibary($idUser)
    {
        $songFavou = FavoritesSong::query()
            ->with([
                'song' => function ($query) {
                    $query->select([
                        'id',
                        'music_genre_id',
                        'album_id',
                        'name',
                        'thumbnail',
                        'alias',
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
                        ]);
                }
            ])
            ->where('favourited', true)
            ->where('user_id', $idUser)->get()->pluck('song');

        return SongsResource::collection($songFavou);
    }
    public function playlistAlbumLibary($idUser, $isAlbum = false, $limit = false)
    {
        $album = Album::query()
            ->select(['id', 'user_id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
            ->withCount([
                'favoritesAlbums' => function ($query) {
                    $query->where('favourited', true);
                }
            ])
            ->with([
                'albumArtists' => function ($query) {
                    $query->withCount('followers');
                },
                'albumGenres:id,name_genre',
                'user:id,name,email,type'
            ])
            ->where('user_id', $idUser);
        if ($limit) {
            $album->take(4);
        }
        $album = $album->get();

        $playList = FavoritesAlbum::query()
            ->whereHas('album', function ($query) use ($isAlbum) {
                $query->where('isAlbum', $isAlbum);
            })
            ->with([
                'album' => function ($query) {
                    $query->select(['albums.id', 'albums.user_id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.description'])
                        ->with([
                            'albumArtists' => function ($query) {
                                $query->withCount('followers');
                            },
                            'albumGenres:id,name_genre',
                            'user:id,name,email,type'
                        ])->withCount('favoritesAlbums');
                }
            ])
            ->where('favourited', true)
            ->where('user_id', $idUser);
        if ($limit) {
            $playList->take(5);
        }

        $playList = $playList->get()->pluck('album');

        $dataMeger = $album->merge($playList);

        $data = $isAlbum ? $playList : $dataMeger;
        return AlbumResource::collection($data);
    }
    public function artistLibary($idUser, $limit = false)
    {
        $artistFollow = Follow::query()
            ->with([
                'artist' => function ($query) {
                    $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.realname', 'artists.alias'])
                        ->withCount([
                            'followers' => function ($query) {
                                $query->where('is_active', true);
                            }
                        ]);
                }
            ])
            ->where('is_active', true)
            ->where('user_id', $idUser);
        if ($limit) {
            $artistFollow->take(4);
        }
        $artistFollow = $artistFollow->get()->pluck('artist');
        return ArtistResource::collection($artistFollow);
    }
    public function listLibaryPlaylist(Request $request)
    {
        $user = $request->user();
        if (!isset($request['type'])) {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
        switch ($request['type']) {
            case self::PLAYLIST_ALL:
                $data = $this->playlistAlbumLibary($user->id, false, false);
                return response()->json([
                    'status' => 200,
                    'msg' => 'Success',
                    'data' => $data
                ]);
            case self::PLAYLIST_OWNER:
                $album = Album::query()
                    ->select(['id', 'user_id', 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
                    ->withCount([
                        'favoritesAlbums' => function ($query) {
                            $query->where('favourited', true);
                        }
                    ])
                    ->with([
                        'albumArtists' => function ($query) {
                            $query->withCount('followers');
                        },
                        'albumGenres:id,name_genre',
                        'user:id,name,email,type'
                    ])
                    ->where('user_id', $user->id)->get();

                return response()->json([
                    'status' => 200,
                    'msg' => 'Success',
                    'data' => AlbumResource::collection($album)
                ]);

            default:
                return response()->json([
                    'msg' => 'Incorrect url data entered',
                    'status' => 404
                ], 404);
        }


    }
    public function listLibaryArtist(Request $request)
    {
        $user = $request->user();
        $data = $this->artistLibary($user->id, false);
        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => $data
        ]);
    }
    public function createPlaylist(Request $request)
    {
        if (!isset($request['name'])) {
            return response()->json([
                'status' => 404,
                'msg' => 'name field does not exist',
            ]);
        }
        $user = $request->user();
        $name = $request['name'];
        $alias = str_replace(" ", "-", ASCII::to_transliterate($name));
        $thumbnail = self::PATH_UPLOAD . '/' . self::IMAGE_ALBUM_DEFAUT;
        $playlistUser = Album::query()->create([
            'title' => $name,
            'aliasTitle' => $alias,
            'user_id' => $user->id,
            'thumbnail' => $thumbnail,
            'isAlbum' => false
        ]);

        $data = Album::query()->withCount([
            'favoritesAlbums' => function ($query) {
                $query->where('favourited', true);
            },
        ])->find($playlistUser->id);

        ImagePlaylistUser::query()->create([
            'array_id_song' => [],
            'album_id' => $playlistUser->id
        ]);

        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => new AlbumResource($data)
        ]);

    }
    public function addToPlaylist(Request $request)
    {
        $playlist = $this->checUrl($request);
        $checkExit = AlbumSong::query()
            ->where('album_id', $request['playlist'])
            ->where('song_id', $request['id'])->exists();
        if ($checkExit) {
            return response()->json([
                'status' => 200,
                'msg' => 'Success',
            ]);
        }

        try {
            DB::beginTransaction();
            AlbumSong::create([
                'song_id' => $request['id'],
                'album_id' => $request['playlist'],
            ]);
            $countPlaylistSong = AlbumSong::query()
                ->with([
                    'songBelongto' => function ($query) {
                        $query->select(['songs.id', 'songs.thumbnail']);
                    }
                ])
                ->where('album_id', $request['playlist']);

            $array_id = $countPlaylistSong->get()->pluck('songBelongto')->pluck('id')->toArray();
            $firstPhoto = $countPlaylistSong->limit(4)->get()->pluck('songBelongto')->pluck('thumbnail')->toArray();

            $arrayId = ImagePlaylistUser::query()
                ->select('id', 'album_id', 'array_id_song')
                ->where('album_id', $request['playlist'])
                ->first();

            if ($countPlaylistSong->count() >= 1 && $countPlaylistSong->count() < 4) {
                if (!isset($arrayId->array_id_song[0]) || !isset($array_id[0])) {
                    $this->updataThumbnalPlaylist($playlist, $firstPhoto[0]);
                } elseif ($arrayId->array_id_song[0] != $array_id[0]) {
                    $this->updataThumbnalPlaylist($playlist, $firstPhoto[0]);
                }
                $this->updataImagePlaylistUser($array_id, $arrayId);
            } elseif ($countPlaylistSong->count() >= 4) {
                $this->checkDuplicateArrays($arrayId, $firstPhoto, $array_id, $playlist);
                $this->updataImagePlaylistUser($array_id, $arrayId);
            }
            DB::commit();
            return response()->json([
                'status' => 200,
                'msg' => 'Success',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'msg' => 'error',
            ]);
        }


    }
    public function checkDuplicateArrays($arrayId, $firstPhoto, $array_id, $playlist, $flag = true)
    {
        $path = explode('/', $playlist->thumbnail);
        if (array_slice($arrayId->array_id_song, 0, 4) !== array_slice($array_id, 0, 4)) {
            if ($flag) {
                $imageMerge = $this->createAlbumCollage($firstPhoto);
            }
            if (Storage::has($playlist->thumbnail) && $path[0] == 'playlist') {
                Storage::delete($playlist->thumbnail);
            }
            $this->updataThumbnalPlaylist($playlist, $flag ? $imageMerge : $firstPhoto[0]);
        }
    }

    public function deleteSongPlaylist(Request $request)
    {

        try {
            $playlist = $this->checUrl($request);

            AlbumSong::query()
                ->where('album_id', $request['playlist'])
                ->where('song_id', $request['id'])->delete();

            $countPlaylistSong = AlbumSong::query()
                ->with([
                    'songBelongto' => function ($query) {
                        $query->select(['songs.id', 'songs.thumbnail']);
                    }
                ])
                ->where('album_id', $request['playlist']);
            $array_id = $countPlaylistSong->get()->pluck('songBelongto')->pluck('id')->toArray();
            $firstPhoto = $countPlaylistSong->limit(4)->get()->pluck('songBelongto')->pluck('thumbnail')->toArray();

            $arrayId = ImagePlaylistUser::query()
                ->select('id', 'album_id', 'array_id_song')
                ->where('album_id', $request['playlist'])
                ->first();

            if ($countPlaylistSong->count() >= 1 && $countPlaylistSong->count() < 4) {
                if ($arrayId->array_id_song[0] != $array_id[0]) {
                    $this->updataThumbnalPlaylist($playlist, $firstPhoto[0]);
                } else {
                    $this->checkDuplicateArrays($arrayId, $firstPhoto, $array_id, $playlist, false);
                }
            } elseif ($countPlaylistSong->count() >= 4) {
                $this->checkDuplicateArrays($arrayId, $firstPhoto, $array_id, $playlist);
            }
            $this->updataImagePlaylistUser($array_id, $arrayId);
            return response()->json([
                'status' => 200,
                'msg' => 'Success',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 500,
                'msg' => 'error',
            ]);
        }

    }
    public function checUrl($request)
    {
        $user = $request->user();
        $playlist = Album::query()->select(['id', 'user_id', 'thumbnail'])->find($request['playlist']);
        if (!$playlist || !is_numeric($request['playlist'])) {
            return response()->json([
                'msg' => 'The playlist not exist',
                'status' => 404
            ], 404);
        }
        if (!isset($request['playlist']) || !isset($request['id']) || $playlist->user_id !== $user->id) {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
        return $playlist;
    }
    public function updataImagePlaylistUser($array, $ImagePlaylistUser)
    {
        $ImagePlaylistUser->array_id_song = $array;
        $ImagePlaylistUser->save();
    }
    public function createImagePlaylistUser($array, $request)
    {
        ImagePlaylistUser::query()->create([
            'array_id_song' => $array,
            'album_id' => $request['playlist']
        ]);
    }
    public function updataThumbnalPlaylist($playlist, $image)
    {
        $playlist->thumbnail = $image;
        $playlist->save();
    }
    public function createAlbumCollage($arrayImage)
    {
        $flag = true;
        // $path = 'storage/albums/' . self::IMAGE_ALBUM_DEFAUT;
        // $path1 = 'storage/albums/PP6jkek9oAPAVrh3MyllufPzeH2ivqrBJ4hhlCqv.jpg';
        // $path2 = 'storage/albums/1l8l8BT1IDovL5ZR1N69MSi5UiZxhTLx2pFuw58U.jpg';
        // $path3 = 'storage/albums/euySYt5hMl0y9Wd2MadZtVM0JdU51cI4Y0zpkzik.jpg';

        // if (!Storage::exists($path)) {
        //     return 'File không tồn tại trong storage!';
        // }
        foreach ($arrayImage as $value) {
            if (!Storage::exists($value)) {
                $flag = false;
            }
        }

        if (!$flag) {
            return self::PATH_UPLOAD . '/' . self::IMAGE_ALBUM_DEFAUT;
        }
        $img = Image::canvas(420, 420, '#ffff');
        // Lấy nội dung của ảnh từ storage

        $image = Image::make((string) 'storage/' . $arrayImage[0]);
        $image1 = Image::make((string) 'storage/' . $arrayImage[1]);
        $image2 = Image::make((string) 'storage/' . $arrayImage[2]);
        $image3 = Image::make((string) 'storage/' . $arrayImage[3]);

        $image->resize(210, 210)->response();
        $image1->resize(210, 210)->response();
        $image2->resize(210, 210)->response();
        $image3->resize(210, 210)->response();

        $img->insert($image, 'top-left');
        $img->insert($image1, 'top-right');
        $img->insert($image2, 'bottom-left');
        $img->insert($image3, 'bottom-right');

        $imageData = (string) $img->encode('jpg', 90);
        $filename = str::random(20) . time() . '.jpg';
        Storage::put('playlist/' . $filename, $imageData);
        return 'playlist/' . $filename;
    }
    public function getListRecentlyHeard(Request $request){
        $user = $request->user();
        $query = RecentlyHeard::query()
        ->with([
            'song' => function ($query) {
                $query->select([
                    'id',
                    'music_genre_id',
                    'album_id',
                    'name',
                    'thumbnail',
                    'alias',
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
                    ]);
            }
        ])
        ->where('user_id', $user->id)
        ->orderByDesc('id');
        $result = $this->Paginate->customPaginate($query,$request,10);
        $result['item'] = SongsResource::collection($result['item']->pluck('song'));
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => $result
        ]);
       
    }
    public function addRecentlyHeard(Request $request)
    {
        try {
            $user = $request->user();
            DB::beginTransaction();
            $recently = RecentlyHeard::query()
                ->where('user_id', $user->id)
                ->where('song_id', $request->id)
                ->exists();
            if ($recently) {
                return response()->json([
                    'status' => 200,
                    'msg' => 'This song is in the listening history',
                ]);
            }
            RecentlyHeard::query()->create([
                'user_id' => $user->id,
                'song_id' => $request->id,
            ]);
            DB::commit();
            return response()->json([
                'status' => 200,
                'msg' => 'Success',
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'msg' => 'error',
            ]);
        }
    }

}
