<?php

namespace OS\Http\Controllers;

use OS\File;

class AppController extends Controller
{
    public function load($app_name)
    {
        return view('apps.'.$app_name);
    }

    public function loadWithData($app_name, File $file)
    {
        return view('apps.'.$app_name, compact('file'));
    }
}
