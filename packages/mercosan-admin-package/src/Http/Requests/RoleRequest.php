<?php

namespace FunctionBytes\MercosanAdmin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $roleId = $this->route('role') ? $this->route('role')->id : null;

        $rules = [
            'name' => [
                'required',
                'string',
                'max:120',
                Rule::unique('roles', 'name')->ignore($roleId),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:120',
                'alpha_dash',
                Rule::unique('roles', 'slug')->ignore($roleId),
            ],
            'description' => 'nullable|string|max:400',
            'permissions' => 'nullable|array',
            'is_default' => 'nullable|boolean',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The role name is required',
            'name.unique' => 'This role name is already taken',
            'slug.unique' => 'This role slug is already taken',
            'slug.alpha_dash' => 'The slug may only contain letters, numbers, dashes and underscores',
        ];
    }
}
