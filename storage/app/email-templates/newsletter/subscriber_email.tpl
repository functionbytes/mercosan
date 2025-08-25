{{ header }}

<div class="bb-main-content" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9fb; padding: 0; margin: 0;">
  <table class="bb-box" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
    <tbody>
      <!-- Illustration & Title -->
      <tr>
        <td style="padding: 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tbody>
              <tr>
                <td class="bb-content bb-pb-0" align="center">
                    <table class="bb-icon bb-icon-lg bb-bg-blue" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td valign="middle" align="center">
                                    <img src="{{ 'check' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">Suscripción exitosa</h1>

                  <p class="bb-text-center bb-mt-sm bb-mb-0 bb-text-muted" style="margin: 8px 0 0; font-size: 16px; color: #555555;">
                    ¡Gracias por suscribirte a nuestro boletín!
                  </p>
                </td>
            </tr>

              <!-- Coupon Section -->
              <tr>
                <td align="center" style="padding: 32px 0 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 520px; margin: 0 auto; border: 2px dashed #fe0000; border-radius: 8px; background: #fff5f5;">
                    <tbody>
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #fe0000;">Tu regalo de bienvenida</p>
                          <div style="display: inline-block; background: #ffffff; padding: 12px 20px; border-radius: 6px; font-size: 24px; font-weight: 700; letter-spacing: 1px; margin: 8px 0; border: 1px solid #ffd5d5;">
                            <span style="display: block;">BIENVENIDA10K</span>
                          </div>
                          <p style="margin: 4px 0 12px; font-size: 14px; color: #555555;">
                            10.000 COP de descuento en tu primera compra por más de 50.000 COP. Válido hasta <em>{{ coupon_expiry_date }}</em>.
                          </p>
                          <p style="margin: 12px 0 0; font-size: 12px; color: #888888;">
                            El código se aplica automáticamente en el checkout si alcanzas el monto mínimo. Válido solo para primera compra. Términos y condiciones aplican.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <!-- Unsubscribe -->
              <tr>
                <td class="bb-content bb-text-muted bb-text-center" align="center" style="padding: 24px 16px 16px; font-size: 12px; color: #888888;">
                  Para cancelar la suscripción al boletín, haga clic en {{ newsletter_unsubscribe_link }}
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
