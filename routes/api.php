<?php

use App\Http\Controllers\APIWebsiteController;
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

Route::resource('properties', \App\Http\Controllers\Property\APIPropertyController::class);
Route::resource('posts', \App\Http\Controllers\Blog\APIPostController::class);
Route::resource('faqs', \App\Http\Controllers\Faq\APIFaqController::class);
Route::resource('testimonials', \App\Http\Controllers\Testimonial\APITestimonialController::class);
Route::get('website/filter_options', [APIWebsiteController::class, 'getFilterOptions'])->name('website.getFilterOptions');
