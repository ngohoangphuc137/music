<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Topic;
use App\Models\TopicItem;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    const PATH_VIEW = 'admin.topics.';
    public function index()
    {
        $topic = Topic::query()->get();
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
        Topic::query()->create($request->all());
        return redirect()->back()->with('success', 'Thêm thành công');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $topic = Topic::query()->find($id);
        return view(self::PATH_VIEW . __FUNCTION__,compact('topic'));
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
        $TopicItem = TopicItem::query()->where('topic_id',$topic->id)->get();
        if(!$TopicItem->isEmpty()){
            foreach ($TopicItem as $key => $value) {
                $value->delete();
            }
        }
        $topic->delete();
        return back();
    }
}
