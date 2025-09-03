-- Activar popup del newsletter
INSERT INTO settings (`key`, `value`, `created_at`, `updated_at`) VALUES 
('newsletter_popup_enable', '1', NOW(), NOW()),
('newsletter_popup_title', '¡Suscríbete a nuestro Boletín!', NOW(), NOW()),
('newsletter_popup_subtitle', 'Obtén las últimas noticias y ofertas especiales', NOW(), NOW()),
('newsletter_popup_description', 'Mantente informado con nuestras últimas actualizaciones, promociones exclusivas y contenido valioso directamente en tu bandeja de entrada.', NOW(), NOW()),
('newsletter_popup_delay', '3', NOW(), NOW()),
('newsletter_popup_display_pages', '["public.index","all"]', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `value` = VALUES(`value`),
  `updated_at` = NOW();