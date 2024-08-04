<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class SongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required",
            "thumbnail" => "required|mimes:jpeg,png,gif",
            "audio_file" => "required|mimes:mp3",
            "artits" => "required",
            "music_genre_id" => "required",
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            if ($this->failedRadioCheck()) {
                $validator->errors()->add('album', 'Trường album là bắt buộc');
            }
            if($this->checkRequiredSongComposers()){
                $validator->errors()->add('song_composers', 'Trường song_composers là bắt buộc');
            }
            if($this->checkRequiredGenre()){
                $validator->errors()->add('music_genre_id', 'Trường music_genre_id là bắt buộc');
            }
        });
    }

    protected function failedRadioCheck()
    {
        $radio = $this->input('albumSelect');
        $album = $this->input('album');
        if ($radio == 'chooseAlbum') {
            if ($album == null) {
                return true;
            }
            return false;
        }
        return false;
    }
    protected function checkRequiredSongComposers()
    {
        $songComposers = $this->input('song_composers');
        if ($songComposers == 'none') {
            return true;
        }
        return false;
    }
    protected function checkRequiredGenre()
    {
        $music_genre = $this->input('music_genre_id');
        if ($music_genre == 'none') {
            return true;
        }
        return false;
    }
}
