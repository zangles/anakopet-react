<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PetResource extends JsonResource
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
            'contact_id' => $this->contact_id,
            'name' => $this->name,
            'sex' => $this->sex,
            'desexed' => $this->desexed,
            'breed' => $this->breed,
            'age' => $this->age,
            'notes' => $this->notes
        ];
    }
}
