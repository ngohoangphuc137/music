@extends('admin.layouts.master')

@section('titleAdmin')
Album {{ $album->title }}
@endsection
@section('header')
Album
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Album {{ $album->title }}</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('albums.update',$album->id) }}" method="post" enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12">

                                    <div class="col-md-9 col-md-12">
                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Tên Album</label><br>
                                                <input id="title" type="name" class="form-control  @error('title') is-invalid @enderror" name="title" value="{{ $album->title }}" required autocomplete="name">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Ảnh nền</label><br>
                                                <input id="thumbnail" type="file" class="form-control" name="thumbnail" value="{{ old('thumbnail') }}" autocomplete="thumbnail">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group input-group-static mb-4">
                                            <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Nghệ sĩ liên quan</label>
                                            <select class="artists form-control" multiple="multiple" name="artists[]">
                                                @foreach ($artists as $item)
                                                <option value="{{ $item->id }}" @if (isset($item->album[0]))
                                                    selected
                                                    @endif
                                                    >{{ $item->name }}</option>
                                                @endforeach
                                            </select>
                                            @error('artists')
                                            <span class="invalid-feedback" style="display:block;" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group input-group-static mb-4">
                                            <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Thuộc thể loại</label>
                                            <select class="genre form-control" multiple="multiple" name="genre[]">
                                                @foreach ($genre as $item)
                                                <option value="{{ $item->id }}" @if (isset($item->album[0]))
                                                    selected
                                                    @endif
                                                    >{{ str_repeat('-',$item->depth*2) . $item->name_genre }}</option>
                                                @endforeach
                                            </select>
                                            @error('genre')
                                            <span class="invalid-feedback" style="display:block;" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-12 d-flex">
                                        <div class="form-check form-switch">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Là Album</label>
                                            <input class="form-check-input" name="isAlbum" value="1" {{ $album->isAlbum ? 'checked': '' }} type="checkbox" id="flexSwitchCheckDefault">
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="input-group input-group-outline my-3">
                                            <label style="width:100%;">Mô tả ngắn</label><br>
                                            <input id="description" type="description" class="form-control" name="description" value="{{ $album->description }}" autocomplete="country_code_no">

                                        </div>
                                    </div>

                                    @error('thumbnail')
                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                    @if (session()->has('success'))
                                    <div class="alert alert-success alert-dismissible text-white fade show" role="alert">
                                        <span class="alert-icon align-middle">
                                            <span class="material-icons text-md">
                                                thumb_up_off_alt
                                            </span>
                                        </span>
                                        <span class="alert-text"><strong>Success!</strong> {{session()->get('success') }}</span>
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
                                <div class="col-md-12 mb-md-0 mt-3 ">
                                    <button type="reset" id="reset-form" class="btn btn-outline-danger ">Reset</button>
                                    <button type="submit" class="btn bg-gradient-info">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('album')
<script>
    $(document).ready(function() {
        $('.artists').select2({
            placeholder: "Mời chọn các nghệ sĩ liên quan",
        });
        $('.genre').select2({
            placeholder: "Mời chọn thể loại",
        });
    });
</script>
@endsection
@endsection