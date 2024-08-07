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
    ];
    public function artist()
    {
        return $this->belongsToMany(Artist::class, 'song_implementers', 'song_id', 'artist_id');
    }
    public function song_composers()
    {
        return $this->belongsToMany(Artist::class, 'song_composers', 'song_id', 'artist_id');
    }
    public function song_composers_hasMany()
    {
        return $this->hasMany(SongComposer::class);
    }
    public function song_implementers_hasMany()
    {
        return $this->hasMany(SongImplementer::class);
    }
    public function music_genre()
    {
        return $this->belongsTo(MusicGenre::class);
    }
    public function album()
    {
        return $this->belongsTo(Album::class,'album_id');
    }
    public function albumSong()
    {
        return $this->hasMany(AlbumSong::class);
    }
    
}
