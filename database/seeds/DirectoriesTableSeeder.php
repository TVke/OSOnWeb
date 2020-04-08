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
            ['name' => 'Hard Drive', 'visual' => '/img/HardDrive.png', 'dock_order' => null, 'topDir' => null],
            ['name' => 'Apps', 'visual' => '/img/Apps.png', 'dock_order' => null, 'topDir' => 1],
            ['name' => 'Users', 'visual' => '/img/Users.png', 'dock_order' => null, 'topDir' => 1],
            ['name' => 'User', 'visual' => '/img/User.png', 'dock_order' => null, 'topDir' => 3],
            ['name' => 'Documents', 'visual' => '/img/Documents.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Downloads', 'visual' => '/img/Downloads.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Movies', 'visual' => '/img/Movies.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Music', 'visual' => '/img/Music.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Images', 'visual' => '/img/Images.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Desktop', 'visual' => '/img/Desktop.png', 'dock_order' => null, 'topDir' => 4],
            ['name' => 'Trash', 'visual' => '/img/Trash-empty.png', 'dock_order' => 0, 'topDir' => 4],
        ]);
    }
}
