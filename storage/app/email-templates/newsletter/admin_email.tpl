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
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">Nuevo suscriptor</h1>
                  
                  <p class="bb-text-center bb-mt-sm bb-mb-0 bb-text-muted" style="margin: 8px 0 0; font-size: 16px; color: #555555;">
                    Nuevo usuario se ha suscrito a tu newsletter: <a href="mailto:{{ newsletter_email }}">{{ newsletter_email}}</a>
                  </p>
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