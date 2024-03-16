<?php

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
        Schema::create('property_info', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Property::class)->constrained()->cascadeOnDelete();

            $table->string('key')->unique()->index();
            $table->string('value')->nullable();
            $table->json('data')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_info');
    }
};
