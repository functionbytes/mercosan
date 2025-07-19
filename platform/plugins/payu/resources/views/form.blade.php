<!DOCTYPE html>
<html>
<head>
    <title>Redirigiendo a PayU...</title>
</head>
<body>
<p>Serás redirigido a la pasarela de pagos de PayU en unos segundos...</p>

<form id="payu_form" action="{{ $action }}" method="post">
    @foreach ($data as $key => $value)
        <input name="{{ $key }}" type="hidden" value="{{ $value }}">
    @endforeach
    <input type="submit" value="Continuar a PayU">
</form>

</body>
</html>
