<?php

namespace OS\Http\Controllers;

use Illuminate\Http\Request;
use OS\Directory;
use OS\File;

class OSViewController extends Controller
{
	/**
	 * Show macOS view
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function macOS(){
	    $firstMenubar = ["Finder","archive","edit","view","window","help"];
	    $apps = File::with('folder')->whereNotNull('dock_order')->orderBy('dock_order')->get();
	    $folders = Directory::whereNotNull('dock_order')->orderBy('dock_order')->get();
    	return view('macOS',compact(['apps','folders','firstMenubar']));
    }
}
