<?php

namespace OS;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public function folder()
    {
        return $this->hasOne(Directory::class, 'id', 'dir_id');
    }
}
