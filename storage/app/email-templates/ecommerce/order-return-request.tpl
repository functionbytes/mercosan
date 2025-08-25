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
                            <img src="{{ 'arrow-back-up' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon" />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h1 class="bb-text-center bb-m-0 bb-mt-md">¡Nueva solicitud de devolución de pedido!</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content">
                <div>{{ customer_name }} acaba de solicitar la devolución de productos en su sitio.</div>
            </td>
        </tr>
        <tr>
            <td class="bb-content bb-pt-0 bb-pb-0">
                <table class="bb-row bb-mb-md" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="bb-bb-col">
                                <h4 class="bb-m-0">Motivo de la devolución</h4>
                                <div><strong>{{ return_reason }}</strong></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td class="bb-content bb-pt-0 bb-pb-0">
                <table class="bb-row bb-mb-md" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="bb-bb-col">
                                <h4 class="bb-m-0">Información del cliente</h4>
                                <div>Nombre: <strong>{{ customer_name }}</strong></div>
                                {% if customer_phone %}
                                <div>Teléfono: <strong>{{ customer_phone }}</strong></div>
                                {% endif %}
                                {% if customer_email %}
                                <div>Correo electrónico: <strong>{{ customer_email }}</strong></div>
                                {% endif %}
                                {% if customer_address %}
                                <div>Dirección: <strong>{{ customer_address }}</strong></div>
                                {% endif %}
                            </td>
                        </tr>
                    </tbody>
                </table>
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