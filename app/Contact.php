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
        return $this->hasMany('App\Turn')
            ->join('turn_types', 'turns.turn_type_id', '=','turn_types.id')
            ->orderBy('date','desc')
            ->orderBy('turn_types.id', 'asc');
    }

    public function pet()
    {
        return $this->hasMany('App\Pet');
    }
}
