@extends('admin.layouts.master')

@section('titleAdmin')
Danh sách bài hát
@endsection
@section('header')
Bài hát
@endsection

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="card-header-primary shadow-primary-2 border-radius-3 pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Music</h6>
                </div>
            </div>
            
            <div class="card-body px-0 pb-2">
                <nav class="zm-navbar zm-top-nav zm-navbar-wrap">
                    <div class="zm-narbar-container">
                        <!-- is-active -->
                        <ul class="zm-navbar-menu">
                            @foreach ($musicGenre as $key=>$item)
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
                            <ul class="dropdown-menu row menu-genre" style="width:400px;display: flex;" aria-labelledby="dropdownMenuButton">
                       
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">

                        <div id="table-songs_filter" class="text-end pe-4"><label><input type="search"
                                    class="form-control form-control-sm border" id="searchData"
                                    placeholder="Tìm kiếm âm nhạc" aria-controls="table-songs"></label></div>
                    </div>
                </div>
         
                <div class="p-0">
                    <table class="table align-items-center mb-0" id="table-songs">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Bài hát
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Sáng tác
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Thể loại
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Ngày ra mắt
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Thời lượng
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Chính thức
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Riêng tư
                                </th>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Số lượt nghe
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody class="tbody-songs">
              
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- vocalMusic -->
@include('admin.layouts.vocalMusic')
@endsection

@section('songs')
@include('admin.jquery.music');
@endsection