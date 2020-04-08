<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('directories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('visual');
            $table->integer('dock_order')->nullable()->default(null);
            $table->unsignedInteger('topDir')->nullable()->default(4);
            $table->timestamps();

            $table->foreign('topDir')
                ->references('id')->on('directories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('directories', function (Blueprint $table) {
            $table->dropForeign(['topDir']);
        });
        Schema::dropIfExists('directories');
    }
}
