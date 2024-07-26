<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class MusicGenre extends Model
{
    use HasFactory;

    use NodeTrait;

    protected $fillable = [
        "name_genre",
        "description",
        "alias",
        "link",
    ];

    public function artits()
    {
        return $this->hasMany(Artist::class);
    }

}