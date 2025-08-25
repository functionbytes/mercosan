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
                <h1 class="bb-text-center bb-m-0 bb-mt-md">Actualización del estado de devolución del pedido</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content">
                <p>Estimado <strong>{{ customer_name }}</strong>,</p>
                <div style="margin-bottom: 10px">Queríamos informarle que se ha actualizado el estado de su solicitud de devolución del pedido <strong>{{ order_id }}</strong>.</div>
                <div>El nuevo estado de su solicitud de devolución es: <strong>{{ status }}</strong>.</div>
                {% if description %}
                    <p>Nota del moderador: <strong><i>" {{ description }} "</i></strong>.</p>
                {% endif %}
                <div>Si tiene alguna pregunta o inquietud con respecto a esta actualización, no dude en comunicarse con nuestro equipo de atención al cliente.</div>
            </td>
        </tr>
        </tbody>
    </table>
</div>

{{ footer }}