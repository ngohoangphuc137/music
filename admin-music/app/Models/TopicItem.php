<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicItem extends Model
{
    use HasFactory;
    protected $fillable=[
        'topic_id',
        'album_id'
    ];
}
