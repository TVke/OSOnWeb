<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DirectoriesTableSeeder::class);
        $this->call(FileTypesTableSeeder::class);
        $this->call(FilesTableSeeder::class);
    }
}
