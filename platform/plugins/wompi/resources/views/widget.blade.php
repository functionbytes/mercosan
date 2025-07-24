{{-- resources/views/plugins/wompi/widget.blade.php --}}
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ __('Procesando Pago') }} - {{ theme_option('site_title') }}</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .payment-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .payment-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            max-width: 600px;
            width: 100%;
        }
        .payment-header {
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        .payment-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        .payment-body {
            padding: 2rem;
        }
        .payment-summary {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        .amount-display {
            font-size: 2rem;
            font-weight: bold;
            color: #2c3e50;
        }
        .wompi-form {
            text-align: center;
            padding: 2rem 0;
            min-height: 100px;
        }
        .back-button, .fallback-button {
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 10px 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 5px;
        }
        .back-button:hover, .fallback-button:hover {
            background: #5a6268;
            transform: translateY(-1px);
        }
        .fallback-button {
            background: linear-gradient(135deg, #28a745, #20c997);
        }
        .fallback-button:hover {
            background: linear-gradient(135deg, #1e7e34, #1a9b84);
        }
        .payment-instructions {
            background: #e7f3ff;
            border: 1px solid #b8daff;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 2rem;
            color: #004085;
        }
        .security-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
            color: #6c757d;
            font-size: 0.9rem;
        }
        .security-badges {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .loading-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 20px;
            color: #6c757d;
        }
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .error-message {
            display: none;
            background: #f8d7da;
            color: #721c24;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1rem 0;
            border-left: 4px solid #dc3545;
        }
        .widget-status {
            text-align: center;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: #6c757d;
        }
    </style>
</head>
<body>
<div class="payment-container">
    <div class="payment-card">

        <div class="payment-header">
            <div class="payment-icon">
                <i class="fas fa-credit-card"></i>
            </div>
            <h2 class="mb-0">{{ __('Pago Seguro con Wompi') }}</h2>
            <p class="mb-0 opacity-75">{{ __('Procesa tu pago de forma segura') }}</p>
        </div>

        <div class="payment-body">
            <!-- Resumen del pago -->
            <div class="payment-summary">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="mb-2">{{ __('Referencia de Pedido') }}</h6>
                        <p class="mb-0 text-muted">{{ $widgetData['reference'] }}</p>
                        <small class="text-muted">{{ __('Guarda esta referencia para futuras consultas') }}</small>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <h6 class="mb-2">{{ __('Total a Pagar') }}</h6>
                        <div class="amount-display">
                            @if($originalCurrency !== 'COP')
                                {{ number_format($originalAmount, 2) }} {{ $originalCurrency }}
                                <small class="text-muted d-block" style="font-size: 0.8rem;">
                                    ≈ {{ number_format($widgetData['amount_in_cents'] / 100, 0) }} COP
                                </small>
                            @else
                                ${{ number_format($widgetData['amount_in_cents'] / 100, 0) }} COP
                            @endif
                        </div>
                        @if(isset($widgetData['tax_in_cents']) && $widgetData['tax_in_cents']['vat'] > 0)
                            <small class="text-muted">
                                {{ __('Incluye IVA') }}: ${{ number_format($widgetData['tax_in_cents']['vat'] / 100, 0) }} COP
                            </small>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Instrucciones de pago -->
            <div class="payment-instructions">
                <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>{{ __('Instrucciones de Pago') }}</strong>
                </div>
                <p class="mb-2">{{ __('Al hacer clic en "Pagar con Wompi" serás redirigido a la plataforma segura de pago.') }}</p>
                <small class="text-muted">
                    {{ __('Podrás pagar con tarjeta de crédito, débito, PSE o Nequi.') }}
                </small>
            </div>

            <!-- Loading indicator -->
            <div id="loading-indicator" class="loading-indicator">
                <div class="loading-spinner"></div>
                <span>{{ __('Cargando formulario de pago...') }}</span>
            </div>

            <!-- Widget status -->
            <div id="widget-status" class="widget-status" style="display: none;"></div>

            <!-- Error message -->
            <div id="error-message" class="error-message">
                <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>{{ __('Error al cargar el widget de pago') }}</strong>
                </div>
                <p id="error-details" class="mb-3"></p>
                <div class="text-center">
                    <button onclick="location.reload()" class="fallback-button">
                        <i class="fas fa-redo me-2"></i>
                        {{ __('Recargar Página') }}
                    </button>
                    <button onclick="redirectToDirectCheckout()" class="fallback-button">
                        <i class="fas fa-external-link-alt me-2"></i>
                        {{ __('Pago Directo') }}
                    </button>
                </div>
            </div>

            <!-- Widget de Wompi -->
            <div id="wompi-form-container" class="wompi-form" style="display: none;">
                <form id="formWompi">

                    {{-- Solo la parte del script del widget que necesita cambios --}}
                    <script
                        id="wompi-widget-script"
                        src="{{ $widgetData['is_sandbox'] ? 'https://checkout.wompi.co/widget.js' : 'https://checkout.wompi.co/widget.js' }}"
                        data-render="button"
                        data-public-key="{{ $widgetData['public_key'] }}"
                        data-currency="{{ $widgetData['currency'] }}"
                        data-amount-in-cents="{{ $widgetData['amount_in_cents'] }}"
                        data-reference="{{ $widgetData['reference'] }}"
                        data-redirect-url="{{ $widgetData['redirect_url'] }}"
                        @if(isset($widgetData['signature_integrity']))
                            data-signature-integrity="{{ $widgetData['signature_integrity'] }}"
                        @endif
                        @if(isset($widgetData['customer_data']['email']))
                            data-customer-data:email="{{ $widgetData['customer_data']['email'] }}"
                        @endif
                        @if(isset($widgetData['customer_data']['full_name']) && $widgetData['customer_data']['full_name'])
                            data-customer-data:full-name="{{ $widgetData['customer_data']['full_name'] }}"
                        @endif
                        {{-- Usar formato separado de teléfono --}}
                        @if(isset($widgetData['customer_data']['phone_number']) && isset($widgetData['customer_data']['phone_number_prefix']))
                            data-customer-data:phone-number="{{ $widgetData['customer_data']['phone_number'] }}"
                        data-customer-data:phone-number-prefix="{{ $widgetData['customer_data']['phone_number_prefix'] }}"
                        @endif
                        {{-- Solo incluir impuestos si están definidos y son mayores a 0 --}}
                        @if(isset($widgetData['tax_in_cents']['vat']) && $widgetData['tax_in_cents']['vat'] > 0)
                            data-tax-in-cents:vat="{{ $widgetData['tax_in_cents']['vat'] }}"
                        @if($widgetData['tax_in_cents']['consumption'] > 0)
                            data-tax-in-cents:consumption="{{ $widgetData['tax_in_cents']['consumption'] }}"
                        @endif
                        @endif
                        {{-- Solo incluir dirección si TODOS los campos requeridos están presentes --}}
                        @if(isset($widgetData['shipping_address']) && isset($widgetData['shipping_address']['address_line_1']))
                            data-shipping-address:address-line-1="{{ $widgetData['shipping_address']['address_line_1'] }}"
                        data-shipping-address:city="{{ $widgetData['shipping_address']['city'] }}"
                        data-shipping-address:region="{{ $widgetData['shipping_address']['region'] }}"
                        data-shipping-address:country="{{ $widgetData['shipping_address']['country'] }}"
                        @if(isset($widgetData['shipping_address']['phone_number']) && isset($widgetData['shipping_address']['phone_number_prefix']))
                            data-shipping-address:phone-number="{{ $widgetData['shipping_address']['phone_number'] }}"
                        data-shipping-address:phone-number-prefix="{{ $widgetData['shipping_address']['phone_number_prefix'] }}"
                        @endif
                        @endif>
                    </script>

                </form>

                <button onclick="window.history.back()" class="back-button">
                    <i class="fas fa-arrow-left me-2"></i>
                    {{ __('Volver al Carrito') }}
                </button>
            </div>

            <!-- Información de seguridad -->
            <div class="security-info">
                <div class="security-badges">
                    <i class="fas fa-shield-alt text-success"></i>
                    <span>{{ __('Pago 100% Seguro') }}</span>
                </div>
                <div class="security-badges">
                    <i class="fas fa-lock text-primary"></i>
                    <span>{{ __('Conexión Encriptada') }}</span>
                </div>
                <div class="security-badges">
                    <i class="fas fa-certificate text-warning"></i>
                    <span>{{ __('Certificado SSL') }}</span>
                </div>
            </div>

            @if(app()->environment('local'))
                <!-- Debug info (solo en desarrollo) -->
                <div class="mt-4 p-3" style="background: #f8f9fa; border-radius: 10px; font-size: 0.85rem;">
                    <strong>{{ __('Debug Info') }} (Solo en desarrollo):</strong><br>
                    <strong>Entorno:</strong> {{ $widgetData['is_sandbox'] ? 'Sandbox' : 'Producción' }}<br>
                    <strong>Public Key:</strong> {{ substr($widgetData['public_key'], 0, 20) }}...<br>
                    <strong>Referencia:</strong> {{ $widgetData['reference'] }}<br>
                    <strong>Monto (centavos):</strong> {{ $widgetData['amount_in_cents'] }}<br>
                    <strong>Moneda:</strong> {{ $widgetData['currency'] }}<br>
                    <strong>Email:</strong> {{ $widgetData['customer_data']['email'] ?? 'N/A' }}<br>
                    @if(isset($widgetData['customer_data']['phone_number']) && isset($widgetData['customer_data']['phone_number_prefix']))
                        <strong>Teléfono:</strong> {{ $widgetData['customer_data']['phone_number_prefix'] }} {{ $widgetData['customer_data']['phone_number'] }}<br>
                    @else
                        <strong>Teléfono:</strong> No disponible<br>
                    @endif
                    @if(isset($widgetData['tax_in_cents']))
                        <strong>IVA (centavos):</strong> {{ $widgetData['tax_in_cents']['vat'] ?? 'N/A' }}<br>
                    @else
                        <strong>IVA:</strong> No incluido<br>
                    @endif
                    <strong>URL Redirect:</strong> {{ $widgetData['redirect_url'] }}
                </div>
            @endif

        </div>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // Configuración
    const widgetConfig = @json($widgetData);
    let widgetCheckInterval;
    let widgetDetected = false;

    console.log('Wompi Widget initialized with config:', widgetConfig);

    function showLoading() {
        document.getElementById('loading-indicator').style.display = 'flex';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('wompi-form-container').style.display = 'none';
        document.getElementById('widget-status').style.display = 'none';
    }

    function showError(message, details = '') {
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('wompi-form-container').style.display = 'none';
        document.getElementById('widget-status').style.display = 'none';
        document.getElementById('error-details').innerHTML = details || message;
    }

    function showWidget() {
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('wompi-form-container').style.display = 'block';
        document.getElementById('widget-status').style.display = 'block';
        document.getElementById('widget-status').innerHTML = '<i class="fas fa-check-circle text-success"></i> Widget cargado correctamente';
    }

    function showStatus(message, type = 'info') {
        const statusEl = document.getElementById('widget-status');
        statusEl.style.display = 'block';
        const iconClass = type === 'success' ? 'fas fa-check-circle text-success' :
            type === 'error' ? 'fas fa-times-circle text-danger' :
                'fas fa-info-circle text-info';
        statusEl.innerHTML = `<i class="${iconClass}"></i> ${message}`;
    }

    function checkWidgetLoaded() {
        // Buscar indicadores de que el widget se cargó
        const indicators = [
            document.querySelector('button[data-wompi-id]'),
            document.querySelector('.wompi-button'),
            document.querySelector('[class*="wompi"]'),
            document.querySelector('iframe[src*="wompi"]'),
            document.querySelector('[data-wompi-id]'),
            document.querySelector('form button[type="submit"]')
        ];

        const widgetFound = indicators.some(indicator => indicator !== null);

        if (widgetFound && !widgetDetected) {
            console.log('Wompi widget detected successfully');
            widgetDetected = true;
            showWidget();
            clearInterval(widgetCheckInterval);
            return true;
        }

        return false;
    }

    function startWidgetDetection() {
        showStatus('Detectando widget de Wompi...', 'info');

        let checkCount = 0;
        const maxChecks = 20; // 10 segundos máximo (500ms * 20)

        widgetCheckInterval = setInterval(() => {
            checkCount++;

            if (checkWidgetLoaded()) {
                return; // Widget encontrado, interval limpio
            }

            if (checkCount >= maxChecks) {
                console.warn('Widget detection timeout after 10 seconds');
                clearInterval(widgetCheckInterval);
                showError(
                    'El widget de Wompi no se detectó correctamente',
                    'El script se cargó pero el botón de pago no apareció. Puedes recargar la página o usar el pago directo.'
                );
            }
        }, 500);
    }

    function redirectToDirectCheckout() {
        console.log('Redirecting to direct checkout...');

        // Crear formulario para POST directo a Wompi
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = widgetConfig.is_sandbox
            ? 'https://checkout.sandbox.wompi.co/p'
            : 'https://checkout.wompi.co/p';

        const formData = {
            'public-key': widgetConfig.public_key,
            'currency': widgetConfig.currency,
            'amount-in-cents': widgetConfig.amount_in_cents,
            'reference': widgetConfig.reference,
            'signature:integrity': widgetConfig.signature_integrity,
            'redirect-url': widgetConfig.redirect_url,
            'customer-data:email': widgetConfig.customer_data.email
        };

        // Solo agregar impuestos si existen y son válidos
        if (widgetConfig.tax_in_cents && widgetConfig.tax_in_cents.vat > 0) {
            formData['tax-in-cents:vat'] = widgetConfig.tax_in_cents.vat;
            if (widgetConfig.tax_in_cents.consumption > 0) {
                formData['tax-in-cents:consumption'] = widgetConfig.tax_in_cents.consumption;
            }
        }

        // Solo agregar datos que existan
        for (const [key, value] of Object.entries(formData)) {
            if (value !== null && value !== undefined && value !== '') {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
        }

        console.log('Form data for direct checkout:', formData);
        document.body.appendChild(form);
        form.submit();
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, starting widget detection...');

        showLoading();

        // Esperar un poco para que el script de Wompi se ejecute
        setTimeout(() => {
            startWidgetDetection();
        }, 2000);

        // Fallback después de 15 segundos
        setTimeout(() => {
            if (!widgetDetected && document.getElementById('loading-indicator').style.display !== 'none') {
                console.log('Auto-fallback to error state after 15 seconds');
                showError(
                    'El widget de pago tardó demasiado en cargar',
                    'Puedes recargar la página o usar el pago directo para continuar con tu compra.'
                );
            }
        }, 15000);
    });

    // Manejar errores del script
    window.addEventListener('error', function(e) {
        if (e.message && (e.message.includes('wompi') || e.message.includes('checkout'))) {
            console.error('Wompi script error:', e);
            clearInterval(widgetCheckInterval);
            showError(
                'Error en el script de Wompi',
                'Hubo un problema técnico. Puedes recargar la página o usar el pago directo.'
            );
        }
    });

    // Auto-redirect después de 20 minutos por seguridad
    setTimeout(() => {
        if (confirm('La sesión de pago ha expirado. ¿Deseas volver al carrito?')) {
            window.history.back();
        }
    }, 1200000); // 20 minutos

    // Debug: Mostrar información en consola
    setTimeout(() => {
        console.log('Widget check summary:', {
            detected: widgetDetected,
            formElements: document.querySelectorAll('#formWompi *').length,
            buttonsFound: document.querySelectorAll('button').length,
            wompiElements: document.querySelectorAll('[data-wompi-id], [class*="wompi"], button[data-wompi-id]').length,
            taxIncluded: widgetConfig.tax_in_cents ? widgetConfig.tax_in_cents.vat : 'No tax'
        });
    }, 5000);
</script>
</body>
</html>
