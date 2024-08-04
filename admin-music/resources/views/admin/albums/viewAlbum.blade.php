@extends('admin.layouts.master')

@section('titleAdmin')
Album {{ $album->title }}
@endsection
@section('header')
Album {{ $album->title }}
@endsection

@section('content')
<div class="row album-container">
    <div class="col-12 col-sm-3 col-md-3 fluid-thumAlbum container-thumbnail">
        <div class="zm-card header-thumbnail my-4">
            <div class="zm-card-image position-sticky">
                <div class="z-thumb">
                    <div class="opacity-thumb"></div>
                    <img src="{{ \Storage::url($album->thumbnail) }}" alt="">
                    <div class="play-pause-music singer-listMusic">
                        <button class="btn-acction-music p-4">
                            <i class="fas fa-play main-music"></i>
                        </button>
                    </div>
                </div>
                <div class="media-content mt-2 text-center" style="display: block;">
                    <div class="title-media-content flex-column">
                        <h5>{{ $album->title }}</h5>
                    </div>
                    <div class="content">
                        <p>{{ collect($album->albumArtists)->pluck('name')->implode(', ') }}</p>
                    </div>
                    <!-- <div class="actions d-flex justify-content-center">
                        <button class="btn btn-icon btn-3 px-4" type="button">
                            <span class="btn-inner--icon"><i class="fas fa-play main-music"></i></span>
                            <span class="btn-inner--text">Tiếp tục phát</span>
                        </button>
                    </div> -->

                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-9 col-md-9 playlist-content">
        <div class="my-4">
            <div class="card-body pb-2 px-4">
                <div class="p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Bài hát
                                </th>
                                <th class="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Thời gian</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($album->songAlbumBeLongToMany as $item)
                            <tr>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="{{ \Storage::url($item->thumbnail) }}" class="avatar avatar me-3 border-radius-lg" alt="user2">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ $item->name }}</h6>
                                            <p class="text-xs text-secondary mb-0">{{ collect($item->artist)->pluck('name')->implode(', ')  }}</p>
                                        </div>
                                    </div>
                                </td>

                                <td class="align-middle text-end text-sm">
                                    <span class="pe-3">
                                        @php
                                        $minuter = floor($item->duration/60);
                                        $seconds = floor($item->duration%60);
                                        $timeString = $minuter.':'.($seconds < 10 ? '0' :'').$seconds; echo $timeString @endphp </span>
                                </td>
                                <td>
                                   @if ($album->id !== $item->album_id)
                                   <a class="btn btn-link text-danger text-gradient px-1 mb-0"
                                 href="{{ route('playlist.destroy',[$item->id,$album->id]) }}"
                                  onclick="return confirm('Bạn có muốn xoá bài hát này ra khỏi album không !')">
                                  <i class="material-icons text-sm me-2">close</i></a>
                                  @else
                                  <a class="btn btn-link text-danger text-gradient px-1 mb-0"
                                  onclick="return alert('Bài hát thuộc album này lên không thể xoá được!')">
                                  <i class="material-icons text-sm me-2">close</i></a>
                                   @endif
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