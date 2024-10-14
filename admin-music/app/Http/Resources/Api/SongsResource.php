<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\MusicGenre;
use App\Http\Resources\Api\AlbumResource;
use App\Http\Resources\Api\ArtistResource;

class SongsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            $this->mergeWhen(isset($this->type),[
                'type'=>$this->type
            ]),
            'id' => $this->id,
            'name' => $this->name,
            'alias' => $this->alias,
            'thumbnail' =>Storage::url($this->thumbnail),
            'duration' => $this->duration,
            // 'link' => '/bai-hat/' . $this->alias . '/' . $this->id,
            $this->mergeWhen($this->relationLoaded('artist'),[
                'artist'=>ArtistResource::collection($this->whenLoaded('artist')),
            ]),
            $this->mergeWhen($this->relationLoaded('song_composers'),[
                'composers'=>ArtistResource::collection($this->whenLoaded('song_composers'))
            ]),
            $this->mergeWhen(isset($this->audio_file),[
                'audio_file'=>$this->audio_file
            ]),
            'genre' => $this->genre($this->music_genre_id),
            $this->mergeWhen($this->relationLoaded('album'),[
                'album'=>new AlbumResource($this->whenLoaded('album')),
            ]),
            'totalListens' => $this->total_listens,
            'totalFavourited' => $this->favorites_song_count,
        ];
    }
    public function genre($id)
    {
        $genre = MusicGenre::query()
            ->select(['id', 'name_genre', 'alias', '_lft', '_rgt'])
            ->ancestorsAndSelf($id);
        $data = $genre->map(function ($genre) {
            return [
                'id' => $genre->id,
                'name' => $genre->name_genre,
                'alias' => $genre->alias,
            ];
        });
        return $data;
    }
}
