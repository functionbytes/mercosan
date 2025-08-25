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
                                <img src="{{ 'shopping-cart' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">¡Pedido realizado con éxito!</h1>
                </td>
            </tr>
            <tr style="margin-bottom: 16px;display: flex;">
                <td class="bb-content  bb-pb-0">
                    <p>Estimado {{ customer_name }},</p>
                    <div>Gracias por adquirir nuestros productos, nos pondremos en contacto con usted vía teléfono <strong>{{ customer_phone }}</strong> para confirmar su pedido.</div>
                </td>
             
            </tr>
            <tr>
              <td class="bb-content bb-pb-0 bb-pt-0">
                    <table class="bb-row bb-mb-md" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td class="bb-bb-col">
                                    <h4 >Información del cliente</h4>
                                    <div>Nombre: <strong>{{ customer_name }}</strong></div>
                                    {% if customer_phone %}
                                        <div>Telefono: <strong>{{ customer_phone }}</strong></div>
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
              <td class="bb-content bb-pb-0 bb-pt-0">
                    <table class="bb-row bb-mb-md" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td class="bb-bb-col">
                                    <h4 >Información del pedido</h4>
                                    <div>Método de envío: <strong>{{ shipping_method  }}</strong></div>
                                    {% if order_id  %}
                                        <div>Número de orden: <strong>{{ order_id  }}</strong></div>
                                    {% endif %}
                                    {% if payment_method  %}
                                        <div>Método de pago: <strong>{{ payment_method  }}</strong></div>
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
           <tr> 
          <td class="bb-content bb-pt-0">
                <div style="padding: 22px; background-color: #fff5f5; border: 1px solid #fb0000; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                  <h4 style="color: #fb0000; margin: 0 0 8px; font-size: 18px; font-weight: 600;">
                    ❓ Observación
                  </h4>
                  <p style="margin: 0 0 12px; font-size: 14px; color: #000000;">
                    El tiempo estimado de entrega es de <strong>24 horas</strong> después de confirmada la compra; en la mayoría de los casos tu pedido llega incluso antes, ya que trabajamos para despacharlo lo más rápido posible. Los tiempos pueden variar ligeramente según la ubicación del cliente y la disponibilidad del producto. Además, uno de nuestros asesores se comunicará contigo desde nuestro WhatsApp corporativo <strong>316 823 1393</strong> para ultimar detalles de tu compra.
                  </p>
                </div>
              </td>
           </tr> 
        </tbody>
    </table>
</div>

{{ footer }}