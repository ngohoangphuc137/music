<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagePlaylistUser extends Model
{
    use HasFactory;
    protected $fillable = [
        'album_id',
        'array_id_song',
    ];
    protected $casts = [
        'array_id_song' => 'array',
    ];
}
