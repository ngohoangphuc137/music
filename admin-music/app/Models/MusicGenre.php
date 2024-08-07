<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class MusicGenre extends Model
{
    use HasFactory;

    use NodeTrait;

    protected $fillable = [
        "name_genre",
        "description",
        "alias",
        "link",
    ];

    public function artits()
    {
        return $this->hasMany(Artist::class);
    }
    public function album()
    {
        return $this->belongsToMany(Album::class, 'album_genres', 'music_genre_id', 'album_id');
    }
    public function songs()
    {
        return $this->hasMany(Song::class);
    }
    public function playList(){
        return $this->belongsToMany(Album::class,'album_genres','music_genre_id','album_id');
    }
}
