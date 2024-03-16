<?php

use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register',[UserAuthController::class,'register']);
Route::post('login',[UserAuthController::class,'login']);
Route::post('logout',[UserAuthController::class,'logout'])
    ->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Route::middleware('auth:sanctum')
//    ->group(function() {
//        Route::resource('properties', \App\Http\Controllers\APIPropertyController::class);
//    });

Route::resource('properties', \App\Http\Controllers\APIPropertyController::class);
Route::resource('posts', \App\Http\Controllers\Blog\APIPostController::class);
