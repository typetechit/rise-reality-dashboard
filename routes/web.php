<?php

use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\ContactMessage\ContactMessageController;
use App\Http\Controllers\Faq\FaqController;
use App\Http\Controllers\Inbox\InboxController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Property\PropertyController;
use App\Http\Controllers\Settings\AmenityController;
use App\Http\Controllers\Settings\AttributeController;
use App\Http\Controllers\Settings\CategoryController;
use App\Http\Controllers\Testimonial\TestimonialController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('users/{user}/updatePassword', [UserController::class, 'updatePassword'])->name('users.updatePassword');
    Route::resource('users', UserController::class);
    Route::resource('posts', PostController::class);

    Route::post('properties/{property}/removeGalleryImage', [PropertyController::class, 'removeGalleryImage'])
        ->name('properties.removeGalleryImage');
    Route::resource('properties', PropertyController::class);


    Route::resource('faqs', FaqController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('contact-messages', ContactMessageController::class);

    Route::get('inbox', [InboxController::class, 'index'])->name('inbox.index');

    Route::post('editor-file-upload', [\App\Http\Controllers\EditorFileUploadController::class, 'upload'])
        ->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);

    Route::prefix('settings')
        ->name('settings.')
        ->group(function(){
            Route::resource('categories', CategoryController::class);
            Route::resource('attributes', AttributeController::class);
            Route::resource('amenities', AmenityController::class);
        });
});

require __DIR__.'/auth.php';
