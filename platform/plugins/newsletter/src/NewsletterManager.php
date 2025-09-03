<?php

namespace Botble\Newsletter;

use Botble\Base\Facades\AdminHelper;
use Botble\Media\Facades\RvMedia;
use Botble\Newsletter\Contracts\Factory;
use Botble\Newsletter\Drivers\Mailjet;
use Botble\Newsletter\Drivers\SendGrid;
use Botble\Theme\Events\RenderingThemeOptionSettings;
use Botble\Theme\Facades\Theme;
use Botble\Theme\Facades\ThemeOption;
use Botble\Theme\ThemeOption\Fields\MediaImageField;
use Botble\Theme\ThemeOption\Fields\MultiCheckListField;
use Botble\Theme\ThemeOption\Fields\NumberField;
use Botble\Theme\ThemeOption\Fields\TextareaField;
use Botble\Theme\ThemeOption\Fields\TextField;
use Botble\Theme\ThemeOption\Fields\ToggleField;
use Botble\Theme\ThemeOption\ThemeOptionSection;
use Illuminate\Routing\Events\RouteMatched;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Manager;
use InvalidArgumentException;
use Botble\Newsletter\Models\Newsletter;
use Botble\Newsletter\Enums\NewsletterStatusEnum;
use Botble\Newsletter\Events\SubscribeNewsletterEvent;

class NewsletterManager extends Manager implements Factory
{
    /**
     * Ajuste de convención de nombre para Manager:
     * create{Driver}Driver() => createMailjetDriver()
     */
    protected function createMailjetDriver(): Mailjet
    {
        return new Mailjet(
            setting('newsletter_mailjet_api_key'),
            setting('newsletter_mailjet_list_id')
        );
    }

    public function getDefaultDriver(): string
    {
        throw new InvalidArgumentException('No email marketing provider was specified.');
    }

    public function registerNewsletterPopup(bool $keepHtmlDomOnClose = false): void
    {
        app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
            ThemeOption::setSection(
                ThemeOptionSection::make('opt-text-subsection-newsletter-popup')
                    ->title(__('Newsletter Popup'))
                    ->icon('ti ti-mail-opened')
                    ->fields([
                        ToggleField::make()
                            ->name('newsletter_popup_enable')
                            ->label(trans('plugins/newsletter::newsletter.settings.enable_popup'))
                            ->defaultValue(true),

                        MediaImageField::make()
                            ->name('newsletter_popup_image')
                            ->label(__('Popup Image')),

                        TextField::make()
                            ->name('newsletter_popup_title')
                            ->label(__('Popup Title'))
                            // ✅ Copy motivador
                            ->defaultValue('✨ Mantente informado y aprovecha más'),

                        TextField::make()
                            ->name('newsletter_popup_subtitle')
                            ->label(__('Popup Subtitle'))
                            // ✅ CTA suave que empuja al registro
                            ->defaultValue('Suscríbete y recibe novedades, promociones y contenido de valor.'),

                        TextareaField::make()
                            ->name('newsletter_popup_description')
                            ->label(__('Popup Description'))
                            // ✅ Incluye beneficio + cupón 10%
                            ->defaultValue('Suscríbete ahora y recibe en tu correo nuestras últimas actualizaciones, promociones exclusivas y contenido de valor pensado para ti. 🎁 Además, obtén un cupón de bienvenida del 10% en tu primera compra.'),

                        NumberField::make()
                            ->name('newsletter_popup_delay')
                            ->label(__('Popup Delay (seconds)'))
                            ->defaultValue(0)
                            ->helperText(__('Set the delay time to show the popup after the page is loaded. Set 0 to show the popup immediately.'))
                            ->attributes(['min' => 0]),

                        MultiCheckListField::make()
                            ->name('newsletter_popup_display_pages')
                            ->label(__('Display on pages'))
                            ->inline()
                            ->defaultValue(['public.index', 'all'])
                            ->options(apply_filters('newsletter_popup_display_pages', [
                                'public.index' => __('Homepage'),
                                'all' => __('All Pages'),
                            ])),
                    ])
            );
        });

        app('events')->listen(RouteMatched::class, function () use ($keepHtmlDomOnClose): void {
            if (! $this->isNewsletterPopupEnabled($keepHtmlDomOnClose)) {
                return;
            }

            Theme::asset()
                ->container('footer')
                ->add(
                    'newsletter',
                    asset('vendor/core/plugins/newsletter/js/newsletter.js'),
                    ['jquery'],
                    version: '1.2.9'
                );

            add_filter('theme_front_meta', function (?string $html): string {
                $image = theme_option('newsletter_popup_image');

                if (! $image) {
                    return $html;
                }

                return $html . '<link rel="preload" as="image" href="' . e(RvMedia::getImageUrl($image)) . '" />';
            });

            add_filter(THEME_FRONT_BODY, function (?string $html): string {
                return $html . view('plugins/newsletter::partials.newsletter-popup');
            });
        });
    }

    protected function isNewsletterPopupEnabled(bool $keepHtmlDomOnClose = false): bool
    {
        $pluginActive = is_plugin_active('newsletter');
        $popupEnabled = setting('newsletter_popup_enable', true);
        $noCookie = ! isset($_COOKIE['newsletter_popup']);
        $notAdmin = ! AdminHelper::isInAdmin();

        $isEnabled = $pluginActive && $popupEnabled && ($keepHtmlDomOnClose || $noCookie) && $notAdmin;

        if (! $isEnabled) {
            return false;
        }

        $displayPages = theme_option('newsletter_popup_display_pages');
        if ($displayPages) {
            $decoded = json_decode($displayPages, true);
            $displayPages = is_array($decoded) ? $decoded : (array) $displayPages;
        } else {
            $displayPages = ['public.index'];
        }

        if (
            ! in_array('all', $displayPages, true)
            && ! in_array(Route::currentRouteName(), $displayPages, true)
        ) {
            return false;
        }

        // ✅ Detección de bots por substring
        $ignoredBots = [
            'googlebot',
            'bingbot',
            'slurp',
            'ia_archiver',
            'chrome-lighthouse',
        ];

        $ua = strtolower((string) request()->userAgent());
        foreach ($ignoredBots as $bot) {
            if ($ua !== '' && strpos($ua, $bot) !== false) {
                return false;
            }
        }

        return true;
    }

    public function setDefaultNewsletterPopupSettings(): void
    {
        $defaults = [
            'newsletter_popup_enable' => true,
            'newsletter_popup_title' => '✨ Mantente informado y aprovecha más',
            'newsletter_popup_subtitle' => 'Suscríbete y recibe novedades, promociones y contenido de valor.',
            'newsletter_popup_description' => 'Suscríbete ahora y recibe en tu correo nuestras últimas actualizaciones, promociones exclusivas y contenido de valor pensado para ti. 🎁 Además, obtén un cupón de bienvenida del 10% en tu primera compra.',
            'newsletter_popup_delay' => 0,
            'newsletter_popup_display_pages' => json_encode(['public.index', 'all']),
        ];

        foreach ($defaults as $key => $value) {
            if (! theme_option($key)) {
                theme_option()->set($key, $value);
            }
        }
    }

    /**
     * Subscribe user to newsletter with validation and deduplication
     * Compatible with existing architecture
     *
     * @param string $email The email address to subscribe
     * @param string|null $name Optional name of the subscriber
     * @param bool $sendEvent Whether to dispatch SubscribeNewsletterEvent (default: false)
     * @return Newsletter The newsletter model instance
     */
    public function subscribeUser(string $email, ?string $name = null): Newsletter
    {
        // Clean and validate email
        $email = strtolower(trim($email));
        $name = $name ? trim($name) : '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email address format');
        }

        // Use the same pattern as PublicController for consistency
        $newsletter = Newsletter::query()->firstOrNew([
            'email' => $email,
        ], [
            'name' => $name,
            'status' => NewsletterStatusEnum::SUBSCRIBED,
        ]);

        // If exists but was unsubscribed, reactivate it
        if ($newsletter->exists && $newsletter->status === NewsletterStatusEnum::UNSUBSCRIBED) {
            $newsletter->update([
                'status' => NewsletterStatusEnum::SUBSCRIBED,
                'name' => $name ?: $newsletter->name,
            ]);
        } elseif (!$newsletter->exists) {
            // Save new subscription
            $newsletter->save();
        }

        // Always dispatch event for Mailjet sync when there's a subscription change
        if ($newsletter->wasRecentlyCreated || $newsletter->wasChanged()) {
            SubscribeNewsletterEvent::dispatch($newsletter);
        }

        return $newsletter;
    }
}
