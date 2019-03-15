<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'address',
        'phone',
        'description',
        'emergency_contact'
    ];

    public function turn()
    {
        return $this->hasMany('App\Turn');
    }

    public function pet()
    {
        return $this->hasMany('App\Pet');
    }
}
