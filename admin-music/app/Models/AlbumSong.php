<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumSong extends Model
{
    use HasFactory;

    protected $fillable = [
        'song_id',
        'album_id',
    ];
    public function songs()
    {
        return $this->hasMany(Song::class);
    }
    public function songBelongto()
    {
        return $this->belongsTo(Song::class,'song_id');
    }
}
