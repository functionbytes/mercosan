<!doctype html>
<html {{ html_attributes }}>
<head>
    <meta charset="UTF-8">
    <title>{{ 'plugins/ecommerce::shipping.shipping_label.name'|trans }} {{ shipment.code }}</title>

    {{ settings.font_css }}

    <style>
        @page {
            size: 4in 6in;
            margin: 0;
        }

        * {
            margin: 0;
            box-sizing: border-box;
        }

        body {
            font-size: 9px;
            font-family: '{{ settings.font_family }}', Arial, sans-serif !important;
            width: 4in;
            padding: 0;
            margin: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%
        }

        table tr td {
            padding: 0
        }

        h2 {
            font-size: 13px;
            margin: 0;
        }

        h3 {
            font-size: 12px;
            margin: 0;
        }

        h4 {
            font-size: 10px;
            margin: 0;
        }

        p, span {
            font-size: 10px;
            margin: 0;
        }

        {{ settings.extra_css }}
    </style>

    {{ settings.header_html }}
</head>
<body {{ body_attributes }}>
<div style="padding: 8px;">
    <div style="padding: 5px; border-bottom: 1px solid #0000001c;">
        {% if sender.logo %}
        <div style="text-align: center; margin-bottom: 25px;">
            <img src="{{ sender.logo }}" alt="{{ sender.name }}" style="max-width: 100px; height: auto;">
        </div>
        {% endif %}
        <table>
            <tr>
                <td style="vertical-align: top">
                    <h2>{{ sender.name }}</h2>
                    <h4>{{ sender.full_address }}</h4>
                    <h4>{{ sender.phone }}</h4>
                    <h4>{{ sender.email }}</h4>
                </td>
            </tr>
        </table>
    </div>

    <div style="padding: 5px; border-bottom: 1px solid #0000001c;">
        <h2>{{ receiver.name }}</h2>
        <h4>{{ receiver.full_address }}</h4>
        <h4>{{ receiver.phone }}</h4>
    </div>

    <div style="padding: 5px; border-bottom: 1px solid #0000001c">
        <table>
            <tr>
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::shipping.shipment_id'|trans }}:</span>
                    <h3>{{ shipment.code }}</h3>
                </td>
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::shipping.order_id'|trans }}:</span>
                    <h3>{{ shipment.order_number }}</h3>
                </td>
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::shipping.shipping_label.order_date'|trans }}:</span>
                    <h3>{{ shipment.created_at }}</h3>
                </td>
            </tr>
            {% if shipment.delivery_date or shipment.delivery_time %}
            <tr>
                {% if shipment.delivery_date %}
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::order.delivery_date'|trans }}:</span>
                    <h3>{{ shipment.delivery_date }}</h3>
                </td>
                {% endif %}
                {% if shipment.delivery_time %}
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::order.delivery_time'|trans }}:</span>
                    <h3>{{ shipment.delivery_time }}</h3>
                </td>
                {% endif %}
                <td style="padding-bottom: 10px;">
                    <span>{{ 'plugins/ecommerce::shipping.shipping_method'|trans }}:</span>
                    <h3>{{ shipment.shipping_method }}</h3>
                </td>
            </tr>
            {% endif %}

            <tr>
                <td>
                    <span>{{ 'plugins/ecommerce::shipping.weight_unit'|trans({unit: shipment.weight_unit}) }}:</span>
                    <h3>{{ shipment.weight }} {{ shipment.weight_unit }}</h3>
                </td>
            </tr>
        </table>
    </div>
    <div style="padding: 5px;">
        {% if shipment.note %}
        <div style="margin-bottom: 3px; overflow-wrap: break-word;">
            <span>{{ 'plugins/ecommerce::shipping.delivery_note'|trans }}:</span>
            <strong>{{ shipment.note }}</strong>
        </div>
        {% endif %}

        {% if receiver.note %}
        <div style="margin-bottom: 3px; overflow-wrap: break-word;">
            <span>{{ 'plugins/ecommerce::shipping.customer_note'|trans }}:</span>
            <strong>{{ receiver.note }}</strong>
        </div>
        {% endif %}

        <div style="margin-top: 5px; text-align: center;">
            <p style="font-weight: bold; margin-bottom: 3px; font-size: 9px;">
                {{ 'plugins/ecommerce::shipping.shipping_label.scan_qr_code'|trans }}
            </p>
            <div>
                <img src="data:image/svg+xml;base64,{{ shipment.qr_code }}" style="max-height: 170px; width: auto; height: auto;" alt="QR code">
            </div>
        </div>
    </div>
</div>

{{ settings.footer_html }}
</body>
</html>
