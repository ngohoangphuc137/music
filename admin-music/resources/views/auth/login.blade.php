@extends('layouts.app')
@section('title-auth')
Đăng nhập
@stop
@section('content')
<div class="page-header align-items-start min-vh-100"
    style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                            <!-- <div class="row mt-3">
                                <div class="col-2 text-center ms-auto">
                                    <a class="btn btn-link px-3" href="javascript:;">
                                        <i class="fa fa-facebook text-white text-lg"></i>
                                    </a>
                                </div>
                                <div class="col-2 text-center px-1">
                                    <a class="btn btn-link px-3" href="javascript:;">
                                        <i class="fa fa-github text-white text-lg"></i>
                                    </a>
                                </div>
                                <div class="col-2 text-center me-auto">
                                    <a class="btn btn-link px-3" href="javascript:;">
                                        <i class="fa fa-google text-white text-lg"></i>
                                    </a>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}" class="text-start">
                            @csrf
                            @if (session()->has('verified'))
                                <div class="alert alert-success alert-dismissible text-white fade show" role="alert">
                                    <span class="alert-icon align-middle">
                                        <span class="material-icons text-md">
                                            thumb_up_off_alt
                                        </span>
                                    </span>
                                    <span class="alert-text"><strong>Success!</strong>
                                        {{session()->get('verified') }}</span>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            @endif
                            <div class="input-group input-group-outline my-3">
                                <label style="width:100%;">Email</label><br>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                                    name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="input-group input-group-outline mb-3">
                                <label style="width:100%;">Password</label><br>
                                <input id="password" type="password"
                                    class="form-control @error('password') is-invalid @enderror" name="password"
                                    required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn bg-gradient-primary w-100 my-4 mb-2"> {{ __('Login') }}
                                </button>
                            </div>

                        </form>
                        <div class="text-center my-3">
                            <span class="text-muted">Hoặc đăng nhập bằng</span>
                            <hr>
                        </div>
                        <a href="{{ route('google-auth') }}">
                            <div
                                style="width:100%;border: 1px solid #dadce0;color: #3c4043;height:40px;display: flex;align-items: center;padding-left: 20px;border-radius:5px;">
                                <svg style="width:20px;margin-right: 10px;" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48" class="LgbsSe-Bz112c">
                                    <g>
                                        <path fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                        </path>
                                        <path fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                        </path>
                                        <path fill="#FBBC05"
                                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                        </path>
                                        <path fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                        </path>
                                        <path fill="none" d="M0 0h48v48H0z"></path>
                                    </g>
                                </svg>
                                <span>Đăng nhập bằng google</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection