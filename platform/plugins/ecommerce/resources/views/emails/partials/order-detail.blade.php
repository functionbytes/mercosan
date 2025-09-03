{{--
    Plantilla de correo de pedido rediseñada para coincidir con la identidad corporativa de Mercosan.
    Se ha ajustado la paleta de colores, añadido un espacio para el logo y el icono principal.
--}}

<style>
    /* Estilos para la legibilidad en modo oscuro y responsividad */
    body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #f8f9fa; /* Color de fondo claro */
    }
    .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
    .card {
        background-color: #ffffff;
        border: 1px solid #f1f1f1; /* Borde sutil */
        border-radius: 0.375rem; /* Bordes redondeados */
        margin: 20px 0;
    }
    .card-body {
        padding: 2rem;
    }
    .btn {
        display: inline-block;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        background-color: #d32f2f; /* Rojo corporativo */
        border: 1px solid #d32f2f;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        text-decoration: none;
    }
    .text-muted {
        color: #6c757d; /* Color de texto silenciado */
    }
    .product-row {
        padding: 1rem 0;
        border-bottom: 1px solid #f1f1f1;
    }
    .product-row:last-child {
        border-bottom: none;
    }
    .totals-row td {
        padding: 0.5rem 0;
    }
    .font-weight-bold {
        font-weight: 700;
    }
    @media (max-width: 600px) {
        .card-body {
            padding: 1.5rem;
        }
    }
</style>

<table width="100%" border="0" cellpadding="0" cellspacing="0" >
    <tr>
        <td align="center">
            <table class="container" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <table class="card" border="0" cellpadding="0" cellspacing="0" width="100%">

                            <tr>
                                <td style="padding:8px 32px 0;">
                                    @foreach(($products ?? $order->products) as $orderProduct)
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td width="76" valign="top" style="padding:16px 12px 16px 0;">
                                                    <img src="{{ RvMedia::getImageUrl($orderProduct->product_image, 'thumb') }}"
                                                         width="64" height="64" alt="{{ $orderProduct->product_name }}"
                                                         style="border-radius:6px; width:64px; height:64px; object-fit:cover;">
                                                </td>
                                                <td valign="top" style="padding:16px 0; font:400 14px/1.4 Arial,Helvetica,sans-serif; color:#212529;">
                                                    <div style="font-weight:600; text-transform:uppercase; margin-bottom:2px;">
                                                        {{ $orderProduct->product_name }}
                                                    </div>

                                                    @if ($attributes = Arr::get($orderProduct->options, 'attributes'))
                                                        <div class="muted" style="color:#6c757d; font-size:13px; margin:0;">
                                                            {{ $attributes }}
                                                        </div>
                                                    @endif

                                                    @if ($orderProduct->product_options_implode)
                                                        <div class="muted" style="color:#6c757d; font-size:13px; margin:0;">
                                                            {{ $orderProduct->product_options_implode }}
                                                        </div>
                                                    @endif

                                                    <div style="font-size:13px; margin-top:6px;">
                                                        {{ trans('plugins/ecommerce::products.form.quantity') }}:
                                                        <strong>{{ $orderProduct->qty }}</strong>
                                                    </div>
                                                </td>
                                                <td align="right" valign="middle" style="padding:16px 0 16px 12px; font:700 16px/1 Arial,Helvetica,sans-serif; color:#111;">
                                                    {{ format_price($orderProduct->price) }}
                                                </td>
                                            </tr>
                                        </table>
                                    @endforeach
                                </td>
                            </tr>

                            <!-- Totales -->
                            @if (!$order->dont_show_order_info_in_product_list)
                                <tr>
                                    <td style="padding:8px 32px 0;">
                                        <table role="presentation" width="100%" >

                                            @if ($order->sub_total != $order->amount)
                                                <tr><td colspan="2" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td></tr>
                                                <tr>
                                                    <td style="font:400 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ trans('plugins/ecommerce::products.form.sub_total') }}</td>
                                                    <td align="right" style="font:600 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ format_price($order->sub_total) }}</td>
                                                </tr>
                                            @endif

                                            @if ((float)$order->shipping_amount)
                                                <tr>
                                                    <td style="font:400 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ trans('plugins/ecommerce::products.form.shipping_fee') }}</td>
                                                    <td align="right" style="font:600 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ format_price($order->shipping_amount) }}</td>
                                                </tr>
                                            @endif

                                            @if ((float)$order->tax_amount)
                                                <tr>
                                                    <td style="font:400 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ trans('plugins/ecommerce::products.form.tax') }}</td>
                                                    <td align="right" style="font:600 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ format_price($order->tax_amount) }}</td>
                                                </tr>
                                            @endif

                                            @if ((float)$order->discount_amount)
                                                <tr>
                                                    <td style="font:400 14px/1.8 Arial,Helvetica,sans-serif; color:#198754;">{{ trans('plugins/ecommerce::products.form.discount') }}</td>
                                                    <td align="right" style="font:700 14px/1.8 Arial,Helvetica,sans-serif; color:#198754;">-{{ format_price($order->discount_amount) }}</td>
                                                </tr>
                                            @endif

                                            @if ((float)$order->payment_fee)
                                                <tr>
                                                    <td style="font:400 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ trans('plugins/payment::payment.payment_fee') }}</td>
                                                    <td align="right" style="font:600 14px/1.8 Arial,Helvetica,sans-serif; color:#212529;">{{ format_price($order->payment_fee) }}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class="hr" style="padding:8px 0;">
                                                        <div style="border-top:1px solid #f1f1f1; line-height:0; height:0;">&nbsp;</div>
                                                    </td>
                                                </tr>
                                            @endif

                                            <tr>
                                                <td style="font:700 18px/1.6 Arial,Helvetica,sans-serif; color:#111;">{{ trans('plugins/ecommerce::products.form.total') }}</td>
                                                <td align="right" style="font:700 18px/1.6 Arial,Helvetica,sans-serif; color:#111;">{{ format_price($order->amount) }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            @endif
                        </table>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
