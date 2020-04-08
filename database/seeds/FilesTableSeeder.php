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
            ['name' => 'Finder', 'preview' => '/img/Finder.png', 'file' => '/app/Finder', 'dock_order' => 0, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Launchpad', 'preview' => '/img/Launchpad.png', 'file' => '/app/Launchpad', 'dock_order' => 1, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Calculator', 'preview' => '/img/Calculator.png', 'file' => '/app/Calculator', 'dock_order' => 2, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Notes', 'preview' => '/img/Notes.png', 'file' => '/app/Notes', 'dock_order' => 3, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Settings', 'preview' => '/img/Settings.png', 'file' => '/app/Settings', 'dock_order' => 4, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Reminders', 'preview' => '/img/Reminders.png', 'file' => '/app/Reminders', 'dock_order' => 5, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Agenda', 'preview' => '/img/Agenda.png', 'file' => '/app/Agenda', 'dock_order' => 6, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Contacts', 'preview' => '/img/Contacts.png', 'file' => '/app/Contacts', 'dock_order' => 7, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Stickies', 'preview' => '/img/Stickies.png', 'file' => '/app/Stickies', 'dock_order' => 8, 'type_id' => 1, 'dir_id' => 2],
            ['name' => 'Terminal', 'preview' => '/img/Terminal.png', 'file' => '/app/Terminal', 'dock_order' => 9, 'type_id' => 1, 'dir_id' => 2],
        ]);
    }
}
