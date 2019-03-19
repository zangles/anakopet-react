<?php

namespace App\Http\Resources;

use App\TurnType;
use Illuminate\Http\Resources\Json\JsonResource;

class TurnResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'comments' => $this->comments,
            'review' => $this->review,
            'turn_type' => new TurnTypeResource(TurnType::find($this->turn_type_id))
        ];
    }
}
