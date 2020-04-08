<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/macOS');
Route::get('/macOS', 'OSViewController@macOS')->name('macOS');

Route::get('/macOS/app/{app_name}', 'AppController@load');
Route::get('/macOS/app/{app_name}/{file}', 'AppController@loadWithData');
