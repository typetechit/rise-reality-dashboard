<?php

use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\ContactMessage\ContactMessageController;
use App\Http\Controllers\Faq\FaqController;
use App\Http\Controllers\Inbox\InboxController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Property\PropertyController;
use App\Http\Controllers\Testimonial\TestimonialController;
use Illuminate\Foundation\Application;
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

    Route::resource('posts', PostController::class);
    Route::resource('properties', PropertyController::class);
    Route::resource('faqs', FaqController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('contact-messages', ContactMessageController::class);
    Route::get('inbox', [InboxController::class, 'index'])->name('inbox.index');
});

require __DIR__.'/auth.php';
