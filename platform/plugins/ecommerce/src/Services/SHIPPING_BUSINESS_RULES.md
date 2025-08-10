# Reglas de Negocio para Métodos de Envío

## Descripción General

Este sistema implementa 3 tipos de métodos de envío con reglas de negocio específicas:

### 1. Recoger en tienda
- **Disponibilidad**: Siempre disponible para cualquier pedido
- **Posición**: Debe aparecer siempre y mostrarse primero en la lista
- **Precio**: Gratis (0)

### 2. Domicilio (de pago)
- **Disponibilidad**: Solo disponible si el total del carrito es menor al umbral de envío gratis
- **Condiciones**:
  - Validar si existe una regla de envío aplicable a la ciudad seleccionada
  - Si hay una regla válida, mostrar el método "Domicilio" con el precio definido en esa regla
  - Si no hay regla válida, no mostrar "Domicilio", solo "Recoger en tienda"

### 3. Domicilio (gratuito)
- **Disponibilidad**: Disponible cuando:
  - El total del carrito es mayor o igual al umbral de envío gratis, o
  - Existe una regla de envío que otorga envío gratuito para la ciudad/dirección del cliente
- **Visualización**: Se muestra con precio 0 y con el nombre "Domicilio (Gratis)"

## Reglas Generales

1. **Lista completa**: Siempre retornar la lista completa de métodos disponibles, sin ocultar ninguno por estar seleccionado
2. **Selección**: Marcar el método seleccionado únicamente con un indicador (`is_selected`), pero no filtrar la lista
3. **Ordenamiento por prioridad**:
   1. Recoger en tienda (prioridad 1)
   2. Domicilio (Gratis) (prioridad 2)
   3. Domicilio (de pago) (prioridad 3)

## Casos de Uso

### ✅ Casos Cubiertos

1. **Total ≥ umbral de envío gratis** → "Recoger en tienda" + "Domicilio (Gratis)"
2. **Total < umbral + regla válida con precio** → "Recoger en tienda" + "Domicilio" (precio de la regla)
3. **Total < umbral + regla válida con envío gratis** → "Recoger en tienda" + "Domicilio (Gratis)"
4. **Total < umbral + sin regla válida** → solo "Recoger en tienda"

## Configuración

### Umbral de Envío Gratis
- Configuración: `get_ecommerce_setting('free_shipping_threshold', 200000)`
- Ubicación: Admin → E-commerce → Settings → Checkout
- Por defecto: $200,000

### Reglas de Envío
- Ubicación: Admin → E-commerce → Settings → Shipping
- Tipos soportados:
  - Basado en ubicación (ciudad/estado)
  - Basado en precio del pedido
  - Basado en peso del pedido
  - Basado en código postal

## Archivos Involucrados

- **Servicio Principal**: `ShippingMethodsBusinessRulesService.php`
- **Integración**: `HandleShippingFeeService.php`
- **Controlador**: `PublicUpdateCheckoutController.php`
- **Traducciones**: `resources/lang/es/shipping.php`

## Testing

Para probar las reglas de negocio:

1. Configurar umbral de envío gratis
2. Crear reglas de envío con diferentes precios
3. Probar con diferentes totales de pedido
4. Verificar ciudades con y sin reglas específicas