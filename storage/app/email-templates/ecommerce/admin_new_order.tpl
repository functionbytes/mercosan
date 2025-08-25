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
                                <img src="{{ 'shopping-cart-plus' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">¡Muy bien, tienes un nuevo pedido en {{ site_title }}!</h1>
                </td>
            </tr>
            <tr>
                <td class="bb-content">
                    <p>Estimado administrador,</p>
                    <div>{{ customer_name }} acaba de realizar un pedido en su sitio</div>
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
                    <h4>Información del pedido</h4>
                    {{ product_list }}

                    {% if order_note %}
                        <div>Nota: {{ order_note }}</div>
                    {% endif %}
                </td>
           </tr> 
          
            <tr>
                <td class="bb-content bb-pt-0 bb-pb-0">
                    <div style="padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                        <h4 style="margin: 0 0 10px 0; color: #333;">Resumen del Pedido</h4>
                        <table style="width: 100%; margin: 0;">
                            <tr>
                                <td style="padding: 5px 0; text-align: left;">Subtotal:</td>
                                <td style="padding: 5px 0; text-align: right; font-weight: bold;">{{ sub_total }}</td>
                            </tr>
                            {% if shipping_amount and shipping_amount != '$0' and shipping_amount != '$ 0 ' and shipping_amount != '$0.00' %}
                            <tr>
                                <td style="padding: 5px 0; text-align: left;">Gastos de envío:</td>
                                <td style="padding: 5px 0; text-align: right;">{{ shipping_amount }}</td>
                            </tr>
                            {% endif %}
                            {% if discount_amount and discount_amount != '$0' %}
                            <tr>
                                <td style="padding: 5px 0; text-align: left; color: #28a745;">Descuento{% if coupon_code %} ({{ coupon_code }}){% endif %}:</td>
                                <td style="padding: 5px 0; text-align: right; color: #28a745;">-{{ discount_amount }}</td>
                            </tr>
                            {% endif %}
                            {% if tax_amount and tax_amount != '$0' %}
                            <tr>
                                <td style="padding: 5px 0; text-align: left;">Impuestos:</td>
                                <td style="padding: 5px 0; text-align: right;">{{ tax_amount }}</td>
                            </tr>
                            {% endif %}
                            <tr style="border-top: 2px solid #333; font-weight: bold; font-size: 16px;">
                                <td style="padding: 10px 0 5px 0; text-align: left;">TOTAL:</td>
                                <td style="padding: 10px 0 5px 0; text-align: right;">{{ order_amount }}</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
          
          <tr>
        <td align="center" class="bb-content">
          <table cellspacing="0" cellpadding="0" role="presentation">
            <tbody>
              <tr>
                <td  align="center">
                  <table cellpadding="0" cellspacing="0" border="0" style="background: #fe0000; border-radius: 6px;">
                    <tr>
                      <td align="center" valign="middle" style="padding: 14px 28px;">
                        <a href="{{ order_edit_link }}" style="text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px; color: #ffffff;">
                          ¡Ver pedido
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
          
          
        </tbody>
    </table>
</div>

{{ footer }}