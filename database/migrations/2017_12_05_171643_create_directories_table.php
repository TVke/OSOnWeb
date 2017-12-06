<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
