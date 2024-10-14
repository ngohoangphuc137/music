<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Topic;
use App\Http\Resources\Api\TopicResource;

class TopicController extends Controller
{
    public function topic()
    {
        $topic = Topic::query()
            ->select(['id', 'title', 'aliasTitle', 'description'])
            ->with([
                'topicItemAlbum' => function ($query) {
                    $query->select('albums.id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.user_id')
                        ->withCount([
                            'favoritesAlbums' => function ($query) {
                                $query->where('favourited', true);
                            },
                        ])
                        ->with([
                            'albumArtists' => function ($query) {
                                $query->withCount([
                                    'followers' => function ($query) {
                                        $query->where('is_active', true);
                                    }
                                ]);
                            },
                            'albumGenres'
                        ]);
                }
            ])
            ->get();

        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data' => TopicResource::collection($topic)
        ]);
    }
    public function topic_detail(Request $request)
    {
        if (!isset($request->id)) {
            return response()->json([
                'msg' => 'Incorrect url data entered',
                'status' => 404
            ], 404);
        }
        $topicDetail = Topic::query()
            ->select(['id', 'title', 'aliasTitle', 'description'])
            ->with([
                'topicItemAlbum' => function ($query) {
                    $query->select('albums.id', 'albums.title', 'albums.aliasTitle', 'albums.thumbnail', 'albums.isAlbum', 'albums.user_id')
                        ->withCount([
                            'favoritesAlbums' => function ($query) {
                                $query->where('favourited', true);
                            },
                        ])
                        ->with([
                            'albumArtists' => function ($query) {
                                $query->withCount([
                                    'followers' => function ($query) {
                                        $query->where('is_active', true);
                                    }
                                ]);
                            },
                            'albumGenres'
                        ]);
                }
            ])
            ->find($request->id);
        if (!$topicDetail) {
            return response()->json([
                'msg' => 'data does not exits by this id',
                'status' => 404
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'msg' => 'success',
            'data'=>new TopicResource($topicDetail)
        ]);
    }
}
