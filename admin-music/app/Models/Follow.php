<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'artist_id',
        'is_active'
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function artist(){
        return $this->belongsTo(Artist::class);
    }

}
