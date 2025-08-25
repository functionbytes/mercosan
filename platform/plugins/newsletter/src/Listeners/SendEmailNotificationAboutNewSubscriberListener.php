<?php

namespace Botble\Newsletter\Listeners;

use Botble\Base\Facades\EmailHandler;
use Botble\Base\Facades\Html;
use Botble\Newsletter\Events\SubscribeNewsletterEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\URL;

class SendEmailNotificationAboutNewSubscriberListener implements ShouldQueue
{
    public function handle(SubscribeNewsletterEvent $event): void
    {
        // Skip email notification if explicitly disabled
        if (!$event->sendEmailNotification) {
            return;
        }
        
        $unsubscribeUrl = URL::signedRoute('public.newsletter.unsubscribe', ['user' => $event->newsletter->id]);

        // Log para debugging
        \Log::info('Newsletter email sendo enviado', [
            'email' => $event->newsletter->email,
            'name' => $event->newsletter->name,
            'template' => 'subscriber_email'
        ]);

        $mailer = EmailHandler::setModule(NEWSLETTER_MODULE_SCREEN_NAME)->setVariableValues([
            'newsletter_name' => $event->newsletter->name ?? 'N/A',
            'newsletter_email' => $event->newsletter->email,
            'newsletter_unsubscribe_link' => Html::link($unsubscribeUrl, __('aquí'))->toHtml(),
            'newsletter_unsubscribe_url' => $unsubscribeUrl,
        ]);

        try {
            $mailer->sendUsingTemplate('subscriber_email', $event->newsletter->email);
            \Log::info('Newsletter email enviado exitosamente a: ' . $event->newsletter->email);
        } catch (\Exception $e) {
            \Log::error('Error enviando newsletter email: ' . $e->getMessage());
        }

        // Enviar email al admin
        try {
            $mailer->sendUsingTemplate('admin_email');
            \Log::info('Newsletter admin email enviado');
        } catch (\Exception $e) {
            \Log::error('Error enviando newsletter admin email: ' . $e->getMessage());
        }
    }
}
