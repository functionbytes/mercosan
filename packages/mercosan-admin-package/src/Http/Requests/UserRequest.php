<?php

namespace FunctionBytes\MercosanAdmin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        $rules = [
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
            'password' => $userId ? 'nullable|string|min:8|confirmed' : 'required|string|min:8|confirmed',
            'avatar_id' => 'nullable|integer',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'username.required' => 'The username is required',
            'username.unique' => 'This username is already taken',
            'username.alpha_dash' => 'The username may only contain letters, numbers, dashes and underscores',
            'email.required' => 'The email is required',
            'email.unique' => 'This email is already taken',
            'first_name.required' => 'The first name is required',
            'last_name.required' => 'The last name is required',
            'password.required' => 'The password is required',
            'password.min' => 'The password must be at least 8 characters',
            'password.confirmed' => 'The password confirmation does not match',
        ];
    }
}
