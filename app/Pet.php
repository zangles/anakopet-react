<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $fillable = [
        'contact_id', 'name', 'sex', 'desexed', 'breed', 'age', 'notes'
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }
}
