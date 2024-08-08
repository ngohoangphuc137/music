@extends('admin.layouts.master')

@section('titleAdmin')
Thêm playlist vào chủ đề
@endsection
@section('header')
Add PlayList Topic
@endsection

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="card-header-primary shadow-primary-2 border-radius-3 pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Add playlist</h6>
                </div>
            </div>

            <div class="card-body px-0 pb-2">
                <nav class="zm-navbar zm-top-nav zm-navbar-wrap">
                    <div class="zm-narbar-container">
                        <!-- is-active -->
                        <ul class="zm-navbar-menu">
                            @foreach ($musicGenre as $key => $item)
                            @if ($key == 0)
                            <li class="zm-navbar-item is-active" data-id="{{ $item->id }}">
                                <div class="navbar-link"><a class="">{{ $item->name_genre }}</a></div>
                            </li>
                            @else
                            <li class="zm-navbar-item" data-id="{{ $item->id }}">
                                <div class="navbar-link"><a class="">{{ $item->name_genre }}</a></div>
                            </li>
                            @endif
                            @endforeach
                        </ul>
                    </div>
                </nav>
                <div class="row">
                    <div class="col-sm-12 col-md-6 music-content loading-music">
                        <div class="dropdown ps-4">
                            <button class="dropdown-toggle choise-genre-music" type="button" id="dropdownMenuButton"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Tất cả
                            </button>
                            <ul class="dropdown-menu row menu-genre" style="width:400px;display: flex;"
                                aria-labelledby="dropdownMenuButton">

                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">

                        <div id="table-songs_filter" class="text-end pe-4"><label><input type="search"
                                    class="form-control form-control-sm border" id="searchData"
                                    placeholder="Tìm kiếm PlayList" aria-controls="table-songs"></label></div>
                    </div>
                </div>
                <div class="container-fluid row">
                    <div class="col-5 col-md-4 d-flex">
                        <div class="content-album ps-2" style="flex:1;">
                            <p><Span class="font-weight-bold" >Chủ đề:</Span>{{ $topic->title }}</p>
                        </div>
                    </div>
                    <div class="col-md-8 col-12 text-end">
                        <button class="btn bg-gradient-info btn-more-playlist" style="padding: 6px 14px;margin-right: -12px;" >
                              Thêm vào Topic
                        </button>
                    </div>
                </div>
                <div class="p-0">
                    <table class="table align-items-center mb-0" id="table-playlist">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Bài hát
                                </th>

                                <th
                                    class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                    Chọn vào PlayList
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tbody-PlayList">
                    

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- vocalMusic -->
@endsection

@section('topic')
@include('admin.jquery.chooseTopic')
@endsection
