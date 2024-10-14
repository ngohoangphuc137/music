<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Symfony\Component\HttpFoundation\Response;

class CheckBearerToken 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
         // Lấy Bearer Token từ request header
         $token = $request->bearerToken();
    
         // Nếu không có token, trả về lỗi
         if (!$token) {
             return response()->json(['message' => 'Token not provided'], 401);
         }
        return $next($request);
    }
}
