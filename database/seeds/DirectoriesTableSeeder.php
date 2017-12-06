<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DirectoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    DB::table('directories')->insert([
		    ['name' => 'Hard Drive','topDir' => null,],
		    ['name' => 'Apps','topDir' => 1,],
		    ['name' => 'Users','topDir' => 1,],
		    ['name' => 'User','topDir' => 3,],
		    ['name' => 'Documents','topDir' => 4,],
		    ['name' => 'Downloads','topDir' => 4,],
		    ['name' => 'Movies','topDir' => 4,],
		    ['name' => 'Music','topDir' => 4,],
		    ['name' => 'Images','topDir' => 4,],
		    ['name' => 'Desktop','topDir' => 4,],
	    ]);
    }
}
