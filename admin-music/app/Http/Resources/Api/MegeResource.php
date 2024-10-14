<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use voku\helper\ASCII;

class MegeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         $songs = collect(value: $this->songs['data'] ?? []);
         $artists = collect($this->artists['data'] ?? []);
         $albums = collect($this->albums['data'] ?? []);
         
         $data = $songs->merge($artists)->merge($albums)->toArray();
         $query = ASCII::to_ascii($request['query']);
         usort($data, function ($a, $b) use ($query) {
            // Kiểm tra nếu 'name' tồn tại trong mỗi phần tử
            if (!isset($a['name']) || !isset($b['name'])) {
                return 0;
            }
            
            // Tính mức độ giống nhau của $a['name'] và $b['name'] với từ khóa $query
            $similarityA = levenshtein(strtolower(ASCII::to_ascii($a['name'])), strtolower($query));
            $similarityB = levenshtein(strtolower(ASCII::to_ascii($b['name'])), strtolower($query));
            
            // Sắp xếp theo thứ tự tăng dần của mức độ giống nhau (mức độ càng nhỏ càng gần giống)
            return $similarityA <=> $similarityB;
        });
         $data = array_slice($data,0,9);

         return $data;
    }
}
