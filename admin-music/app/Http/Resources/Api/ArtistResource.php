<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtistResource extends JsonResource
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
            'thumbnail' => Storage::url($this->thumbnail),
            'alias' => $this->alias,
            'national' => isset($this->country) ? $this->country?->name : "_",
            'realname' => $this->realname,
            'totalFollow' => $this->followers_count,
        ];
    }
}
