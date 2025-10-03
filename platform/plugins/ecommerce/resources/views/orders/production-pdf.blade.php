<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Orden de Producción - {{ $order->code }}</title>

    <style>
        @page {
            size: 80mm auto;
            margin: 0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', 'Arial', sans-serif;
            font-size: 9pt;
            width: 80mm;
            padding: 5mm;
            margin: 0 auto;
            line-height: 1.3;
        }

        .header {
            text-align: center;
            margin-bottom: 5mm;
            border-bottom: 1px dashed #000;
            padding-bottom: 3mm;
        }

        .logo {
            max-width: 40mm;
            height: auto;
            margin-bottom: 2mm;
        }

        .title {
            font-size: 12pt;
            font-weight: bold;
            margin: 2mm 0;
        }

        .section {
            margin-bottom: 4mm;
            padding-bottom: 3mm;
            border-bottom: 1px dashed #ccc;
        }

        .section:last-child {
            border-bottom: none;
        }

        .section-title {
            font-size: 8pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 2mm;
            letter-spacing: 0.3pt;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1mm;
            font-size: 8pt;
        }

        .info-label {
            font-weight: bold;
        }

        .product-item {
            margin-bottom: 3mm;
            padding-bottom: 2mm;
            border-bottom: 1px dotted #ddd;
        }

        .product-item:last-child {
            border-bottom: none;
        }

        .product-name {
            font-weight: bold;
            font-size: 9pt;
            margin-bottom: 1mm;
        }

        .product-qty {
            font-size: 10pt;
            font-weight: bold;
            text-align: right;
            margin-top: 1mm;
        }

        .product-options {
            font-size: 8pt;
            color: #333;
            margin-left: 2mm;
            margin-top: 1mm;
        }

        .product-option {
            margin-bottom: 0.5mm;
        }

        .footer {
            text-align: center;
            margin-top: 5mm;
            padding-top: 3mm;
            border-top: 1px dashed #000;
            font-size: 7pt;
        }

        strong, b {
            font-weight: bold;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>

<!-- HEADER -->
<div class="header">
    @if($logo && $logoFullPath)
        <img src="{{ $logoFullPath }}" class="logo" alt="Logo">
    @endif
    <div class="title">ORDEN DE PRODUCCIÓN</div>
    <div style="font-size: 10pt; font-weight: bold;">{{ $order->code }}</div>
    <div style="font-size: 8pt; margin-top: 2mm;">{{ $order->created_at->format('d/m/Y H:i') }}</div>
</div>

<!-- INFORMACIÓN DE LA ORDEN -->
<div class="section">
    <div class="section-title">Información del Pedido</div>
    <div class="info-row">
        <span class="info-label">Orden:</span>
        <span>{{ $order->code }}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Estado:</span>
        <span>{{ $order->status->label() }}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Cliente:</span>
        <span>{{ $order->user->name ?: ($order->shippingAddress->name ?? 'N/A') }}</span>
    </div>


    <div class="info-row">
        <span class="info-label">Fecha entrega:</span>
        <span>@if($order->delivery_date)
                {{ $order->delivery_date->format('d/m/Y') }}
            @else
                N/A
            @endif
        </span>
    </div>

    <div class="info-row">
        <span class="info-label">Hora entrega:</span>
        <span>
            @if($order->delivery_time)
                {{ $order->delivery_time }}
            @else
                N/A
            @endif
        </span>
    </div>
    <div class="info-row">
        <span class="info-label">Dirección:</span>
        <span>@if($order->shippingAddress)
                @if($order->shippingAddress->address)
                    {{ $order->shippingAddress->address }}
                @endif
                @if($order->shippingAddress->city || $order->shippingAddress->state)

                    {{ $order->shippingAddress->city }}
                    @if($order->shippingAddress->city && $order->shippingAddress->state), @endif
                    {{ $order->shippingAddress->state }}

                @endif
                @if($order->shippingAddress->zip_code)
                    {{ $order->shippingAddress->zip_code }}ajustar
                @endif
            @endif</span>
    </div>


</div>

<!-- PRODUCTOS -->
<div class="section">
    <div class="section-title">Productos Solicitados ({{ $order->products->count() }})</div>
    <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
        @foreach($order->products as $index => $orderProduct)
            @php
                $hasOptions = false;
                $allOptions = [];

                // Recopilar atributos
                if (!empty($orderProduct->options['attributes'])) {
                    $allOptions[] = ['label' => 'Atributos', 'value' => $orderProduct->options['attributes']];
                    $hasOptions = true;
                }

                // Recopilar options
                if (!empty($orderProduct->options['options']) && is_array($orderProduct->options['options'])) {
                    foreach ($orderProduct->options['options'] as $option) {
                        if (!empty($option['name']) && !empty($option['value'])) {
                            $allOptions[] = ['label' => $option['name'], 'value' => $option['value']];
                            $hasOptions = true;
                        }
                    }
                }

                // Recopilar product_options
                if (!empty($orderProduct->product_options) && is_array($orderProduct->product_options)) {
                    foreach ($orderProduct->product_options as $option) {
                        if (!empty($option['name']) && !empty($option['value'])) {
                            $allOptions[] = ['label' => $option['name'], 'value' => $option['value']];
                            $hasOptions = true;
                        }
                    }
                }
            @endphp
            <tr >
                <td style="padding: 2mm 0; vertical-align: top; width: 75%;">
                    <div style="font-weight: bold; font-size: 9pt; margin-bottom: 1mm;">
                        {{ $index + 1 }}. {{ $orderProduct->product_name }}
                    </div>
                    @if($hasOptions)
                        <div style="font-size: 7pt; color: #555; line-height: 1.3;">
                            @foreach($allOptions as $option)
                                <div>• {{ $option['label'] }}: {{ $option['value'] }}</div>
                            @endforeach
                        </div>
                    @endif
                </td>
                <td style="padding: 2mm 0; vertical-align: top; text-align: right; width: 25%;">
                    <div style="font-size: 11pt; font-weight: bold;">
                        {{ $orderProduct->qty }}
                    </div>
                </td>
            </tr>
        @endforeach
    </table>
</div>

<!-- OBSERVACIONES DEL AGENTE -->
@if($order->private_notes)
    <div class="">
        <div class="section-title">Observaciones</div>
        <div>
                {{ $order->private_notes }}
        </div>
    </div>
@endif
<!-- FOOTER -->
<div class="footer">
    <div>Documento generado: {{ now()->format('d/m/Y H:i') }}</div>
</div>


</body>
</html>
