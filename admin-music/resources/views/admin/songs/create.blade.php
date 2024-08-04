@extends('admin.layouts.master')

@section('titleAdmin')
Thêm bài hát
@endsection
@section('header')
Bài hát
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Thêm bài hát</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('songs.store') }}" method="post" id="form-song"
                            enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12 mb-md-0">
                                    <div class="input-group input-group-outline">
                                        <label class="form-label">Tên bài hát</label>
                                        <input type="text" name="name" value="{{ old('name') }}" required class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="input-group input-group-static mb-2 col-md-6 mt-3">
                                        <label for="exampleFormControlSelect1" class="ms-0">Ảnh nền</label>
                                        <input type="file" name="thumbnail" value="{{ old('thumbnail') }}"
                                            class="form-control" required id="">
                                    </div>
                                    @error('thumbnail')
                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                                <div class="col-md-12 mb-md-0">
                                    <div class="input-group input-group-outline">
                                        <label for="exampleFormControlSelect1" style="width:100%" class="ms-0">Ngày phát
                                            hành</label>
                                        <input type="date" class="form-control" required name="release_date">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="input-group input-group-static">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Ca sĩ thực
                                                    hiện</label>
                                                <select class="js-example-basic-single form-control" name="artits[]"
                                                    multiple="multiple" required>
                                                    @foreach ($artists as $item)
                                                    <option value="{{ $item->id }}"
                                                        {{ in_array($item->id,old('artits',[])) ? 'selected' : '' }}>
                                                        {{ $item->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-static">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Nghệ sĩ
                                                    sáng tác bài hát</label>
                                                <select class="js-example-basic-song-creators form-control"
                                                    name="song_composers[]" multiple="multiple" required>
                                                    hát</option>
                                                    @foreach ($artists as $item)
                                                    <option value="{{ $item->id }}"
                                                        {{ in_array($item->id,old('song_composers',[])) ? 'selected' : ''  }}>
                                                        {{ $item->name }}
                                                    </option>
                                                    @endforeach
                                                </select>
                                                @error('song_composers')
                                                <span class="invalid-feedback" style="display:block;" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Thể loại
                                                    nhạc</label>
                                                <select class="js-example-basic-genre form-control"
                                                    name="music_genre_id" required>
                                                    <option value="none" selected>Mời chọn thể loại nhạc
                                                    </option>
                                                    @foreach ($musicGenre as $item)
                                                
                                                        <option value="{{ $item->id }}"
                                                            {{ old('music_genre_id') == $item->id ? 'selected' : '' }}>
                                                            {{ str_repeat('-',$item->depth*2).$item->name_genre }}
                                                        </option>
                                                    
                                                    @endforeach
                                                </select>
                                                @error('music_genre_id')
                                                <span class="invalid-feedback" style="display:block;" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-12 d-flex">
                                    <div class="form-check form-switch">
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Công khai</label>
                                        <input class="form-check-input" name="isOffical" value="1"
                                            {{ old('isOffical') ? 'checked': '' }} type="checkbox"
                                            id="flexSwitchCheckDefault">
                                    </div>
                                    <div class="form-check form-switch ms-3">
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Riêng tư</label>
                                        <input class="form-check-input" name="isPrivate" value="1"
                                            {{ old('isPrivate')  ? 'checked': '' }} type="checkbox"
                                            id="flexSwitchCheckDefault">
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="albumSelect"
                                            id="customRadio1" value="createAlbum"
                                            {{ old('albumSelect')=='createAlbum' ? 'checked' : '' }}>
                                        <label class="custom-control-label" for="customRadio1">Tạo album cùng với bài
                                            hát</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input show-album" type="radio" name="albumSelect"
                                            {{ old('albumSelect') =='chooseAlbum' ? 'checked' : '' }} id="customRadio2"
                                            value="chooseAlbum">
                                        <label class="custom-control-label" for="customRadio2">Chọn album đã có</label>
                                    </div>
                                </div>

                                <div class="col-md-12 selectAlbum"
                                    style = "{{ old('albumSelect') =='chooseAlbum' ? 'disolay:block;' : 'display:none;' }}">
                                    <div class="input-group input-group-static mb-4">
                                        <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Album</label>
                                        <select class="js-example-basic-album form-control" name="album">
                                            <option value="" selected>Mời chọn album</option>
                                            @foreach ($album as $item)
                                            <option value="{{ $item->id }}">{{ $item->title }}</option>
                                            @endforeach
                                        </select>
                                        @error('album')
                                        <span class="invalid-feedback feedback-album" style="display:block;"
                                            role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="input-group input-group-static mb-2 col-md-6">
                                        <label for="exampleFormControlSelect1" class="ms-0">file âm
                                            nhạc</label>
                                        <input type="file" name="audio_file" {{ old('audio_file') }}
                                            class="form-control" id="" required>
                                    </div>
                                    @error('audio_file')
                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                                <div class="col-md-12 mb-md-0 mt-3">
                                    <textarea id="editor" name="lyrics"></textarea>
                                </div>
                                <div class="col-md-12 mb-md-0 mt-3 ">
                                    <button type="reset" class="btn btn-outline-danger ">Reset</button>
                                    <button type="submit" class="btn bg-gradient-info">Submit</button>
                                </div>
                                @if (session()->has('success'))
                                <div class="alert alert-success alert-dismissible text-white fade show" role="alert">
                                    <span class="alert-icon align-middle">
                                        <span class="material-icons text-md">
                                            thumb_up_off_alt
                                        </span>
                                    </span>
                                    <aler class="alert-text"><strong>Success!</strong>
                                        {{session()->get('success') }}</aler>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                @endif
                                @if (session()->has('error'))
                                <div class="alert alert-warning alert-dismissible text-white fade show" role="alert">
                                    <span class="alert-icon align-middle">
                                        <span class="material-icons text-md">
                                            thumb_up_off_alt
                                        </span>
                                    </span>
                                    <span class="alert-text"><strong>Lỗi!</strong>
                                        {{session()->get('error') }}</span>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                @endif
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('songs')
<script>
$(document).ready(function() {
    $('.loading').removeClass('loading-hidden')

    $('.js-example-basic-single').select2({
        placeholder: "Mời chọn ca sĩ thực hiện",
    });
    $('.js-example-basic-song-creators').select2();
    $('.js-example-basic-genre').select2();


    $('button[type="reset"]').click(function() {
        setTimeout(function() {
            $(':input').trigger('change')
        }, 50);
        $('.selectAlbum').hide()
    })


    $('input[type="radio"]').click(function() {
        var radio = $(this);
        if (radio.is(':checked')) {
            if (radio.hasClass('show-album')) {
                $('.selectAlbum').show()
            } else {
                $('.selectAlbum').hide()
                $(".js-example-basic-album").val("")
                $('.feedback-album').html('')
            }
        }
    });
});
$(window).on( "load", function() {
    // Animate loader off screen
    $(".loading").fadeOut("slow");

  });
</script>
<script>
ClassicEditor
    .create(document.querySelector('#editor'))
    .catch(error => {
        console.error(error);
    });
</script>
@endsection