<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\FavoritesSong;
use App\Models\FavoritesAlbum;
use App\Models\Song;
use App\Models\Album;
use App\Models\Follow;

class UserFavouriteController extends Controller
{
    const TYPE_SONG = 'song';
    const TYPE_PLAYLIST = 'playlist';
    public function userFavorite(Request $request)
    {
        if (!isset($request['id']) || !isset($request['type'])) {
            return response()->json([
                'msg' => 'Not found or incorrect url data entered',
                'status' => 404
            ], 404);
        }
        if (!is_numeric($request['id'])) {
            return response()->json([
                'msg' => 'The id field must be numeric',
                'status' => 404
            ], 404);
        }
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'msg' => 'This user does not exist',
                'status' => 404
            ], 404);
        }
        $data = $this->typeFavourite($request);
        return $data;
    }
    public function typeFavourite($request)
    {
        switch ($request->type) {
            case self::TYPE_SONG:
                return $this->favouriteSong($request);
            case self::TYPE_PLAYLIST:
                return $this->favouritePlaylist($request);

            default:
                return response()->json([
                    'status' => 404,
                    'msg' => 'Not found',
                ]);
        }
    }
    public function favouriteSong($request)
    {
        $user = $request->user();
        $favorite = null;
        $song = Song::query()->find($request->id);
        if ($song == null) {
            return response()->json([
                'status' => 404,
                'msg' => 'This music not exist',
            ]);
        }
        $favoriteSong = FavoritesSong::where('user_id', $user->id)
            ->where('song_id', $request->id)
            ->first();

        if ($favoriteSong) {
            $favoriteSong->favourited = !$favoriteSong->favourited;
            $favoriteSong->save();

            $favorite = $favoriteSong->favourited;
        } else {
            FavoritesSong::query()->create([
                'user_id' => $user->id,
                'song_id' => $request->id,
                'favourited' => true
            ]);
            $favorite = true;
        }

        $totalFavourites = FavoritesSong::query()
            ->where('favourited', true)
            ->where('song_id', $request->id)->count();

        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => $this->responseFavourite($totalFavourites, $favorite)
        ]);

    }

    public function favouritePlaylist($request)
    {
        $user = $request->user();
        $favorite = null;
        $albumExist = Album::query()->find($request->id);

        if ($albumExist === null) {
            return response()->json([
                'status' => 404,
                'msg' => 'This playList not exist',
            ]);
        }

        $favoriteAlbum = FavoritesAlbum::where('user_id', $user->id)
            ->where('album_id', $request->id)
            ->first();
        if ($favoriteAlbum) {
            $favoriteAlbum->favourited = !$favoriteAlbum->favourited;
            $favoriteAlbum->save();
            $favorite = $favoriteAlbum->favourited;
        } else {
            FavoritesAlbum::query()->create([
                'user_id' => $user->id,
                'album_id' => $request->id,
                'favourited' => true
            ]);
            $favorite = true;
        }

        $totalFavourites = FavoritesAlbum::query()
            ->where('favourited', true)
            ->where('album_id', $request->id)->count();

        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => $this->responseFavourite($totalFavourites, $favorite)
        ]);
    }

    public function followArtist(Request $request)
    {
        $user = $request->user();
        $follow = null;
        if (!isset($request['id'])) {
            return response()->json([
                'msg' => 'Not found or incorrect url data entered',
                'status' => 404
            ], 404);
        }
        if (!is_numeric($request['id'])) {
            return response()->json([
                'msg' => 'The id field must be numeric',
                'status' => 404
            ], 404);
        }
        if (!$user) {
            return response()->json([
                'msg' => 'This user does not exist',
                'status' => 404
            ], 404);
        }
        $userFollow = Follow::query()
            ->where('user_id', $user->id)
            ->where('artist_id', $request->id)
            ->first();
        if ($userFollow) {
            $userFollow->is_active = !$userFollow->is_active;
            $userFollow->save();
            $follow = $userFollow->is_active;
        } else {
            Follow::query()->create([
                'user_id' => $user->id,
                'artist_id' => $request->id,
                'is_active' => true
            ]);
            $follow = true;
        }
        $totalFollow = Follow::query()
            ->where('is_active', true)
            ->where('artist_id',$request->id)->count();
        return response()->json([
            'status' => 200,
            'msg' => 'Success',
            'data' => [
                'followed' => $follow,
                'totalFollow' => $totalFollow
            ]
        ]);
    }

    public function responseFavourite($totalFavourite, $favourite)
    {
        $data = [
            'totalFavourite' => $totalFavourite,
            'favourited' => $favourite,
        ];
        return $data;
    }

   
    
}
