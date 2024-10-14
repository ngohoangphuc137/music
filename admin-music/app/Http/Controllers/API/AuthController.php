<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use App\Models\FavoritesSong;
use App\Models\FavoritesAlbum;
use App\Models\Follow;
use App\Models\Album;
class AuthController extends Controller
{
    public function login()
    {
        try {
            request()->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $user = User::query()->where('email', request('email'))->first();
            if (!$user || !Hash::check(request('password'), $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            $hasToken = DB::table('personal_access_tokens')
                ->where('tokenable_id', $user->id)
                ->where('tokenable_type', User::class)
                ->exists();
            if ($hasToken) {
                return response()->json([
                    'status' => 200,
                    'msg' => 'User is logged in.',
                ]);
            }
            $token = $user->createToken($user->id)->plainTextToken;
            return response()->json([
                'status' => 200,
                'msg' => 'login successfully',
                'token' => $token,
                'info' => $this->responseInfoLogin($user),
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ValidationException) {
                return response()->json([
                    'errors' => $th->errors(),
                ]);
            }
            return response()->json([
                'errors' => $th->getMessage()
            ]);
        }
    }
    public function favouriteSongUser($idUser)
    {
        $userFavouriteSong = FavoritesSong::query()
            ->select(['song_id', 'favourited'])
            ->where('favourited', true)
            ->where('user_id', $idUser)
            ->get()->pluck('song_id');
        return $userFavouriteSong;
    }
    public function FavouritePlaylistUser($idUser)
    {
        $userFavouriteAlbum = FavoritesAlbum::query()
            ->select(['album_id', 'favourited'])
            ->where('favourited', true)
            ->where('user_id', $idUser)
            ->get()->pluck('album_id');
        return $userFavouriteAlbum;
    }
    public function followArtist($idUser)
    {
        $follow = Follow::query()
            ->select(['artist_id', 'is_active'])
            ->where('is_active', true)
            ->where('user_id', $idUser)
            ->get()->pluck('artist_id');
        return $follow;
    }
    public function createdPlaylists($idUser)
    {
        $createdPlaylists = Album::query()
            ->select(['id', 'title', 'aliasTitle'])
            ->where('user_id', $idUser)
            ->get();
        return $createdPlaylists;
    }
    public function register()
    {
        try {
            $data = request()->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            User::query()->create($data);
            return response()->json([
                'status' => 201,
                'msg' => 'Registered successfully'
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ValidationException) {
                return response()->json([
                    'errors' => $th->errors(),
                    'status' => 422
                ]);
            }
            return response()->json([
                'errors' => $th->getMessage()
            ]);
        }
    }
    public function logout()
    {
        try {
            request()->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 200,
                'msg' => 'logout successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'errors' => $th->getMessage()
            ]);
        }
    }
    public function authGoogle(Request $request)
    {
        $data = null;
        $token = request('token');
        $googleUserToken = Socialite::driver('google')->userFromToken($token);
        if ($googleUserToken) {
            $user = User::query()->where('google_id', $googleUserToken->id)->first();
            if ($user) {
                $token = $user->createToken($user->id)->plainTextToken;
                $data = [
                    'status' => 200,
                    'msg' => 'login successfully',
                    'info' => $this->responseInfoLogin($user),
                    'token' => $token
                ];
            } else {
                $newUser = User::query()->create([
                    'name' => $googleUserToken->name,
                    'email' => $googleUserToken->email,
                    'google_id' => $googleUserToken->id
                ]);
                $token = $newUser->createToken($newUser->id)->plainTextToken;
                $data = [
                    'status' => 200,
                    'msg' => 'login successfully',
                    'info' => $this->responseInfoLogin($newUser),
                    'token' => $token
                ];

            }
            return response()->json($data);
        } else {
            return response()->json(['success' => false, 'status' => 401], 401);
        }
    }
    public function responseInfoLogin($user)
    {
        $info = [
            'name' => $user->name,
            'liked_songs' => $this->favouriteSongUser($user->id),
            'liked_playlists' => $this->FavouritePlaylistUser($user->id),
            'followed_artists' => $this->followArtist($user->id),
            'created_playlists' => $this->createdPlaylists($user->id)
        ];
        return $info;
    }
}
