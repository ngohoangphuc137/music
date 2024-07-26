<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\MusicGenreController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SongController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Auth::routes();
Route::get('login',                                   [LoginController::class,'showLoginForm'])->name('login');
Route::post('login',                                  [LoginController::class,'login']);

Route::post('logout',                                 [LoginController::class,'logout'])->name('logout');

Route::get('register',                                [RegisterController::class,'showRegisterForm'])->name('register');
Route::post('register',                               [RegisterController::class,'register']);

Route::get('/home',                                   [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['middleware'=>'isAdmin'],function(){
    // Route table countrys
    Route::get('quoc-gia',                            [CountryController::class, 'index'])->name('countrys.index');
    Route::get('quoc-gia/create',                     [CountryController::class, 'create'])->name('countrys.create');
    Route::post('quoc-gia/store',                     [CountryController::class,'store'])->name('countrys.store');
    Route::get('quoc-gia/{id}/edit',                  [CountryController::class,'edit'])->name('countrys.edit');
    Route::post('quoc-gia/{id}',                      [CountryController::class,'update'])->name('countrys.update');
    Route::get('quoc-gia/{id}',                       [CountryController::class,'destroy'])->name('countrys.destroy');

    // Route table genres
    Route::get('genres',                              [MusicGenreController::class, 'index'])->name('genres.index');
    Route::get('genres/create',                       [MusicGenreController::class, 'create'])->name('genres.create');
    Route::post('genres/store',                       [MusicGenreController::class,'store'])->name('genres.store');
    Route::get('genres/{id}/edit',                    [MusicGenreController::class,'edit'])->name('genres.edit');
    Route::match(['put','patch'],'genres/{id}',       [MusicGenreController::class,'update'])->name('genres.update');
    Route::get('genres/{id}',                         [MusicGenreController::class,'destroy'])->name('genres.destroy');

    //route table artist
    Route::get('artist',                              [ArtistController::class,'index'])->name('artists.index');
    Route::get('artist/fetchData/{id}',               [ArtistController::class,'fetchData'])->name('artists.fetchData');
    Route::get('artist/create',                       [ArtistController::class,'create'])->name('artists.create');
    Route::get('artist/edit/{id}',                    [ArtistController::class,'edit'])->name('artists.edit');
    Route::post('artist/store',                       [ArtistController::class,'store'])->name('artists.store');
    Route::post('artist/{id}',                        [ArtistController::class,'update'])->name('artists.update');
    Route::get('artist/destroy/{id}',                 [ArtistController::class,'destroy'])->name('artists.destroy');

    //route table songs
    Route::get('song',                                [SongController::class,'index'])->name('songs.index');
    Route::get('song/create',                         [SongController::class,'create'])->name('songs.create');
    Route::post('song/store',                         [SongController::class,'store'])->name('songs.store');
    Route::get('song/edit/{id}',                      [SongController::class,'edit'])->name('songs.edit');
    Route::get('song/id/{id}',                        [SongController::class,'apiSongs'])->name('songs.apiSongs');
    Route::get('song/genre/id/{id}',                  [SongController::class,'apiGenre'])->name('songs.apiGenre');
    Route::post('song/updata/{id}',                   [SongController::class,'update'])->name('songs.updata');
    Route::delete('song/{id}/destroy',                [SongController::class,'destroy'])->name('songs.destroy');

});
