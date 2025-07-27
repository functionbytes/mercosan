<?php

return [
    'webhook_secret' => 'Secreto del webhook',
    'webhook_setup_guide' => [
        'title' => 'Guía de configuración del webhook de Stripe',
        'description' => 'Siga estos pasos para configurar un webhook de Stripe',
        'step_1_label' => 'Inicie sesión en el panel de Stripe',
        'step_1_description' => 'Acceda al enlace : y haga clic en el botón "Agregar punto final" en la sección "Webhooks" de la pestaña "Desarrolladores".',
        'step_2_label' => 'Seleccionar evento y configurar punto final',
        'step_2_description' => 'Seleccione el evento "payment_intent.succeeded" e ingrese la siguiente URL en el campo "Endpoint URL": :url',
        'step_3_label' => 'Agregar punto final',
        'step_3_description' => 'Haga clic en el botón "Agregar punto final" para guardar el webhook.',
        'step_4_label' => 'Copiar el secreto de firma',
        'step_4_description' => 'Copie el valor "Secreto de firma" de la sección "Detalles del Webhook" y péguelo en el campo "Secreto del Webhook Stripe" en la sección "Stripe" de la pestaña "Pago" en la página "Configuración".',
    ],
];
