<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MusicGenre;
use App\Models\AlbumGenre;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Controllers\API\CustomPaginateController;

class GenreAlbumController extends Controller
{
    public $Paginate;

    public function __construct()
    {
        $this->Paginate = new CustomPaginateController;
    }
    public function genreMusic(Request $request)
    {
        if (!isset($request->id)) {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }

        $musicGenre = MusicGenre::query()
            ->select(['id', 'name_genre', 'alias', '_lft', '_rgt'])
            ->with('ancestors:id,name_genre,alias,_lft,_rgt')->findOrFail($request->id);
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
            'status' => 200,
            'msg' => 'success',
            'data' => $musicGenre,
        ]);
    }
    public function genreParent(){
        $musicGenre = MusicGenre::query()
            ->select(['id', 'name_genre', 'alias', '_lft', '_rgt'])
            ->with('ancestors')
            ->whereDoesntHave('ancestors')
            ->get();
        $musicGenre->makeHidden(['_lft', '_rgt','ancestors']);
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => $musicGenre,
        ]);
    }

    public function genreAlbum(Request $request)
    {
        if (!isset($request->id)) {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
        if(filter_var($request->page, FILTER_VALIDATE_INT) === false && isset($request->page)){
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
        
        $query = AlbumGenre::query()
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
            ->where('music_genre_id', $request->id);
        $result = $this->Paginate->customPaginate($query, $request, 20);
        $result['item'] = AlbumResource::collection($result['item']->pluck('album'));
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => $result
        ]);

    }

}
