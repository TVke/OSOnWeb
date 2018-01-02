<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FileTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('file_types')->insert([
            ['name' => 'application','preview' => '','extension' => 'app',],
        ]);
    }
}
