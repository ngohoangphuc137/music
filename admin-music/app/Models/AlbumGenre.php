<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumGenre extends Model
{
    use HasFactory;
    protected $fillable = [
        'album_id',
        'music_genre_id',
    ];
    public function genre()
    {
        return $this->belongsTo(MusicGenre::class, 'music_genre_id');
    }
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
