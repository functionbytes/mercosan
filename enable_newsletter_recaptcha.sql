-- Habilitar reCAPTCHA específicamente para el newsletter popup
-- Este script debe ejecutarse en MySQL (no SQLite)

INSERT INTO settings (`key`, `value`, `created_at`, `updated_at`) VALUES 
('enable_captcha', '1', NOW(), NOW()),
('captcha_type', 'v2', NOW(), NOW()),
('enable_recaptcha_botble_newsletter_forms_fronts_newsletter_form', '1', NOW(), NOW()),
-- Claves de reCAPTCHA (debes configurar las tuyas)
('captcha_site_key', 'TU_SITE_KEY_AQUI', NOW(), NOW()),
('captcha_secret', 'TU_SECRET_KEY_AQUI', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `value` = VALUES(`value`),
  `updated_at` = NOW();

-- Verificar configuración
-- SELECT `key`, `value` FROM settings WHERE `key` LIKE '%captcha%' OR `key` LIKE '%recaptcha%';