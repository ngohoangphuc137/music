<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongImplementer extends Model
{
    use HasFactory;
    protected $fillable = [
        'song_id',
        'artist_id',
    ];
    public function songs()
    {
        return $this->belongsTo(Song::class,'song_id');
    }
}
