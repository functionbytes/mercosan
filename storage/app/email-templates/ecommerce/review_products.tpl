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
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">¡Pedido completado!</h1>
                </td>
            </tr>
            <tr>
                <td class="bb-content" style="margin-bottom: 10px;">
                    <p>Estimado {{ customer_name }},</p>
                    <div>Gracias por adquirir nuestros productos, ¡puedes revisar el producto a continuación!</div>
                </td>
            </tr>
            <tr>
               <td class="bb-content bb-pt-0 bb-mt-0">
                    <h4>Productos</h4>
                    {{ product_review_list }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

{{ footer }}