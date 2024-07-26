<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumArtist extends Model
{
    use HasFactory;
    protected $fillable = [
        'album_id',
        'artist_id',
    ];
}
