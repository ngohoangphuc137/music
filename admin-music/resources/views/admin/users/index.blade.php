@extends('admin.layouts.master')

@section('titleAdmin')
Topic
@endsection
@section('header')
Topic
@endsection

@section('content')

<!-- modal -->
<div class="row">
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="card-header-primary shadow-primary-2 border-radius-3 pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Topic</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2 ">
                <div class="p-0">
                    <div class="channel-section">
                        <div class="d-flex align-items-center justify-content-between flex-wrap">
                            <div class="genre-select ps-4">
                                <div id="table-songs_filter" class="text-end pe-2"><label><input type="search" class="form-control form-control-sm border" id="searchData" placeholder="Tìm kiếm Topic" aria-controls="table-songs"></label></div>
                            </div>
                            <div class="add-singer pe-4">
                                <a href="{{ route('topics.create') }}">
                                    <button type="button" class="btn text-end pe-4 py-2 bg-gradient-info" data-bs-toggle="modal" data-bs-target="#exampleModalSignUp"> Thêm Topic</button>
                                </a>
                            </div>
                        </div>
                    </div>
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
                    <table class="table align-items-center mb-0" id="table-user">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    STT
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Tên người dùng
                                </th>

                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Email</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    types</th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($user as $item)
                            <tr>
                                <td>
                                 {{ $loop->index + 1 }}
                                </td>
                                <td>
                                    <p class="text-sm  mb-0">
                                       {{ $item->name }}
                                    </p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <p class="text-sm  mb-0">
                                    {{ $item->email }}
                                    </p>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">
                                        {{ $item->type }}
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <div class="ms-auto">
                                        <a class="btn btn-link text-danger text-gradient px-1 mb-0" href="" onclick="return confirm('Bạn có chắc muốn xoá trường này không !')"><i class="material-icons text-sm me-2">delete</i>Delete</a>
                                        <a class="btn btn-link text-dark px-1 mb-0" href=""><i class="material-icons text-sm me-2">edit</i>Edit</a>
                                    </div>
                                </td>
                            </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('album')
<script>
    $(document).ready(function() {
        let tableAlbum = $("#table-user").DataTable({
            responsive: true,
            search: false,
            lengthChange: false,
            autoWidth: false,
        });
        $('#searchData').on('keyup', function() {
            tableAlbum.search($(this).val()).draw();
        })
    });
</script>
@endsection