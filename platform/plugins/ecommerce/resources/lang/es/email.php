<?php

return [
    'abandoned_cart' => [
        'name' => 'Carrito Abandonado',
        'description' => 'Plantilla de correo para recordar a los clientes sobre sus carritos abandonados',
        'subject' => 'Tu carrito te está esperando - ¡Completa tu compra!',
        'title' => 'Recordatorio de Carrito Abandonado',
        'content' => 'Hola {{ customer_name }}, notamos que dejaste algunos productos increíbles en tu carrito. ¡No los pierdas!',
    ],
    
    'abandoned_cart_title' => 'Recuperación de Carrito Abandonado',
    'abandoned_cart_description' => 'Enviar correos personalizados a clientes que dejaron productos en su carrito de compras',
    'abandoned_cart_subject' => 'Tu carrito te está esperando en {{ site_title }}',
    
    'admin_new_order_title' => 'Notificación de nuevo pedido',
    'admin_new_order_description' => 'Enviar a administradores cuando se realiza un pedido',
    'admin_new_order_subject' => 'Nuevo pedido :order_id ha sido realizado',
];