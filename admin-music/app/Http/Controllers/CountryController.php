<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

use App\Models\country;
use App\Models\Artist;

class CountryController extends Controller
{
    const PATH_UPLOAD = "countrys";

    const PATH_UPLOAD_ARTISTS = "artists";

    const DEFAULT_AVATAR_ARTISTS = 'default-avatar.jpg';
    public function index()
    {
        $countries = Country::query()->withCount('artits')->get();
        return view("admin.countrys.index", compact("countries"));
    }
    public function create()
    {
        return view("admin.countrys.create");
    }
    public function store(Request $request)
    {
        $data = $request->except("thumbnail");
        $request->validate([
            'name' => ['required'],
            'country_code_no' => ['required'],
            'thumbnail' => ['mimes:jpeg,png,gif,pdf'],
        ]);
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
        }

        $country = Country::query()->create($data);
        return redirect()->back()->with('success', 'Thêm thành công');
    }

    public function edit(string $id)
    {
        $data = country::query()->findOrFail($id);
        return view('admin.countrys.edit', compact('data'));
    }
    public function update(Request $request, $id)
    {
        $data = $request->except('thumbnail');

        $countryFind = country::query()->find($id);

        $data['thumbnail'] = $countryFind->thumbnail;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = Storage::put(self::PATH_UPLOAD, $request->file('thumbnail'));
        }

        if ($request->hasFile('thumbnail') && Storage::exists($countryFind->thumbnail)) {
            Storage::delete($countryFind->thumbnail);
        }

        $countryFind->update($data);

        return redirect()->back()->with('success', 'Sửa thành công');
    }
    public function destroy(string $id)
    {

        try {
            $country = Country::query()->findOrFail($id);

            $dataHasImage = $country->artits;

            $defaultAvatar = base64_encode(Storage::get(self::PATH_UPLOAD_ARTISTS . '/' . self::DEFAULT_AVATAR_ARTISTS));

            DB::transaction(function () use ($country) {
                foreach ($country->artits as $value) {
                    $value->delete();
                }

                $country->delete();
            });

            if (!empty($country->thumbnail) && Storage::exists($country->thumbnail)) {
                Storage::delete($country->thumbnail);
            }

            foreach ($dataHasImage as $key => $value) {
                if (!empty($value->thumbnail) && Storage::exists($value->thumbnail)) {
                    $artistThumbnail = base64_encode(Storage::get($value->thumbnail));
                    if ($artistThumbnail !== $defaultAvatar) {
                        Storage::delete($value->thumbnail);
                    }
                }
            }

            return redirect()->back();

        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }
}
