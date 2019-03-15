<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Turn extends Model
{
    protected $fillable = [
        'id', 'contact_id', 'date', 'turn_type_id', 'comments', 'review', 'finished'
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }

    public function turnType()
    {
        return $this->belongsTo('App\TurnType');
    }
}
