<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
use App\Models\Song;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favorites_songs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->index()->constrained();
            $table->foreignIdFor(Song::class)->index()->constrained();
            $table->boolean('favourited')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites_songs');
    }
};
