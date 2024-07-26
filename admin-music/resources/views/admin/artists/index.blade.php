@extends('admin.layouts.master')

@section('titleAdmin')
Danh sách nghệ sĩ
@endsection

@section('header')
Nghệ sĩ
@endsection

@section('content')
{!! csrf_field() !!}
<div class="row">
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="card-header-primary shadow-primary-2 border-radius-3 pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Nghệ sĩ</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="p-0">
                    <div class="channel-section">
                        <div class="d-flex align-items-center justify-content-between flex-wrap">
                            <div class="genre-select ps-4">
                               
                            </div>
                            <div class="add-singer pe-4">
                                <a href="{{ route('artists.create') }}">
                                    <button type="button" class="btn text-end pe-4 py-2 bg-gradient-info" style="margin-left: 1.5rem;"> Thêm nghệ
                                        sĩ</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <table class="table align-items-center mb-0" id="artists">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên ca
                                    sĩ</th>
                                <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Quốc
                                    gia
                                </th>
                                <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Giới tính
                                </th>
                                <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Lượt quan tâm</th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody class="tbody-artist">
                              @foreach ($artists as $item)
                              
                            <tr>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="{{ Storage::url($item->thumbnail) }}"
                                                class="avatar avatar-sm-1 me-3 border-radius-lg" alt="user2">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ $item->name }}</h6>
                                            <p class="text-xs text-secondary mb-0">{{ $item->realname }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <p class="text-md ps-3 font-weight-normal text-secondary mb-0">{{ $item->country->name }}</p>
                                </td>
                                <td>

                                <p class="text-md ps-3 font-weight-normal text-secondary mb-0">{{ $item->sex }}</p>
                                </td>
                                <td class="text-sm">
                                <p class="text-md ps-3 text-secondary mb-0">0</p>
                                </td>
              
                                <td class="align-middle">
                                    <div class="ms-auto">
                                        <a class="btn btn-link text-danger text-gradient px-1 mb-0"
                                            href="{{ route('artists.destroy',$item->id) }}"><i
                                                class="material-icons text-sm me-2">delete</i>Delete</a>
                                        <a class="btn btn-link text-dark px-1 mb-0" href="{{ route('artists.edit',$item->id) }}"><i
                                                class="material-icons text-sm me-2">edit</i>Edit</a>
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

@section('artists')
<script>
    $(document).ready(async function() {
        let artists = $("#artists").DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
        })

    })
</script>
@endsection