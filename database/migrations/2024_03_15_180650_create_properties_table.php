<?php

use App\Models\PropertyCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(\App\Models\User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Country::class)->nullable()->constrained();
            $table->foreignIdFor(\App\Models\Category::class)->nullable()->constrained();

            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->text('featured_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('video_links')->nullable();
            $table->boolean('is_published')->default(false);
            $table->decimal('price')->nullable();
            $table->text('location')->nullable();
            $table->string('mls_code')->unique();
            $table->string('build_year')->nullable();
            $table->integer('property_size')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('listing_type', ['Exclusive Listing', 'Lease', 'Rental', 'Sale'])->nullable();
            $table->json('amenities')->nullable();
            $table->json('category_attributes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
