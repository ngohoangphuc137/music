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
            if(Auth::user()->email_verified_at === null){
                return redirect()->route('login')->with('verified','Tài khoản email chưa xác nhận!');
            }
            if(Auth::user()->isAdmin()){
                return redirect()->intended('/');
            }
            return abort(403,'Bạn không đủ thầm quyền để chuy cập');
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
