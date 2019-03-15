<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TurnType extends Model
{
    protected $fillable = ['name'];

    const TYPE_1_CLASS = 'event-important';
    const TYPE_2_CLASS = 'event-success';
    const TYPE_3_CLASS = 'event-warning';
    const TYPE_4_CLASS = 'event-inverse';
    const TYPE_5_CLASS = 'event-special';
    const TYPE_6_CLASS = 'event-info';

    public function turns()
    {
        return $this->hasMany('App\Turn');
    }

    public static function getTurnClass($turnType)
    {
        $class = TurnType::TYPE_6_CLASS;
        switch ($turnType){
            case 1:
                $class = TurnType::TYPE_1_CLASS;
                break;
            case 2:
                $class = TurnType::TYPE_2_CLASS;
                break;
            case 3:
                $class = TurnType::TYPE_3_CLASS;
                break;
            case 4:
                $class = TurnType::TYPE_4_CLASS;
                break;
            case 5:
                $class = TurnType::TYPE_5_CLASS;
                break;
        }

        return $class;
    }
}
