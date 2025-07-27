<?php

namespace Botble\Newsletter\Forms;

use Botble\Base\Facades\BaseHelper;
use Botble\Newsletter\Facades\Newsletter as NewsletterFacade;
use Botble\Newsletter\Http\Requests\Settings\NewsletterSettingRequest;
use Botble\Setting\Forms\SettingForm;
use Exception;
use Illuminate\Support\Arr;

class NewsletterSettingForm extends SettingForm
{
    public function setup(): void
    {
        parent::setup();

        $mailjetContactList = [];

        if (setting('newsletter_mailjet_api_key')) {
            try {
                $contacts = collect(NewsletterFacade::driver('mailjet')->contacts());

                if (! setting('newsletter_mailjet_list_id')) {
                    setting()->set(['newsletter_mailjet_list_id' => Arr::get($contacts, 'id')])->save();
                }

                $mailjetContactList = $contacts->pluck('name', 'id')->all();
            } catch (Exception $exception) {
                BaseHelper::logError($exception);
            }
        }

        $this
            ->setSectionTitle(trans('plugins/newsletter::newsletter.settings.title'))
            ->setSectionDescription(trans('plugins/newsletter::newsletter.settings.description'))
            ->setValidatorClass(NewsletterSettingRequest::class)
            ->add('newsletter_contacts_list_api_fields', 'html', [
                'html' => view('plugins/newsletter::partials.newsletter-contacts-list-api-fields', compact('mailjetContactList')),
                'wrapper' => [
                    'class' => 'mb-0',
                ],
            ]);
    }
}
