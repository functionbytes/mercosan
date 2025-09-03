<?php

namespace Botble\Newsletter\Http\Controllers;

use Botble\Base\Facades\BaseHelper;
use Botble\Base\Forms\FieldOptions\ButtonFieldOption;
use Botble\Base\Forms\FieldOptions\CheckboxFieldOption;
use Botble\Base\Forms\FieldOptions\EmailFieldOption;
use Botble\Base\Forms\FieldOptions\HtmlFieldOption;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\CheckboxField;
use Botble\Base\Forms\Fields\EmailField;
use Botble\Base\Forms\Fields\HtmlField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Captcha\Facades\Captcha;
use Botble\Base\Http\Controllers\BaseController;
use Botble\Newsletter\Enums\NewsletterStatusEnum;
use Botble\Newsletter\Events\SubscribeNewsletterEvent;
use Botble\Newsletter\Events\UnsubscribeNewsletterEvent;
use Botble\Newsletter\Forms\Fronts\NewsletterForm;
use Botble\Newsletter\Http\Requests\NewsletterRequest;
use Botble\Newsletter\Models\Newsletter;
use Botble\Newsletter\Facades\Newsletter as NewsletterFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class PublicController extends BaseController
{
    public function postSubscribe(NewsletterRequest $request)
    {
        do_action('form_extra_fields_validate', $request, NewsletterForm::class);

        $newsletterForm = NewsletterForm::create();
        $newsletterForm->setRequest($request);

        $newsletterForm->onlyValidatedData()->saving(function (NewsletterForm $form): void {
            /**
             * @var NewsletterRequest $request
             */
            $request = $form->getRequest();

            $email = $request->input('email');
            $name = $request->input('name', '');

            // Clean and validate email format
            $email = strtolower(trim($email));
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new \Illuminate\Validation\ValidationException(
                    \Illuminate\Support\Facades\Validator::make([], []),
                    [
                        'email' => [__('El formato del email no es válido.')]
                    ]
                );
            }

            // Check if email already exists and is subscribed
            $existingSubscription = Newsletter::query()
                ->where('email', $email)
                ->where('status', NewsletterStatusEnum::SUBSCRIBED)
                ->first();

            if ($existingSubscription) {
                throw new \Illuminate\Validation\ValidationException(
                    \Illuminate\Support\Facades\Validator::make([], []),
                    [
                        'email' => [__('El email ya ha sido registrado.')]
                    ]
                );
            }

            // Use centralized method with sendEvent=true to send confirmation emails
            $newsletter = NewsletterFacade::subscribeUser($email, $name, true);

            // Store email in session for future verifications
            $request->session()->put('user_email', $newsletter->email);

            // Update form model for consistency
            $form->setModel($newsletter);
        });

        return $this
            ->httpResponse()
            ->setMessage(trans('plugins/newsletter::newsletter.popup.subscribe_success'));
    }

    public function getUnsubscribe(int|string $id, Request $request)
    {
        abort_unless(URL::hasValidSignature($request), 404);

        /**
         * @var Newsletter $newsletter
         */
        $newsletter = Newsletter::query()
            ->where([
                'id' => $id,
                'status' => NewsletterStatusEnum::SUBSCRIBED,
            ])
            ->first();

        if ($newsletter) {
            $newsletter->update(['status' => NewsletterStatusEnum::UNSUBSCRIBED]);

            UnsubscribeNewsletterEvent::dispatch($newsletter);

            return $this
                ->httpResponse()
                ->setNextUrl(BaseHelper::getHomepageUrl())
                ->setMessage(__('Unsubscribe to newsletter successfully'));
        }

        return $this
            ->httpResponse()
            ->setError()
            ->setNextUrl(BaseHelper::getHomepageUrl())
            ->setMessage(__('Your email does not exist in the system or you have unsubscribed already!'));
    }

    public function ajaxLoadPopup(Request $request)
    {
        // TESTING: Temporalmente simplificado para debugging

        $newsletterForm = NewsletterForm::create()
            ->remove(['wrapper_before', 'wrapper_after', 'name', 'email'])
            ->addBefore(
                'submit',
                'name',
                TextField::class,
                TextFieldOption::make()
                    ->label(__('Name'))
                    ->placeholder(__('Enter Your Name'))
                    ->cssClass('form-control mb-3')
            )
            ->addBefore(
                'submit',
                'email',
                EmailField::class,
                EmailFieldOption::make()
                    ->label(trans('plugins/newsletter::newsletter.popup.email_label'))
                    ->maxLength(-1)
                    ->placeholder(trans('plugins/newsletter::newsletter.popup.email_placeholder'))
                    ->cssClass('form-control mb-3')
                    ->required()
            )
            ->when(Captcha::isEnabled(), function ($form) {
                $form->addBefore(
                    'submit',
                    'captcha',
                    HtmlField::class,
                    HtmlFieldOption::make()
                        ->content(Captcha::display([
                            'data-callback' => 'recaptchaCallback',
                            'data-expired-callback' => 'recaptchaExpiredCallback'
                        ]))
                );
            })
            ->when(Captcha::isEnabled(), function ($form) {
                $form->setFormOption('onsubmit', 'return false;'); // Prevent form submission if captcha not validated
                $form->add(
                    'newsletter-submit-popup-btn',
                    'submit',
                    ButtonFieldOption::make()
                        ->label(__('Subscribe'))
                        ->cssClass('btn btn-primary')
                        ->addAttribute('id', 'newsletter-submit-popup-btn')
                        ->addAttribute('disabled', true)
                );
                $form->remove('submit');
                // Add checkbox after the new submit button when reCAPTCHA is enabled
                $form->addAfter(
                    'newsletter-submit-popup-btn',
                    'dont_show_again',
                    CheckboxField::class,
                    CheckboxFieldOption::make()
                        ->label(trans('plugins/newsletter::newsletter.popup.dont_show_again'))
                        ->value(false)
                );
            })
            ->when(!Captcha::isEnabled(), function ($form) {
                // Add checkbox after the original submit button when reCAPTCHA is disabled
                $form->addAfter(
                    'submit',
                    'dont_show_again',
                    CheckboxField::class,
                    CheckboxFieldOption::make()
                        ->label(trans('plugins/newsletter::newsletter.popup.dont_show_again'))
                        ->value(false)
                );
            });

        return $this
            ->httpResponse()
            ->setData([
                'html' => view('plugins/newsletter::partials.popup', compact('newsletterForm'))->render(),
                'show_popup' => true
            ]);
    }

    public function checkSubscriptionStatus(Request $request)
    {
        $email = $request->input('email');
        
        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this
                ->httpResponse()
                ->setData(['subscribed' => false]);
        }

        // Clean email for consistent checking
        $email = strtolower(trim($email));

        $isSubscribed = Newsletter::query()
            ->where('email', $email)
            ->where('status', NewsletterStatusEnum::SUBSCRIBED)
            ->exists();

        return $this
            ->httpResponse()
            ->setData(['subscribed' => $isSubscribed]);
    }
}
