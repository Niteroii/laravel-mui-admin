<?php

namespace App\Http\Controllers;

use App\Services\React;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(React $react)
    {
        return view('authenticated')->with(['react' => $react]);
    }
}
