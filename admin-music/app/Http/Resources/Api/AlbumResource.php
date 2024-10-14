<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\ArtistResource;
use App\Http\Resources\Api\GenreResource;
use App\Http\Resources\Api\SongsResource;
use App\Models\User;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            $this->mergeWhen(isset($this->type), [
                'type' => $this->type
            ]),
            'id' => $this->id,
            $this->mergeWhen(isset($this->title), [
                'title' => $this->title,
            ]),
            $this->mergeWhen(isset($this->name), [
                'name' => $this->name,
            ]),
            'aliasTitle' => $this->aliasTitle,
            'thumbnail' => Storage::url($this->thumbnail),
            'description' => $this->description,
            $this->mergeWhen(!$this->albumArtists->isEmpty(), [
                'artist' => ArtistResource::collection($this->whenLoaded('albumArtists')),
            ]),
            $this->mergeWhen($this->whenHas('songAlbumBeLongToMany'), [
                'song' => SongsResource::collection($this->whenLoaded('songAlbumBeLongToMany')),
            ]),
            $this->mergeWhen(!$this->albumArtists->isEmpty(), [
                'genre' => GenreResource::collection($this->albumGenres),
            ]),
            'userType' => $this->user->type == User::TYPE_ADMIN ? 1 : 2,
            'userName' => $this->user->type == User::TYPE_ADMIN ? "Admin" : $this->user->name,
            'isAlbum' => $this->isAlbum,
            'totalFavourited' => $this->favorites_albums_count,
        ];
    }
}
