@extends('admin.layouts.master')

@section('titleAdmin')
Thêm nghệ sĩ
@endsection
@section('header')
Nghệ sĩ
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Thêm nghệ sĩ</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('artists.store') }}" method="post" enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Nghệ danh</label><br>
                                                <input id="name" type="name"
                                                    class="form-control  @error('realname') is-invalid @enderror"
                                                    name="name" value="{{ old('name') }}" required autocomplete="name">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Tên thật</label><br>
                                                <input id="realname" type="name"
                                                    class="form-control  @error('realname') is-invalid @enderror"
                                                    name="realname" value="{{ old('realname') }}"  autocomplete="realname">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Avatar</label><br>
                                                <input id="thumbnail" type="file" class="form-control" name="thumbnail"
                                                    autocomplete="name">
                                            </div>
                                            @error('thumbnail')
                                                <span class="invalid-feedback" style="display:block;" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>

                                        <div class="col-md-12">
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Giới
                                                    tính</label>
                                                <select class="js-select-sex form-control" name="sex">
                                                    <option value="">Mời chọn</option>
                                                    <option value="nam">Nam</option>
                                                    <option value="nu">Nữ</option>

                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Quốc
                                                    gia</label>
                                                <select class="js-select-country form-control" name="country_id">
                                                    <option value="">Mời chọn</option>
                                                    @foreach ($countries as $country)
                                                        <option value="{{ $country->id }}">{{ $country->name }}</option>
                                                    @endforeach
                                                </select>

                                                @error('country_id')
                                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div>
                                        </div>


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
                                        <button type="reset" id="reset-form"
                                            class="btn btn-outline-danger ">Reset</button>
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
@section('artists')
<script>
    $(document).ready(function () {
        $('.js-select-sex').select2();
        $('.js-select-country').select2();
        $('.js-select-genres').select2();
    });
</script>
@endsection
@endsection