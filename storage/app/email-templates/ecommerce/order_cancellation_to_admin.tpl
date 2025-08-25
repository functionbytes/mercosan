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

                    <h1 class="bb-text-center bb-m-0 bb-mt-md">El cliente ha cancelado el pedido {{ order_id }}</h1>
                </td>
            </tr>
            <tr>
                <td class="bb-content bb-pb-0">
                    <p>Hola,</p>
                    <p>Cliente {{ customer_name }} ha cancelado el pedido <strong>{{ order_id }}</strong> debido a la razón {{ cancellation_reason }}.</p>
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