<?php

namespace FunctionBytes\MercosanAdmin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = auth()->id();

        return [
            'username' => [
                'required',
                'string',
                'max:60',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($userId),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'first_name' => 'required|string|max:120',
            'last_name' => 'required|string|max:120',
            'avatar_id' => 'nullable|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'The username is required',
            'username.unique' => 'This username is already taken',
            'email.required' => 'The email is required',
            'email.unique' => 'This email is already taken',
            'first_name.required' => 'The first name is required',
            'last_name.required' => 'The last name is required',
        ];
    }
}
