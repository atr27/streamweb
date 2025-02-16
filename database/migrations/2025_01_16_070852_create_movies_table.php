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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 191);
            $table->string('slug', 191)->unique();
            $table->string('genre', 50);
            $table->text('description')->nullable();
            $table->string('duration', 10);  // Format: HH:MM:SS
            $table->string('thumbnail', 255);
            $table->year('release_year');
            $table->decimal('rating', 3, 1)->default(0.0);  // Allow ratings from 0.0 to 10.0
            $table->string('video_url', 255);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
