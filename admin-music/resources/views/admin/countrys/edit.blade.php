@extends('admin.layouts.master')

@section('titleAdmin')
Danh sách quốc gia
@endsection
@section('header')
Quốc gia
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Sửa quốc gia</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('countrys.update',$data->id) }}" method="post" enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-4 col-xxl-2">
                                            <label for="cover-image" class="for-cover-image">
                                                @php
                                                $url = $data->thumbnail;
                                                if (\Str::contains($url, 'http')) {
                                                $url = \Illuminate\Support\Facades\Storage::url($url);
                                                }
                                                @endphp
                                                <div
                                                    class="input-group input-group-static container-add-image-music container-fluid">
                                                    <div class="container-fluid body-add-image-music thumbnail-country my-3"
                                                        style="background-image: url({{ asset('storage/'.$url) }});">
                                                        <input type="file" hidden name="thumbnail" id="cover-image">
                                                        <div class="icon-upload">
                                                            @if ($url == "")
                                                            <i class="fas fa-cloud-upload-alt"></i>
                                                            <p>upload file</p>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="col-md-9 col-sm-8 col-xxl-10">
                                            <div class="col-md-12">
                                                <div class="input-group input-group-outline my-3">
                                                    <label style="width:100%;">Tên quốc gia</label><br>
                                                    <input id="name" type="name"
                                                        class="form-control  @error('name') is-invalid @enderror"
                                                        name="name" value="{{ $data->name}}" required
                                                        autocomplete="name">

                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="input-group input-group-outline my-3">
                                                    <label style="width:100%;">Mã quốc gia</label><br>
                                                    <input id="country_code_no" type="country_code_no"
                                                        class="form-control" name="country_code_no"
                                                        value="{{$data->country_code_no }}" required
                                                        autocomplete="country_code_no">

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @error('thumbnail')
                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                    @if (session()->has('success'))
                                    <div class="alert alert-success alert-dismissible text-white fade show"
                                        role="alert">
                                        <span class="alert-icon align-middle">
                                            <span class="material-icons text-md">
                                                thumb_up_off_alt
                                            </span>
                                        </span>
                                        <span class="alert-text"><strong>Success!</strong>
                                            {{session()->get('success') }}</span>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert"
                                            aria-label="Close">
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
@section('jsCountrys')
<script>
$(document).ready(function() {

    $('#reset-form').on('click', function() {
        $('.thumbnail-country').css('background-image', `url()`)
        $('.icon-upload').html("<i class='fas fa-cloud-upload-alt'></i><p>upload file</p>")
    })

    $('#cover-image').on('change', function() {
        var img = this.files[0];
        var render = new FileReader();
        render.onloadend = function() {
            $('.thumbnail-country').css('background-image', `url(${render.result})`)
            $('.icon-upload').html('')
        }
        render.readAsDataURL(img);
    })
});
</script>
@endsection
@endsection