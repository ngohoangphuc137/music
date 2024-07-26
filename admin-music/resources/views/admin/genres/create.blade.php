@extends('admin.layouts.master')

@section('titleAdmin')
Thêm thể loại âm nhạc
@endsection
@section('header')
Thêm thể loại
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Thêm thể loại âm nhạc</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('genres.store') }}" method="post" enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Tên thể loại</label><br>
                                                <input id="name_genre" type="name_genre"
                                                    class="form-control  @error('name_genre') is-invalid @enderror"
                                                    name="name_genre" value="{{ old('name_genre') }}"
                                                    required
                                                    autocomplete="name_genre">
                                                @error('name_genre')
                                                    <span class="invalid-feedback" style="display:block;" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Mô tả ngắn</label><br>
                                                <input id="description" type="description" class="form-control"
                                                    name="description" value="{{ old('description') }}"
                                                    autocomplete="description">
            
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group input-group-static mb-4">
                                                <label for="exampleFormControlSelect1" class="ms-0 pt-3 pb-1">Thuộc thể
                                                    loại</label>
                                                <select class="js-example-basic-single form-control" name="parent_id">
                                                    <option value="none">Active</option>
                                                    @if (!empty($parentChildrem))
                                                     @foreach ($parentChildrem as $genre)
                                                      <option value="{{ $genre['id'] }}">{{ $genre['name'] }}</option>
                                                     @endforeach
                                                    @endif
                                                </select>

                                            </div>
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

@endsection


@section('genres')
<script>
    $(document).ready(function () {
        $('.js-example-basic-single').select2();
        $('.js-example-basic-multiple').select2();
    });
</script>
@endsection