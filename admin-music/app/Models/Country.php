<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'thumbnail',
        'country_code_no',
    ];

    public function artits()
    {
        return $this->hasMany(Artist::class);
    }

    
}
