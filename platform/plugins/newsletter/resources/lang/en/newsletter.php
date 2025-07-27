<?php

return [
    'name' => 'Newsletters',
    'newsletter_form' => 'Newsletters form',
    'description' => 'View and delete newsletter subscribers',
    'settings' => [
        'email' => [
            'templates' => [
                'title' => 'Newsletter',
                'description' => 'Config newsletter email templates',
                'to_admin' => [
                    'title' => 'Email send to admin',
                    'description' => 'Template for sending email to admin',
                    'subject' => 'New user subscribed your newsletter',
                    'newsletter_email' => 'Email of user who subscribe newsletter',
                ],
                'to_user' => [
                    'title' => 'Email send to user',
                    'description' => 'Template for sending email to subscriber',
                    'subject' => '{{ site_title }}: Subscription Confirmed!',
                    'newsletter_name' => 'Full name of user who subscribe newsletter',
                    'newsletter_email' => 'Email of user who subscribe newsletter',
                    'newsletter_unsubscribe_link' => 'Link for unsubscribe newsletter',
                    'newsletter_unsubscribe_url' => 'URL for unsubscribe newsletter',
                ],
            ],
        ],
        'title' => 'Newsletter',
        'panel_description' => 'View and update newsletter settings',
        'description' => 'Settings for newsletter (auto send newsletter email to SendGrid, mailjet... when someone register newsletter on website).',
        'mailjet_api_key' => 'Mailjet API Key',
        'mailjet_list_id' => 'Mailjet List ID',
        'mailjet_list' => 'Mailjet List',
        'sendgrid_api_key' => 'Sendgrid API Key',
        'sendgrid_list_id' => 'Sendgrid List ID',
        'sendgrid_list' => 'Sendgrid List',
        'enable_newsletter_contacts_list_api' => 'Enable newsletter contacts list API?',
    ],
    'statuses' => [
        'subscribed' => 'Subscribed',
        'unsubscribed' => 'Unsubscribed',
    ],
];
