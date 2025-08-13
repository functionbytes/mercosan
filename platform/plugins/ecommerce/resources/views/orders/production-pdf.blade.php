<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Orden de Producción - {{ $order->code }}</title>

    <style>
        body {
            font-size: 15px;
            font-family: 'DejaVu Sans', Arial, sans-serif !important;
            position: relative;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        table tr td {
            padding: 0;
        }

        table tr td:last-child {
            text-align: right;
        }

        .bold, strong, b, .total, .stamp {
            font-weight: 700;
        }

        .right {
            text-align: right;
        }

        .large {
            font-size: 1.75em;
        }

        .total {
            color: #fb7578;
        }

        .large.total img {
            width: 14px;
        }

        .logo-container {
            margin: 20px 0 50px;
        }

        .invoice-info-container {
            font-size: .875em;
        }

        .invoice-info-container td {
            padding: 4px 0;
        }

        .line-items-container {
            font-size: .875em;
            margin: 70px 0;
        }

        .line-items-container th {
            border-bottom: 2px solid #ddd;
            color: #999;
            font-size: .75em;
            padding: 10px 0 15px;
            text-align: left;
            text-transform: uppercase;
        }

        .line-items-container th:last-child {
            text-align: right;
        }

        .line-items-container td {
            padding: 10px 0;
        }

        .line-items-container tbody tr:first-child td {
            padding-top: 25px;
        }

        .line-items-container.has-bottom-border tbody tr:last-child td {
            border-bottom: 2px solid #ddd;
            padding-bottom: 25px;
        }

        .line-items-container th.heading-quantity {
            width: 50px;
        }

        .line-items-container th.heading-price {
            text-align: right;
            width: 100px;
        }

        .line-items-container th.heading-subtotal {
            width: 100px;
        }

        .invoice-customer-container {
            padding: 10px;
            background: #fff5f5;
            --bs-border-opacity: 1;
            border-color: #fb0000;
            margin-bottom: 20px;
        }

        .invoice-private-container {
            padding: 10px;
            background: #efefef;
            --bs-border-opacity: 1;
            border-color:  #000;
        }

        .payment-info {
            font-size: .875em;
            line-height: 1.5;
            width: 38%
        }

        small {
            font-size: 80%;
        }

        .stamp {
            border: 2px solid #555;
            color: #555;
            display: inline-block;
            font-size: 18px;
            line-height: 1;
            opacity: .5;
            padding: .3rem .75rem;
            position: fixed;
            text-transform: uppercase;
            top: 40%;
            left: 40%;
            transform: rotate(-14deg);
        }

        .is-failed {
            border-color: #d23;
            color: #d23;
        }

        .is-completed {
            border-color: #0a9928;
            color: #0a9928;
        }
    </style>
</head>
<body>

<table class="invoice-info-container">
    <tr>
        <td>
            <div class="logo-container">
                @if($logo && $logoFullPath)
                    <img src="{{ $logoFullPath }}" style="width:100%; max-width:150px; margin-bottom: 15px;" alt="Logo">
                @endif
            </div>
        </td>
        <td>
            <p>
                <strong>{{ $order->created_at->format('F d, Y') }}</strong>
            </p>
            <p>
                <strong style="display: inline-block">Orden: </strong>
                <span style="display: inline-block">{{ $order->code }}</span>
            </p>
        </td>
    </tr>
</table>

<table class="invoice-info-container">
    <tr>
        <td>
            <p><strong>DATOS DE PRODUCCIÓN</strong></p>
            <p>Orden: {{ $order->code }}</p>
            <p>Fecha: {{ $order->created_at->format('d/m/Y') }}</p>
            <p>Estado: {{ $order->status->label() }}</p>
        </td>
        <td>
            <p><strong>{{ $order->user->name ?: ($order->shippingAddress->name ?? 'Cliente') }}</strong></p>
            @if($order->user->email ?: $order->shippingAddress->email)
                <p>{{ $order->user->email ?: $order->shippingAddress->email }}</p>
            @endif
            @if($order->user->phone ?: $order->shippingAddress->phone)
                <p>{{ $order->user->phone ?: $order->shippingAddress->phone }}</p>
            @endif
        </td>
    </tr>
</table>


<table class="line-items-container">
    <thead>
    <tr>
        <th class="heading-description">Producto</th>
        <th class="heading-description">Características/Opciones</th>
        <th class="heading-quantity">Cantidad</th>
    </tr>
    </thead>
    <tbody>
    @foreach($order->products as $orderProduct)
        <tr>
            <td>{{ $orderProduct->product_name }}</td>
            <td>
                @if($orderProduct->options && isset($orderProduct->options['attributes']) && $orderProduct->options['attributes'])
                    <div><small>Atributos: {{ $orderProduct->options['attributes'] }}</small></div>
                @endif
                @if($orderProduct->options && isset($orderProduct->options['options']) && is_array($orderProduct->options['options']))
                    @foreach($orderProduct->options['options'] as $option)
                        <div><small>{{ $option['name'] ?? '' }}: {{ $option['value'] ?? '' }}</small></div>
                    @endforeach
                @endif
                @if($orderProduct->product_options && is_array($orderProduct->product_options))
                    @foreach($orderProduct->product_options as $option)
                        <div><small>{{ $option['name'] ?? '' }}: {{ $option['value'] ?? '' }}</small></div>
                    @endforeach
                @endif
            </td>
            <td class="bold">{{ $orderProduct->qty }}</td>
        </tr>
    @endforeach
    </tbody>
</table>


@if($order->description)
    <table class="invoice-customer-container">
        <tr style="text-align: left">
            <td style="text-align: left">
                <p><strong>Observaciones del Cliente:</strong> {{ $order->description }}</p>
            </td>
        </tr>
    </table>
@endif

@if($order->private_notes)
    <table class="invoice-private-container">
        <tr style="text-align: left">
            <td style="text-align: left;">
                <p><strong>🔒 NOTAS INTERNAS DE PRODUCCIÓN:</strong> {{ $order->private_notes }}</p>
            </td>
        </tr>
    </table>
@endif


</body>
</html>
