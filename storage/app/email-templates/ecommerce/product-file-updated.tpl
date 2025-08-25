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
                <h1 class="bb-text-start bb-m-0 bb-mt-md">Archivos de productos actualizados</h1>
            </td>
        </tr>
        <tr>
            <td class="bb-content bb-text-start bb-pb-0">
                <p class="h1">Hola, {{ customer_name }}!</p>
                <p>Los archivos del producto <a href="{{ product_link }}"><strong>{{ product_name }}</strong></a> se han actualizado.</p>
                <p>Hora de actualización: {{ update_time }}</p>
                <p>Archivos actualizados:</p>
                <ul>
                    {% for file in product_files %}
                        <li>{{ file.name }} ({{ file.size }})</li>
                    {% endfor %}
                </ul>
                <p>
                    Puedes descargar los archivos actualizados desde el siguiente enlace:
                    <a href="{{ download_link }}">{{ download_link }}</a>
                </p>
                <p>Gracias por su atención.</p>
            </td>
        </tr>
        <tr>
            <td class="bb-content bb-text-muted bb-pt-0 bb-text-start">
                Si tienes alguna pregunta no dudes en contactarnos.
            </td>
        </tr>
        </tbody>
    </table>
</div>

{{ footer }}