<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\SongController;
use App\Http\Controllers\API\PlayListController;
use App\Http\Controllers\API\ArtistController;
use App\Http\Controllers\API\TopicController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\GenreAlbumController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserFavouriteController;
use App\Http\Controllers\API\UserLibaryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::post('testQueues',                   [SongController::class,'testQueues']);
Route::middleware(['checkBearerToken','auth:sanctum'])->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('user/favourite',                  [UserFavouriteController::class, 'userFavorite']);
    Route::get('user/follow',                     [UserFavouriteController::class, 'followArtist']);
    Route::get('user/get/libary',                 [UserLibaryController::class, 'userLibary']);
    Route::get('user/get/list/playlist',          [UserLibaryController::class, 'listLibaryPlaylist']);
    Route::get('user/get/list/artist',            [UserLibaryController::class, 'listLibaryArtist']);
    Route::post('user/playlist/post/create',      [UserLibaryController::class,'createPlaylist']);
    Route::post('user/song/post/add-to-playlist', [UserLibaryController::class,'addToPlaylist']);
    Route::post('user/song/post/remove-from-list',[UserLibaryController::class,'deleteSongPlaylist']);
    Route::get('user/get/list-recently',          [UserLibaryController::class,'getListRecentlyHeard']);
    Route::post('user/post/add-to-recently',      [UserLibaryController::class,'addRecentlyHeard']);
    
});
    


Route::post('login',                 [AuthController::class, 'login']);
Route::post('register',              [AuthController::class, 'register']);
Route::post('logout',                [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('auth/google',           [AuthController::class, 'authGoogle']);

Route::get('page/get/home',          [HomeController::class, 'home']);

Route::get('page/get/musicFavorites',[SongController::class, 'musicFavorites']);
Route::get('get/idSong',             [SongController::class, 'getIdSong']);
Route::get('get/infoSong',           [SongController::class, 'infoSong'])->middleware('throttle:100,1');
Route::get('get/linkSong',           [SongController::class, 'linkSong']);

Route::get('get/playList',           [PlayListController::class, 'getPlayList']);

Route::get('page/get/artist',        [ArtistController::class, 'artist']);
Route::get('artist/get/list',        [ArtistController::class, 'getListAllSong_album']);

Route::get('page/get/topic-home',    [TopicController::class, 'topic']);
Route::get('page/get/topic-detail',  [TopicController::class, 'topic_detail']);

Route::get('search/suggestions',     [SearchController::class, 'suggestions']);
Route::get('page/search',            [SearchController::class, 'pageSearch']);

Route::get('genre/get/info',         [GenreAlbumController::class, 'genreMusic']);
Route::get('genrealbum/get/list',    [GenreAlbumController::class, 'genreAlbum']);
Route::get('get/genreParent',        [GenreAlbumController::class, 'genreParent']);

