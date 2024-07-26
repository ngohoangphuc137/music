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

<div class="container-fluid container-music">
    <div class="player-controls">
        <div class="player-controls__container row">
            <audio id="myMusic"></audio>
            <div class="player-controls-left level-left col-6 col-md-4 music-content loading-music">
                <div class="song-thumd">
                    <img src="" alt="" />
                </div>
                <div class="media-content">
                    <div class="song-title-item">
                        <span></span>
                    </div>
                    <h3>
                        <a href=""></a>
                    </h3>
                </div>
            </div>
            <div class="player-controls__player-bar level-center col col-md-4">
                <div class="play-pause-music">
                    <i class="fas fa-step-backward pre-music"></i>
                    <button class="btn-acction-music">
                        <i class="fas fa-play main-music"></i>
                    </button>
                    <i class="fas fa-step-forward next-music"></i>
                </div>
                <div class="time-music">
                    <div class="current-time-music "></div>
                    <input type="range" name="" id="bar-progress" min="0" max="100" value="0" />
                    <div class="toatl-time-music"></div>
                </div>

            </div>
            <div class="player-controls-right level-right col-6 col-md-4">
                <div class="microphone">
                    <i class="fas fa-microphone"></i>
                </div>

                <div class="volume-music">
                    <i class="fas fa-volume-up"></i>
                    <input type="range" name="" id="" min="0" max="100" value="100" />
                </div>
            </div>
        </div>
    </div>

</div>
@endsection

@section('songs')
@include('admin.jquery.music');
@endsection