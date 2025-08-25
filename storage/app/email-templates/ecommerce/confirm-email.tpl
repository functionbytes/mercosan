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
                                    <img src="{{ 'check' | icon_url }}" class="bb-va-middle" width="40" height="40" alt="Icon">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 class="bb-text-center bb-m-0 bb-mt-md">Verificar correo electrónico</h1>
                </td>
            </tr>
            <tr>
                <td class="bb-content bb-text-center">
                    <p class="h1">Estamos encantados de tenerte aquí, {{ customer_name }}!</p>
                    <p>Por favor, verifique su dirección de correo electrónico para acceder a este sitio web. Haga clic en el botón de abajo para verificar su correo electrónico.</p>
                </td>
            </tr>
            <tr>
                <td class="bb-content bb-text-center bb-pt-0 bb-pb-xl">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" class="bb-rounded bb-bg-blue bb-w-auto">
                                        <tr>
                                            <td align="center" valign="top" class="lh-1">
                                                <a href="{{ verify_link }}" class="bb-btn bb-bg-blue bb-border-blue">
                                                    <span class="btn-span">Confirma tu dirección de correo electrónico</span>
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
            <tr>
                <td class="bb-content bb-text-muted bb-pt-0 bb-text-center">
                    Si tiene problemas para hacer clic en "Confirmar&nbsp;your&nbsp;email&nbsp;address" Botón, copie y pegue la siguiente URL en su navegador web: <a href="{{ verify_link }}">{{ verify_link }}</a> y pégalo en tu navegador.
                </td>
            </tr>
        </tbody>
    </table>
</div>

{{ footer }}