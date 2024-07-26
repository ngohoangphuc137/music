<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MusicGenre;
use App\Http\Requests\MusicGenreRequest;
use App\Http\Controllers\ConvertVnCharset;


class MusicGenreController extends Controller
{

    const PATH_VIEW = "admin.genres.";
    const PATH_LINK = "/the-loai/";
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $genres = MusicGenre::withDepth()
            ->with('ancestors')
            ->get()
            ->toFlatTree();

        return view(self::PATH_VIEW . 'index', compact("genres"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genres = MusicGenre::get()->toTree();

        $traverse = function ($genres, $prefix = '') use (&$traverse) {
            $listGenres = [];
            foreach ($genres as $genre) {
                $listGenres[] = [
                    'id' => $genre->id,
                    'name' => $prefix . ' ' . $genre->name_genre,
                ];

                $listGenres = array_merge($listGenres, $traverse($genre->children, $prefix . '--'));
            }

            return $listGenres;
        };

        $parentChildrem = $traverse($genres);

        return view(self::PATH_VIEW . 'create', compact("parentChildrem"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MusicGenreRequest $request)
    {
        $ConvertVnCharset = new ConvertVnCharset();

        $data = $request->except('parent_id');

        $data['alias'] = $ConvertVnCharset->convertVnCharset($request->name_genre);

        $genre = MusicGenre::create($data);

        if ($request->parent_id && $request->parent_id !== 'none') {
            $none = MusicGenre::find($request->parent_id);
            $none->appendNode($genre);
        }

        $link = self::PATH_LINK . $genre->alias . '/' . $genre->id;
        $genre->link = $link;
        $genre->save();

        return redirect()->back()->with('success', 'Thêm thành công');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $genres = MusicGenre::withDepth()
            ->with('ancestors')
            ->get()
            ->toFlatTree();

        $genreId = MusicGenre::query()->find($id);


        return view(self::PATH_VIEW . 'edit', compact(['genres', 'genreId']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $genre = MusicGenre::query()->findOrFail($id);

        $genre->update($request->all());

        if ($request->parent_id && $request->parent_id !== 'none') {
            $none = MusicGenre::find($request->parent_id);
            $genre->appendToNode($none)->save();
        }

        return redirect()->route('genres.edit', $genre->id)->with('success', 'Sửa thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $root = MusicGenre::descendantsAndSelf($id)->toTree()->first();

        $root->delete();

        return back();
    }
}
