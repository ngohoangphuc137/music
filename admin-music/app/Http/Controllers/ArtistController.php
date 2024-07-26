<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Database\Eloquent\Builder;


use App\Models\MusicGenre;
use App\Models\Country;
use App\Models\Artist;
use App\Http\Controllers\ConvertVnCharset;
use App\Http\Requests\AstistRequest;
use Illuminate\Support\Facades\DB;

class ArtistController extends Controller
{
    const PATH_VIEW = "admin.artists.";
    const PATH_UPLOAD = "artists";
    const DEFAULT_AVATAR = "default-avatar.jpg";
    const PATH_LINK = "/nghe-si/";

    public $convertVnCharset;
    public function __construct()
    {
        $this->convertVnCharset = new ConvertVnCharset();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $artists = Artist::query()->with('country')->get();
       
        return view(self::PATH_VIEW . 'index', compact('artists'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $countries = Country::query()
            ->select(['id', 'name'])
            ->get();

        return view(self::PATH_VIEW . 'create', compact(['countries']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AstistRequest $request)
    {
        $data = $request->except('thumbnail');

        $data['alias'] = $this->convertVnCharset->convertVnCharset($request->name);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
        } else {
            $data['thumbnail'] = self::PATH_UPLOAD . '/' . self::DEFAULT_AVATAR;
        }

        $artist = Artist::query()->create($data);

        $alias = $artist->alias;
        if (Artist::where('alias', $alias)->whereNot('id', $artist->id)->exists()) {
            $alias .= '-' . $artist->id;
            $artist->alias = $alias;
        }

        $link = self::PATH_LINK . $alias;
        $artist->link = $link;
        $artist->save();

        return redirect()->back()->with('success', 'Thêm thành công');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $artist = Artist::query()->find($id);

        $countries = Country::query()
            ->select(['id', 'name'])
            ->get();


        return view(self::PATH_VIEW . 'edit', compact(['countries', 'artist']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AstistRequest $request, string $id)
    {
        $data = $request->except('thumbnail');

        $getArtist = Artist::query()->find($id);

        $artistThumbnail = base64_encode(Storage::get($getArtist->thumbnail));
        $defaultAvatar = base64_encode(Storage::get(self::PATH_UPLOAD . '/' . self::DEFAULT_AVATAR));

        $data['thumbnail'] = $getArtist->thumbnail;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
        }

        if (Storage::exists($getArtist->thumbnail) && $request->hasFile('thumbnail')) {
            if ($artistThumbnail !== $defaultAvatar) {
                Storage::delete($getArtist->thumbnail);
            }
        }

        $getArtist->update($data);

        return redirect()->back()->with('success', 'Sửa thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        try {
            $artist = Artist::query()->findOrFail($id);

            $artistThumbnail = base64_encode(Storage::get($artist->thumbnail));
            $defaultAvatar = base64_encode(Storage::get(self::PATH_UPLOAD . '/' . self::DEFAULT_AVATAR));

            DB::transaction(function () use ($artist) {
                foreach ($artist->hasManyFollows as $key => $value) {
                    $value->delete();
                }

                $artist->delete();
            });

            if (Storage::exists($artist->thumbnail)) {
                if ($artistThumbnail !== $defaultAvatar) {
                    Storage::delete($artist->thumbnail);
                }
            }

            return back();
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'deleted error',
            ]);
        }
    }
}
