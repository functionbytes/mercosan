<?php

return [
    'name' => 'Newsletter',
    'newsletter_form' => 'Formulario de Newsletter',
    'description' => 'Ver y eliminar suscriptores del newsletter',

    'settings' => [
        'email' => [
            'templates' => [
                'title' => 'Newsletter',
                'description' => 'Configurar plantillas de email del newsletter',
                'to_admin' => [
                    'title' => 'Email enviado al administrador',
                    'description' => 'Plantilla para enviar email al administrador',
                    'subject' => 'Nuevo usuario suscrito a tu newsletter',
                    'newsletter_email' => 'Email del usuario que se suscribió al newsletter',
                ],
                'to_user' => [
                    'title' => 'Email enviado al usuario',
                    'description' => 'Plantilla para enviar email al suscriptor',
                    'subject' => '{{ site_title }}: ¡Suscripción Confirmada!',
                    'newsletter_name' => 'Nombre completo del usuario que se suscribió al newsletter',
                    'newsletter_email' => 'Email del usuario que se suscribió al newsletter',
                    'newsletter_unsubscribe_link' => 'Enlace para desuscribirse del newsletter',
                    'newsletter_unsubscribe_url' => 'URL para desuscribirse del newsletter',
                ],
            ],
        ],

        'title' => 'Newsletter',
        'panel_description' => 'Ver y actualizar configuraciones del newsletter',
        'description' => 'Configuraciones para newsletter (envío automático de email del newsletter a SendGrid, Mailjet... cuando alguien se registra al newsletter en el sitio web).',

        // Proveedores
        'mailjet_api_key' => 'Clave API de Mailjet',
        'mailjet_list_id' => 'ID de Lista de Mailjet',
        'mailjet_list' => 'Lista de Mailjet',
        'sendgrid_api_key' => 'Clave API de SendGrid',
        'sendgrid_list_id' => 'ID de Lista de SendGrid',
        'sendgrid_list' => 'Lista de SendGrid',

        'enable_newsletter_contacts_list_api' => '¿Habilitar API de lista de contactos del newsletter?',

        // Popup
        'enable_popup' => 'Habilitar popup del newsletter',
        'popup_title' => 'Título del popup',
        'popup_subtitle' => 'Subtítulo del popup',
        'popup_description' => 'Descripción del popup',
        'popup_delay' => 'Retraso del popup (segundos)',
        'popup_delay_help' => 'Establecer el tiempo de retraso para mostrar el popup después de que se carga la página. Establecer 0 para mostrar el popup inmediatamente.',
        'popup_display_pages' => 'Mostrar en páginas',
        'display_pages' => [
            'homepage' => 'Página de inicio',
            'all' => 'Todas las páginas',
        ],
    ],

    'statuses' => [
        'subscribed' => 'Suscrito',
        'unsubscribed' => 'Desuscrito',
    ],

    'popup' => [
        // Copy motivador + cupón 10%
        'title' => 'Mantente informado y aprovecha más',
        'subtitle' => 'Recibe novedades, promociones.',
        'description' => 'Suscríbete ahora y recibe en tu correo nuestras últimas actualizaciones, promociones exclusivas y contenido de valor pensado para ti. 🎁 Además, obtén un cupón de bienvenida del 10% en tu primera compra.',

        // Campos visuales
        'email_placeholder' => 'Ingresa tu email',
        'email_label' => 'Dirección de Email',
        'subscribe_button' => 'Suscribirme', // compatible con vistas actuales

        // Opcionales (útiles en el partial del popup)
        'popup_button_text' => 'Quiero mi 10%',
        'popup_coupon_note' => 'Cupón válido solo para tu primera compra.',
        'popup_privacy_note' => 'Al suscribirte, aceptas nuestra política de privacidad.',

        // Mensajes
        'dont_show_again' => 'No mostrar este popup nuevamente',
        'already_subscribed' => 'Ya estás suscrito a nuestro newsletter.',
        'subscribe_success' => '¡Te has suscrito al newsletter exitosamente!',
        'subscribe_error' => 'Error al suscribirse. Por favor, intenta nuevamente.',
    ],
];
