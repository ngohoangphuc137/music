<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\MustVerifyEmail;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Support\Facades\Notification;

class RegisterController extends Controller
{
    public function showRegisterForm()
    {
        return view("auth.register");
    }
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::query()->create($data);
        // event(new Registered($user));
        Notification::sendNow($user,new CustomVerifyEmail($user));

        if (!$user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        $request->session()->regenerate();

        return redirect()->route('login');

    }
    public function verifyEmail(Request $request){
        return view("auth.verify");
    }

}
