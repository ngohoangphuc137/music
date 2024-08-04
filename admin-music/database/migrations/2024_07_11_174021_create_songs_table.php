<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\MusicGenre;
use App\Models\Album;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id()->index();
            $table->foreignIdFor(MusicGenre::class)->index()->constrained();
            $table->foreignIdFor(Album::class)->nullable()->constrained();
            $table->string('name')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('alias')->nullable();
            $table->string('duration')->nullable()->comment('thời lượng bài hát');
            $table->string('audio_file')->nullable()->comment('đường dẫn file');
            $table->date('release_date')->comment('ngày phát hành');
            $table->text('lyrics')->nullable();
            $table->unsignedInteger('total_listens')->default(0)->comment('Số lượt nghe');
            $table->boolean('isOffical')->default(0)->comment('là chính thức');
            $table->boolean('isPrivate')->default(0)->comment('là riêng tư');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
