<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'aliasTitle',
        'user_id',
        'artistsNames',
        'thumbnail',
        'link',
        'isAlbum',
        'description',
    ];
    protected $casts = [
        'isAlbum' => 'boolean',
    ];
    public function albumArtists(){
        return $this->belongsToMany(Artist::class,'album_artists','album_id','artist_id');
    }
    public function albumGenres(){
        return $this->belongsToMany(MusicGenre::class,'album_genres','album_id','music_genre_id');
    }
    public function genre(){
        return $this->hasMany(AlbumGenre::class);
    }
    public function albumSongs(){
        return $this->hasMany(AlbumSong::class);
    }
    public function songAlbumBeLongToMany(){
        return $this->belongsToMany(Song::class,'album_songs','album_id','song_id');
    }
    public function topicItems(){
        return $this->hasMany(TopicItem::class,'album_id');
    }
    public function favoritesAlbums(){
        return $this->hasMany(FavoritesAlbum::class);
    }
    public function user(){
       return $this->belongsTo(User::class);
    }
}
