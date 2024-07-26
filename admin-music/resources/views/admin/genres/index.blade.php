@extends('admin.layouts.master')

@section('titleAdmin')
Danh sách thể loại
@endsection
@section('header')
Thể loại âm nhạc
@endsection

@section('content')

<!-- modal -->
<div class="row">
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="card-header-primary shadow-primary-2 border-radius-3 pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Thể loại âm nhạc</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2 ">
                <div class="p-0">
                    <div class="channel-section">
                        <div class="d-flex align-items-center justify-content-between flex-wrap">
                            <div class="genre-select ps-4">

                            </div>
                            <div class="add-singer pe-4">
                                <a href="{{ route('genres.create') }}">
                                    <button type="button" class="btn text-end pe-4 py-2 bg-gradient-info"
                                        data-bs-toggle="modal" data-bs-target="#exampleModalSignUp"> Thêm thể
                                        loại</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <table class="table align-items-center mb-0" id="table-genres">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STT</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên thể
                                    loại</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Thuôc thể loại
                                </th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Mô tả ngắn
                                </th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>

                            @foreach ($genres as $item)
                                <tr>
                                    <td class="align-middle text-secondary text-sm">
                                        <span class="text-sm ms-2"> {{$loop->index + 1}} </span>
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1 " >
                                            {{$item->name_genre}}
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-normal mb-0">
                                            @if (empty($item->ancestors[0]))
                                                Thuộc cấp cha
                                            @else
                                                Thuộc loại âm nhạc <span class="text-sm font-weight-bold">
                                                    @foreach($item->ancestors as $ancestor)
                                                        {{ $ancestor->name_genre }}
                                                    @endforeach    
                                                </span>
                                            @endif
                                        </p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span
                                            class="text-sm  mb-0">{{ $item->description !== null ? $item->description : 'không có mô tả'  }}</span>
                                    </td>

                                    <td class="align-middle">
                                        <div class="ms-auto">
                                            <a class="btn btn-link text-danger text-gradient px-1 mb-0"
                                                href="{{ route('genres.destroy', $item->id) }}"
                                                onclick="return confirm('Bạn có chắc muốn xoá trường này không !')"><i
                                                    class="material-icons text-sm me-2">delete</i>Delete </a>
                                            <a class="btn btn-link text-dark px-1 mb-0"
                                                href="{{ route('genres.edit', $item->id) }}"><i
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

@section('jsCountrys')
<script>
    $(document).ready(function () {
        $("#table-genres").DataTable({
            responsive: true,
            search: false,
            lengthChange: false,
            autoWidth: false,
        });

    });
</script>
@endsection