<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use League\CommonMark\Extension\CommonMark\Node\Inline\Strong;

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
            'id' => $this->id,
            'name' => $this->name,
            'thumbnail' => Storage::url($this->thumbnail),
            'alias' => $this->alias,
            'audio_file' => Storage::disk('s3')->url($this->audio_file),
            'duration' => $this->duration,
            'release_date' => $this->release_date,
            'total_listens' => $this->total_listens,
            'isOffical' => $this->isOffical,
            'isPrivate' => $this->isPrivate,
            'artist'=>$this->artist->makeHidden('pivot'),
            'artistsNames'=>collect($this->artist)->pluck('name')->implode(', '),
            'composers'=>$this->song_composers->makeHidden('pivot'),
            'composerNames'=>collect($this->song_composers)->pluck('name')->implode(', '),
            'genre'=>$this->music_genre,
        ];
    }
}
