<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view("auth.login");
    }
    public function login(Request $request )
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Auth::attempt xác nhận thông tin người dùng
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();


            if(Auth::user()->isAdmin()){
                return redirect()->intended('/');
            }
            return redirect()->intended('/login');
        }

        return back()->withErrors([
            'email' => 'Thông tin xác thực được cung cấp không khớp với hồ sơ của chúng tôi.',
        ])->onlyInput('email');
    }
    public function logout()
    {
       // đăng xuất tài khoản
       Auth::logout();

       //xoá tất cả các session
       \request()->session()->regenerate();

       return redirect('/login');

    }
}
