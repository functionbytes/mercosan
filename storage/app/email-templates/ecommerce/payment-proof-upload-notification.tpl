{{ header }}

<p>Hola administrador,</p>

<p>El cliente <strong>{{ customer_name }}</strong> (Correo electrónico: <a href="mailto:{{ customer_email }}">{{ customer_email }}</a>) ha subido un comprobante de pago de su pedido con identificación <strong>{{ order_id }}</strong>.</p>

<p>Puede ver los detalles del pago <a href="{{ payment_link }}">aquí</a> y los detalles del pedido <a href="{{ order_link }}">aquí</a>.</p>

{{ footer }}