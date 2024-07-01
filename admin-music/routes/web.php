<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

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
Route::get('login',      [LoginController::class,'showLoginForm'])->name('login');
Route::post('login',     [LoginController::class,'login']);

Route::post('logout',    [LoginController::class,'logout'])->name('logout');

Route::get('register',   [RegisterController::class,'showRegisterForm'])->name('register');
Route::post('register',  [RegisterController::class,'register']);



// Route::get('', []);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
