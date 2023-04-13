<?php

namespace App\Http\Controllers;

use App\Services\React;

class RendererController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function authenticated(React $react)
    {
        return view('authenticated')->with(['react' => $react]);
    }
}
