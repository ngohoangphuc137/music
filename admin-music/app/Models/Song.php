<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'music_genre_id',
        'album_id',
        'name',
        'link',
        'thumbnail',
        'alias',
        'duration',
        'audio_file',
        'release_date',
        'lyrics',
        'total_listens',
        'isOffical',
        'isPrivate',
        'isAlbum',
    ];
    protected $casts = [
        'isOffical' => 'boolean',
        'isPrivate' => 'boolean',
        'isAlbum' => 'boolean',
    ];
    public function artist()
    {
        return $this->belongsToMany(Artist::class, 'song_composers', 'song_id', 'artist_id');
    }
    public function song_composers()
    {
        return $this->belongsToMany(Artist::class, 'song_implementers', 'song_id', 'artist_id');
    }
    public function music_genre()
    {
        return $this->belongsTo(MusicGenre::class);
    }
   
}
