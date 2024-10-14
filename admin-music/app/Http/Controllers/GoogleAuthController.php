<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirectAuthGoogle()
    {
        return Socialite::driver('google')->redirect();
    }
    public function callBackGoogle(Request $request)
    {
        if(isset($request['error'])){
            return Socialite::driver('google')->redirect();
        }
        try {
            $google_user = Socialite::driver('google')->user();
            $user = User::query()->where('google_id',$google_user->id)->first();
            if($user){
                if($user->type == User::TYPE_ADMIN){
                    Auth::login($user);
                    return redirect()->route('/');
                }
                return redirect()->route('login');
            }else{
                User::query()->create([
                    'name'=>$google_user->name,
                    'email'=>$google_user->email,
                    'password'=>$google_user->email,
                    'google_id'=>$google_user->id
                ]);
                return redirect()->route('login');
            }
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }
}
