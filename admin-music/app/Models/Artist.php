<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        "country_id",
        "realname",
        "name",
        "alias",
        "thumbnail",
        "sex",
        "link",
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    // mối quan hệ với bảng Follows
    public function hasManyFollows()
    {
        return $this->hasMany(Follow::class);
    }
    public function songImplementers()
    {
        return $this->hasMany(SongImplementer::class);
    }
    public function songComposers()
    {
        return $this->hasMany(SongComposer::class);
    }
    // mối quan hệ n-n giữa 2 bảng user,artist
    // Mối quan hệ với bảng User thông qua bảng follows
    public function followers()
    {
        return $this->belongsToMany(User::class,'follows','artist_id', 'user_id');
    }

}
