<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class baseRequest extends FormRequest
{

    protected function failedValidation(Validator $validator)
    {
        $arrErrors = [];
        foreach ($validator->errors()->messages() as $a => $errors) {
            $arrErrors[] = implode(' ' , $errors);
        }

        throw new HttpResponseException(response()->json($arrErrors, 422));
    }
}
