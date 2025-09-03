{{ header }}

<div class="bb-main-content">
    <table class="bb-box" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
            <td class="bb-content bb-pb-0" align="center">
                <table class="bb-icon bb-icon-lg bb-bg-blue" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td valign="middle" align="center">
                                <img src="{{ 'shopping-cart' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 class="bb-text-center bb-m-0 bb-mt-md">Hola administrador</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content">
                <p>El cliente <strong>{{ customer_name }}</strong>,</p>
                <div style="margin-bottom: 10px">Queríamos informarle que se ha actualizado el estado de su solicitud de devolución del pedido <strong>{{ order_id }}</strong>  (Correo electrónico: <a href="mailto:{{ customer_email }}">{{ customer_email }}</a>).</div>
                
                <div>ha subido un comprobante de pago de su pedido con identificación <strong>{{ order_id }}</strong>.</div>
              
                <div>Puede ver los detalles del pago <a href="{{ payment_link }}">aquí</a> y los detalles del pedido <a href="{{ order_link }}">aquí</a>.</div>

              
            </td>
        </tr>
        </tbody>
    </table>
</div>

{{ footer }}