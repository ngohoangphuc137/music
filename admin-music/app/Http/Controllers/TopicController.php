<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\ConvertVnCharset;

use App\Models\Topic;
use App\Models\TopicItem;
use App\Models\MusicGenre;
use App\Models\Album;
use App\Models\AlbumGenre;
use App\Models\FavoritesSong;
use App\Models\Song;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    const PATH_VIEW = 'admin.topics.';
    public $convertVnCharset;
    public function __construct()
    {
        $this->convertVnCharset = new ConvertVnCharset();
    }
    public function index()
    {
        $topic = Topic::query()->withCount('topicItem')->get();
        return view(self::PATH_VIEW . __FUNCTION__, compact('topic'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view(self::PATH_VIEW . __FUNCTION__);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['aliasTitle'] = $this->convertVnCharset->convertVnCharset($request->title);
        Topic::query()->create($data);
        return redirect()->back()->with('success', 'Thêm thành công');
    }

    /**
     * Display the specified resource.
     */
    public function addTopic(string $id)
    {
        $musicGenre = MusicGenre::withDepth()
            ->with('children')
            ->where('parent_id', '=', null)
            ->get()
            ->toFlatTree();
        $topic = Topic::query()->select(['id', 'title'])->find($id);

        return view(self::PATH_VIEW . __FUNCTION__, compact(['musicGenre', 'topic']));
    }
    public function getPlayList($idPlayList, $idGenre)
    {
        try {
            $TopicItem = TopicItem::select('album_id');

            $playList = MusicGenre::query()
                ->select(['id', 'name_genre'])
                ->with([
                    'playList' => function ($query) use ($TopicItem) {

                        $query->select(['albums.id', 'albums.title', 'albums.thumbnail', 'albums.isAlbum'])
                            ->whereNotIn('albums.id', $TopicItem)
                            ->where('albums.isAlbum', false);
                    }
                ])->find($idGenre);

            if (!$playList) {
                return response()->json([
                    'error' => 'Failed to fetch data',
                    'status' => 500
                ], 500);
            }

            return response()->json([
                'data' => $playList,
                'status' => 200,
                'message' => 'data fetched successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch data',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function insertPlaylist(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            foreach ($request->data as $value) {
                TopicItem::query()->create([
                    'topic_id' => $id,
                    'album_id' => $value,
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Success',
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'error',
            ], 200);
        }
    }

    public function show(string $id)
    {
        $topicItem = Topic::query()
            ->select(['id', 'title'])
            ->with('topicItemAlbum', function ($query) {
                $query->withCount('albumSongs');
            })->find($id);

        return view(self::PATH_VIEW . __FUNCTION__, compact('topicItem'));
    }
    public function destroyItemTopic(string $id)
    {
        $topicItem = TopicItem::query()->where('album_id', $id)->first();

        $topicItem->delete();

        return back();
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $topic = Topic::query()->find($id);
        return view(self::PATH_VIEW . __FUNCTION__, compact('topic'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $topic = Topic::query()->find($id);
        $topic->update($request->all());
        return redirect()->back()->with('success', 'Sửa thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $topic = Topic::query()->find($id);
        $TopicItem = TopicItem::query()->where('topic_id', $topic->id)->get();
        if (!$TopicItem->isEmpty()) {
            foreach ($TopicItem as $value) {
                $value->delete();
            }
        }
        $topic->delete();
        return back();
    }
}
