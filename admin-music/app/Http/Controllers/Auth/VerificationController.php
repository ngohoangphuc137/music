<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;
use App\Models\User;
class VerificationController extends Controller
{
    ///use VerifiesEmails;

    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }
    public function verifyResend(Request $request)
    {
          
    }
    public function checkVerifyUser(Request $request)
    {
        $user = User::findOrFail($request->route('id'));
        if (!hash_equals((string) sha1($user->getEmailForVerification()), (string) $request->route('hash'))) {
            return redirect('/login');
        }
        if ($user->hasVerifiedEmail()) {
            return redirect('/login');
        }

        $user->markEmailAsVerified();

        return redirect('/login');
    }
}
