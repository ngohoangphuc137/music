<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'aliasTitle',
        'description'
    ];
    public function topicItem()
    {
        return $this->hasMany(TopicItem::class);
    }
    public function topicItemAlbum(){
        return $this->belongsToMany(Album::class,'topic_items','topic_id','album_id');
    }
}
