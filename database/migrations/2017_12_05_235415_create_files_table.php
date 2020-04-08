<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('preview');
            $table->string('file');
            $table->integer('dock_order')->nullable()->default(null);
            $table->unsignedInteger('type_id');
            $table->unsignedInteger('dir_id');
            $table->timestamps();

            $table->foreign('type_id')
                ->references('id')->on('file_types')
                ->onDelete('cascade');

            $table->foreign('dir_id')
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
        Schema::table('files', function (Blueprint $table) {
            $table->dropForeign(['type_id']);
            $table->dropForeign(['dir_id']);
        });
        Schema::dropIfExists('files');
    }
}
