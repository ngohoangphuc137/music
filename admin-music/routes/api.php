<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\SongController;
use App\Http\Controllers\API\PlayListController;
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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('page/get/home',           [HomeController::class,'home']);
Route::get('get/idSong',              [SongController::class,'getIdSong']);
Route::get('get/infoSong',            [SongController::class,'infoSong'])->middleware('throttle:100,1');
Route::get('get/linkSong',            [SongController::class,'linkSong']);
Route::get('get/playList',            [PlayListController::class,'getPlayList']);
Route::get('page/get/musicFavorites', [SongController::class,'musicFavorites']);

