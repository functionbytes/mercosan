{{ header }}

<div class="bb-main-content" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9fb; padding: 0; margin: 0;">
  <table class="bb-box" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
    <tbody>
      <!-- Icon & Welcome -->
      <tr>
        <td class="bb-content bb-pb-0" align="center" style="padding: 32px 24px;">
          <table class="bb-icon bb-icon-lg bb-bg-blue" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td valign="middle" align="center">
                                    <img src="{{ 'mail' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                                </td>
                            </tr>
                        </tbody>
                    </table>
          <h1 style="margin: 16px 0 4px; font-size: 24px; font-weight: 700; color: #1f2d3d;">¡Bienvenido a {{ site_title }}!</h1>
          <p style="margin: 4px 0 0; font-size: 16px; color: #555555;">Nos alegra tenerte con nosotros, {{ customer_name }}.</p>
          <p style="margin: 4px 0 0; font-size: 16px; color: #555555;">En Mercosan queremos que tu primera experiencia sea especial, por eso hemos preparado un beneficio exclusivo para ti.</p>
        </td>
      </tr>

      <!-- Gift Coupon Section -->
      <tr>
        <td align="center" style="padding: 0 24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border: 2px dashed #fe0000; border-radius: 8px; background: #fff5f5;">
            <tbody>
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #fe0000;">Cupón de bienvenida</p>
                  <div style="display: inline-block; background: #ffffff; padding: 12px 20px; border-radius: 6px; font-size: 24px; font-weight: 700; letter-spacing: 1px; margin: 8px 0; border: 1px solid #ffd5d5;">
                    <span style="display: block;">BIENVENIDA</span>
                  </div>
                  <p style="margin: 4px 0 12px; font-size: 14px; color: #555555;">
                    Has obtenido un 10% de descuento en tu primera compra. Válido hasta <em>{{ coupon_expiry_date }}</em>.
                  </p>
                  <p style="margin: 12px 0 0; font-size: 12px; color: #888888;">
                    El código se aplica automáticamente en la orden si alcanzas el monto mínimo. Válido solo para primera compra. Términos y condiciones aplican.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <!-- Primary CTA -->
      <tr>
        <td align="center" style="padding: 0 24px 40px;">
          <table cellspacing="0" cellpadding="0" role="presentation">
            <tbody>
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0" border="0" style="background: #fe0000; border-radius: 6px;">
                    <tr>
                      <td align="center" valign="middle" style="padding: 14px 28px;">
                        <a href="{{ site_url }}" style="text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px; color: #ffffff;">
                          ¡Empieza a comprar!
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

      <!-- Support / Footer hint -->
      <tr>
        <td style="padding: 0 24px 24px; text-align: center; font-size: 12px; color: #888888;">
          <p style="margin: 0;">Si necesitas ayuda, responde a este correo y con gusto te asistimos.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

{{ footer }}