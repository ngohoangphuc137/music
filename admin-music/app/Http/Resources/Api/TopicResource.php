<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\AlbumResource;

class TopicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'aliasTitle'=>$this->aliasTitle,
            'description'=>$this->description,
            $this->mergeWhen(isset($this->topicItemAlbum),[
                'item_Topic'=>AlbumResource::collection($this->whenLoaded('topicItemAlbum'))
            ])
        ];
    }
}
