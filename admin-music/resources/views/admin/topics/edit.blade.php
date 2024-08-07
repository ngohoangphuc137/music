@extends('admin.layouts.master')

@section('titleAdmin')
Thêm Topic
@endsection
@section('header')
Topic
@endsection

@section('content')
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-md-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-header pb-0 p-3 border-bottom">

                        <div class="d-flex align-items-center pb-3">
                            <h5 class="mb-0">Thêm Topic</h5>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <form action="{{ route('topics.update',$topic->id) }}" method="post" enctype=multipart/form-data>
                            @csrf
                            <div class="row">
                                <div class="col-md-12">

                                    <div class="col-md-9 col-md-12">
                                        <div class="col-md-12">
                                            <div class="input-group input-group-outline my-3">
                                                <label style="width:100%;">Chủ đề</label><br>
                                                <input id="title" type="name" value="{{ $topic->title }}" class="form-control  @error('title') is-invalid @enderror" name="title" value="{{ old('title') }}" required autocomplete="name">
                                            </div>
                                        </div>
                       
                                    </div>
                      
                 
                                    <div class="col-md-12">
                                        <div class="input-group input-group-outline my-3">
                                            <label style="width:100%;">Mô tả ngắn</label><br>
                                            <input id="description" type="description" value="{{ $topic->description }}" class="form-control" name="description" value="{{ old('description') }}" autocomplete="country_code_no">

                                        </div>
                                    </div>
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