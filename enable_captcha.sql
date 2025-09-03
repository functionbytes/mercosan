-- Script SQL para habilitar el plugin CAPTCHA y configurarlo

-- Insertar o actualizar plugin CAPTCHA en la tabla plugins (si existe)
INSERT OR IGNORE INTO plugins (name, status, created_at, updated_at) 
VALUES ('captcha', 1, datetime('now'), datetime('now'));

UPDATE plugins 
SET status = 1, updated_at = datetime('now') 
WHERE name = 'captcha';

-- Insertar configuraciones básicas de CAPTCHA
INSERT OR REPLACE INTO settings (key, value, created_at, updated_at) VALUES 
('enable_captcha', '1', datetime('now'), datetime('now')),
('captcha_type', 'v3', datetime('now'), datetime('now')),
('captcha_site_key', '', datetime('now'), datetime('now')),
('captcha_secret', '', datetime('now'), datetime('now')),
('captcha_hide_badge', '0', datetime('now'), datetime('now')),
('enable_recaptcha_botble_newsletter_forms_fronts_newsletter_form', '1', datetime('now'), datetime('now'));

-- Verificar que se insertaron correctamente
SELECT key, value FROM settings WHERE key LIKE '%captcha%' OR key LIKE '%recaptcha%';