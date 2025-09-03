<?php

namespace Botble\Newsletter\Http\Requests;

use Botble\Newsletter\Enums\NewsletterStatusEnum;
use Botble\Newsletter\Models\Newsletter;
use Botble\Support\Http\Requests\Request;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use Botble\Captcha\Facades\Captcha;

class NewsletterRequest extends Request
{
    protected $errorBag = 'newsletter';

    public function rules(): array
    {
        $rules = [
            'name' => ['nullable', 'string', 'max:120'],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                Rule::unique((new Newsletter())->getTable())->where(function (Builder $query): void {
                    $query->where('status', NewsletterStatusEnum::SUBSCRIBED);
                }),
            ],
            'status' => Rule::in(NewsletterStatusEnum::values()),
        ];

        if (Captcha::isEnabled()) {
            $rules = array_merge($rules, Captcha::rules());
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'email.required' => __('El campo email es requerido.'),
            'email.email' => __('El email debe tener un formato válido.'),
            'email.unique' => __('Este email ya está suscrito.'),
            'email.max' => __('El email no puede tener más de 255 caracteres.'),
            'name.max' => __('El nombre no puede tener más de 120 caracteres.'),
        ];
    }
}
