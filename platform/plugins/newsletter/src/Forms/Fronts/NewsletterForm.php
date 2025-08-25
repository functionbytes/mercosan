<?php

namespace Botble\Newsletter\Forms\Fronts;

use Botble\Base\Forms\FieldOptions\ButtonFieldOption;
use Botble\Base\Forms\FieldOptions\EmailFieldOption;
use Botble\Base\Forms\FieldOptions\HtmlFieldOption;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\EmailField;
use Botble\Base\Forms\Fields\HtmlField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Newsletter\Http\Requests\NewsletterRequest;
use Botble\Newsletter\Models\Newsletter;
use Botble\Theme\FormFront;

class NewsletterForm extends FormFront
{
    protected string $errorBag = 'newsletter';

    public static function formTitle(): string
    {
        return trans('plugins/newsletter::newsletter.newsletter_form');
    }

    public function setup(): void
    {
        $this
            ->contentOnly()
            ->setUrl(route('public.newsletter.subscribe'))
            ->setFormOption('class', 'subscribe-form')
            ->setValidatorClass(NewsletterRequest::class)
            ->model(Newsletter::class)
            ->add('wrapper_before', HtmlField::class, HtmlFieldOption::make()->content('<div class="newsletter-form-fields">'))
            ->add(
                'name',
                TextField::class,
                TextFieldOption::make()
                    ->label(false)
                    ->cssClass('form-control mb-3')
                    ->wrapperAttributes(['class' => 'form-group'])
                    ->placeholder(__('Enter Your Name'))
                    ->addAttribute('id', 'newsletter-name')
            )
            ->add(
                'email',
                EmailField::class,
                EmailFieldOption::make()
                    ->label(false)
                    ->required()
                    ->cssClass('form-control mb-3')
                    ->wrapperAttributes(['class' => 'form-group'])
                    ->maxLength(-1)
                    ->placeholder(__('Enter Your Email'))
                    ->addAttribute('id', 'newsletter-email')
            )
            ->add(
                'submit',
                'submit',
                ButtonFieldOption::make()
                    ->label(__('Subscribe'))
                    ->cssClass('btn btn-primary w-100'),
            )
            ->add('wrapper_after', HtmlField::class, HtmlFieldOption::make()->content('</div>'))
            ->add(
                'messages',
                HtmlField::class,
                HtmlFieldOption::make()
                    ->content(<<<'HTML'
                        <div class="newsletter-message newsletter-success-message" style="display: none"></div>
                        <div class="newsletter-message newsletter-error-message" style="display: none"></div>
                    HTML)
            );
    }
}
