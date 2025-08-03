-- Script SQL para actualizar configuración de checkout
-- Usar REPLACE INTO para asegurar que se actualicen los valores
REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_load_countries_states_cities_from_location_plugin', '1', NOW(), NOW());

REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_use_city_field_as_field_text', '0', NOW(), NOW());

REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_default_country_at_checkout_page', 'CO', NOW(), NOW());

REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_filter_cities_by_state', '1', NOW(), NOW());

REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_default_state_for_city_filter', '28', NOW(), NOW());

REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('ecommerce_selected_cities_for_checkout', '[]', NOW(), NOW());

-- Verificar que las ciudades de Santander existen
SELECT 'Ciudades en Santander:' as info;
SELECT COUNT(*) as total_cities, 
       SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as active_cities
FROM location_cities WHERE state_id = 28;

-- Mostrar algunas ciudades de ejemplo
SELECT 'Ejemplos de ciudades activas en Santander:' as info;
SELECT id, name, status FROM location_cities 
WHERE state_id = 28 AND status = 'published' 
ORDER BY name LIMIT 10;

-- Mostrar configuraciones actualizadas
SELECT 'Configuraciones actualizadas:' as info;
SELECT key, value FROM settings WHERE key LIKE 'ecommerce_%' AND key IN (
    'ecommerce_load_countries_states_cities_from_location_plugin',
    'ecommerce_use_city_field_as_field_text', 
    'ecommerce_default_country_at_checkout_page',
    'ecommerce_filter_cities_by_state',
    'ecommerce_default_state_for_city_filter'
);