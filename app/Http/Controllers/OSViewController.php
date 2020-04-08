<?php

namespace OS\Http\Controllers;

use OS\Directory;
use OS\File;

class OSViewController extends Controller
{
    /**
     * Show macOS view.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function macOS()
    {
        $apps = File::with('folder')->whereNotNull('dock_order')->orderBy('dock_order')->get();
        $folders = Directory::whereNotNull('dock_order')->orderBy('dock_order')->get();

        return view('macOS', compact(['apps', 'folders']));
    }
}
