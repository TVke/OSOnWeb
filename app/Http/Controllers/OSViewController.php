<?php

namespace OS\Http\Controllers;

use Illuminate\Http\Request;

class OSViewController extends Controller
{
	/**
	 * Show macOS view
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function macOS(){
    	return view('macOS');
    }
}
