<?php

use App\Http\Controllers\APIWebsiteController;
use App\Http\Controllers\Blog\APIPostController;
use App\Http\Controllers\ContactMessage\APIContactMessageController;
use App\Http\Controllers\Faq\APIFaqController;
use App\Http\Controllers\Property\APIPropertyController;
use App\Http\Controllers\Testimonial\APITestimonialController;
use App\Http\Controllers\User\APIUserController;
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

Route::resource('properties', APIPropertyController::class);
Route::resource('posts', APIPostController::class);
Route::resource('faqs', APIFaqController::class);
Route::resource('testimonials', APITestimonialController::class);
Route::get('website/filter_options', [APIWebsiteController::class, 'getFilterOptions'])->name('website.getFilterOptions');
Route::get('contact-messages', [APIContactMessageController::class, 'store']);
Route::resource('users', APIUserController::class);
