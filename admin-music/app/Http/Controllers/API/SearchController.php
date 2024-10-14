<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use voku\helper\ASCII;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use App\Models\Song;
use App\Models\Album;
use App\Models\Artist;
use App\Http\Resources\Api\SongsResource;
use App\Http\Resources\Api\ArtistResource;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Resources\Api\MegeResource;
use App\Http\Controllers\API\CustomPaginateController;


class SearchController extends Controller
{
    const TYPE_ALL = 'all';
    const TYPE_SONG = 'song';
    const TYPE_PLAYLIST = 'playlist';
    const TYPE_ARTIST = 'artist';
    public $Paginate;
    public function __construct()
    {
        $this->Paginate = new CustomPaginateController;
    }
    public function suggestions(Request $request)
    {
        if (!isset($request['query'])) {
            return response()->json([
                'msg' => 'Not found or incorrect url data entered',
                'status' => 404
            ], 404);
        }
        $keyword = $request->input(key: 'query');
        //$keyword = strtolower(str_replace(' ', '', ASCII::to_ascii($query)));

        $songs = $this->searchSong($keyword);
        $artists = $this->searchArtist($keyword);
        $albums = $this->searchAlbumPlayList($keyword);
        $results = (object) [
            'songs' => $songs->response()->getData(true), // Convert collection to array
            'artists' => $artists->response()->getData(true), // Convert collection to array
            'albums' => $albums->response()->getData(true) // Convert collection to array
        ];

        $data = new MegeResource($results);
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => $data,
        ]);
    }
    public function pageSearch(Request $request)
    {
        if (!isset($request['q']) || !isset($request['type'])) {
            return response()->json([
                'msg' => 'Not found or incorrect url data entered',
                'status' => 404
            ], 404);
        }
    
        $data = $this->typeSearch($request['type'], $request['q']);
        return $data;

    }
    public function typeSearch($type, $keyword)
    {
        switch ($type) {
            case self::TYPE_ALL:
                $data = [
                    'artists' => $this->searchArtist($keyword,true),
                    'songs' => $this->searchSong($keyword, false,true),
                    'playlists' => $this->searchAlbumPlayList($keyword, false,true),
                ];
                return $this->resp($data);
            case self::TYPE_SONG:
                $data = $this->searchSong($keyword, false);
                return $this->resp($data);
            case self::TYPE_ARTIST:
                $data = $this->searchArtist($keyword);
                return $this->resp($data);
            case self::TYPE_PLAYLIST:
                $data = $this->searchAlbumPlayList($keyword, false);
                return $this->resp($data);
            default:
                return response()->json([
                    'status' => 404,
                    'msg' => 'Not found',
                ]);
        }
    }
    public function resp($data)
    {
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => $data
        ]);
    }
    public function searchSong($keyword, $isSuggestion = true, $limit = false)
    {
        $withRelations = [
            'artist' => function ($query) {
                $query->select(['artists.id', 'artists.name', 'artists.thumbnail', 'artists.alias'])
                    ->withCount([
                        'followers' => function ($query) {
                            $query->where('is_active', true);
                        }
                    ]);
            },
        ];
        if (!$isSuggestion) {
            $withRelations[] = 'song_composers';
            $withRelations['album'] = function ($query) {
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
            };
        }

        $song = Song::query()
            ->select(['id', 'music_genre_id', 'album_id', 'name', 'thumbnail', 'alias', 'duration', 'release_date', 'total_listens', 'isOffical', 'isPrivate'])
            ->withCount([
                'favoritesSong' => function ($query) {
                    $query->where('favourited', true);
                }
            ])
            ->with($withRelations)
            ->where('name', 'LIKE', "%$keyword%")
            ->orwhereHas('artist', function ($query) use ($keyword) {
                $query->where('name', 'LIKE', "$keyword%");
            });

        if ($limit === false) {
            $data = $song->get()->map(function ($song) {
                $song['type'] = 'song';
                return $song;
            });
            return SongsResource::collection($data);
        }
        return SongsResource::collection($song->limit(8)->get());

    }
    public function searchArtist($keyword, $limit = false)
    {
        $artist = Artist::query()
            ->select(['id', 'name', 'alias', 'realname', 'thumbnail'])
            ->withCount([
                'followers' => function ($query) {
                    $query->where('is_active', true);
                }
            ])
            ->where('name', 'LIKE', "%$keyword%");

        if (!$limit) {
            $data = $artist->get()->map(function ($artist) {
                $artist['type'] = $artist->typeArtist;
                return $artist;
            });
            return ArtistResource::collection($data);
        }
        return  ArtistResource::collection($artist->limit(8)->get());
    }
    public function searchAlbumPlayList($keyword, $isSuggestion = true, $limit = false)
    {
        $playList = Album::query()
            ->select(['id', 'user_id', $isSuggestion ? 'title as name' : 'title', 'aliasTitle', 'thumbnail', 'isAlbum', 'description'])
            ->withCount([
                'favoritesAlbums' => function ($query) {
                    $query->where('favourited', true);
                },
                'songAlbumBeLongToMany'
            ])
            ->has('songAlbumBeLongToMany', '>', $isSuggestion ? 1 : 0)
            ->where('title', 'LIKE', "%$keyword%")
            ->when(!$isSuggestion, function ($query) use ($keyword) {
                $query->orwhereHas('albumArtists', function ($qer) use ($keyword) {
                    $qer->where('name', 'LIKE', "$keyword%");
                });
            });
        if (!$limit) {
            $data = $playList->get()->map(function ($playList) {
                $playList['type'] = $playList->typeAlbum;
                return $playList;
            });
            return AlbumResource::collection($data);
        }
        return AlbumResource::collection($playList->limit(8)->get());
    }
}
