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
                                <img src="{{ 'hourglass' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 class="bb-text-center bb-m-0 bb-mt-md">¡El pedido está esperando a que lo completes!</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content">
                <p>Estimado administrador,</p>
                <div>Hemos notado que tienes la intención de comprar algunos productos en nuestra tienda, ¿deseas continuar?</div>
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
          <td align="center" class="bb-content bb-pt-0">
            <table cellspacing="0" cellpadding="0" role="presentation">
              <tbody>
                <tr>
                  <td  align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="background: #fe0000; border-radius: 6px;">
                      <tr>
                        <td align="center" valign="middle" style="padding: 14px 28px;">
                          <a href="{{ site_url }}/checkout/{{ order_token }}/recover" style="text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px; color: #ffffff;">
                           Completar pedido
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