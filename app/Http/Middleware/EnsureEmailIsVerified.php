<?php

namespace App\Http\Middleware;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param null|string              $redirectToRoute
     *
     * @return null|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function handle($request, \Closure $next, $redirectToRoute = null)
    {
        if (!$request->user()
            || ($request->user() instanceof MustVerifyEmail
            && !$request->user()->hasVerifiedEmail())) {
            return $request->expectsJson()
                    ? abort(403, 'Your email address is not verified.')
                    : Redirect::guest(URL::route($redirectToRoute ?: 'verification.notice'));
        }

        return $next($request);
    }
}
