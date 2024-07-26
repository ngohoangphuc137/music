<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Country;
use App\Models\MusicGenre;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Country::class)->constrained();
            $table->string('name')->nullable();
            $table->string('realname')->nullable();
            $table->string('link')->nullable();
            $table->string('alias')->nullable()->comment('bí danh');
            $table->string('thumbnail')->nullable();
            $table->enum('sex',['nam','nu'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};
