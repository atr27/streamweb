<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class CheckUserSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $status): Response
    {
        if($status == 'true' && !Auth::user()->isActive) {
            return redirect()->route('user.subscription.index');
        } elseif($status == 'false' && Auth::user()->isActive) {
            return redirect()->route('user.dashboard');
        }

        return $next($request);
    }
}
