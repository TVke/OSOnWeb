<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('files')->insert([
            ['name' => 'Finder','file' => '/img/Finder.png','dock_order' => 0,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Launchpad','file' => '/img/Launchpad.png','dock_order' => 1,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Calculator','file' => '/img/Calculator.png','dock_order' => 2,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Notes','file' => '/img/Notes.png','dock_order' => 3,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Settings','file' => '/img/Settings.png','dock_order' => 4,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Reminders','file' => '/img/Reminders.png','dock_order' => 5,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Agenda','file' => '/img/Agenda.png','dock_order' => 6,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Contacts','file' => '/img/Contacts.png','dock_order' => 7,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Stickies','file' => '/img/Stickies.png','dock_order' => 8,'type_id' => 1,'dir_id' => 2,],
            ['name' => 'Terminal','file' => '/img/Terminal.png','dock_order' => 9,'type_id' => 1,'dir_id' => 2,],
        ]);
    }
}
