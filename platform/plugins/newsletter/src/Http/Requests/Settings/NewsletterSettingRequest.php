<?php

namespace Botble\Newsletter\Http\Requests\Settings;

use Botble\Base\Rules\OnOffRule;
use Botble\Support\Http\Requests\Request;

class NewsletterSettingRequest extends Request
{
    public function rules(): array
    {
        return [
            'enable_newsletter_contacts_list_api' => [new OnOffRule()],
            'newsletter_mailjet_api_key' => ['nullable', 'string', 'min:32', 'max:40'],
            'newsletter_mailjet_api_secret' => ['nullable', 'string', 'min:32', 'max:40'],
            'newsletter_mailjet_list_id' => ['nullable', 'string', 'size:8'],
        ];
    }
}
