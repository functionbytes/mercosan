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
                                <img src="{{ 'alert-triangle' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 class="bb-text-center bb-m-0 bb-mt-md">Eliminación de cuenta completada</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content">
                <p>Estimado {{ customer_name }},</p>
                <div>Este es un correo electrónico automático para informarle que su cuenta ha sido eliminada.</div>
                <div>Si tienes alguna pregunta no dudes en contactarnos.</div>
            </td>
        </tr>
        </tbody>
    </table>
</div>

{{ footer }}