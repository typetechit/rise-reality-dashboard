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
            $table->foreignIdFor(\App\Models\Country::class)->constrained();
            $table->foreignIdFor(PropertyCategory::class)->constrained();

            $table->string('title');
            $table->text('featured_image')->nullable();
            $table->text('short_description')->nullable();
            $table->text('full_description')->nullable();
            $table->decimal('price')->nullable();
            $table->text('location')->nullable();
            $table->string('mls_code')->unique();
            $table->year('build_year')->nullable();
            $table->integer('property_size')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('listing_type', ['Exclusive Listing', 'Lease', 'Rental', 'Sale'])->nullable();
            $table->json('amenities')->nullable();

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
