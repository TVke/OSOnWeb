<?php

namespace OS\Http\Controllers;

use Illuminate\Http\Request;
use OS\File;

class AppController extends Controller
{
    public function load($app_name){
        return view('apps.'.$app_name);
    }
    public function loadWithData(File $app_name,$path){
        return view('apps.'.$app_name->name,compact('path'));
    }
}
