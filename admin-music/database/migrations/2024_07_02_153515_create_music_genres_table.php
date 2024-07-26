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
        Schema::create('music_genres', function (Blueprint $table) {
            $table->id();
            $table->string('name_genre')->unique();
            $table->string('description')->nullable();
            $table->string('link')->nullable();
            $table->string('alias')->comment('bí danh')->nullable();
            $table->nestedSet();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('music_genres', function (Blueprint $table) {
        //     $table->dropNestedSet();
        // });
        Schema::dropIfExists('music_genres');
    }
};
