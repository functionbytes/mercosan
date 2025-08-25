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
                                    <img src="{{ 'shopping-cart-x' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h1 class="bb-text-center  bb-mt-md">Su pedido ha sido cancelado</h1>
                </td>
            </tr>
            <tr>
                <td class="bb-content  bb-pt-0 bb-pb-0">
                    <p>Estimado {{ customer_name }},</p>
                    <p>Su pedido <strong>{{ order_id }}</strong> se ha cancelado como usted solicitó debido al motivo {{ cancellation_reason }} y su pago también fue cancelado.</p>
                    <p>Lamentamos que haya decidido cancelar su pedido. Si tiene alguna pregunta o inquietud, no dude en contactarnos.</p>
                </td>
            </tr>
            <tr>
                <td class="bb-content bb-pt-0">
                    <h4>Esto es lo que pediste:</h4>
                    {{ product_list }}

                    {% if order_note %}
                    <div>Nota: {{ order_note }}</div>
                    {% endif %}
                </td>
            </tr>
        </tbody>
    </table>
</div>

{{ footer }}