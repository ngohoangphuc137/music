<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoritesAlbum extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'album_id',
        'favourited'
    ];
    protected $casts = [
        'favourited' => 'boolean',
    ];
    public function album(){
        return $this->belongsTo(Album::class);
    }
}
