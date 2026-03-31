<?php

namespace FunctionBytes\MercosanAdmin\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:120',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'template' => 'nullable|string|max:60',
            'description' => 'nullable|string|max:400',
            'status' => 'required|in:published,draft,pending',
            'is_featured' => 'nullable|boolean',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The page name is required',
            'name.max' => 'The page name must not exceed 120 characters',
            'status.required' => 'The page status is required',
            'status.in' => 'The page status must be published, draft, or pending',
        ];
    }
}
