# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-07

### Added

#### Core Features
- Complete Admin Panel package for Laravel
- RESTful API endpoints for all resources
- Comprehensive documentation (README.md and INSTALL.md)

#### Pages Management
- Full CRUD operations for pages
- Page status management (published, draft, pending)
- Featured pages support
- Template system
- Search and filtering
- Bulk operations

#### User Management (ACL)
- User CRUD operations
- User profile management
- Password change functionality
- Avatar support
- Super user management
- User activation system
- User metadata storage

#### Role & Permission System
- Role CRUD operations
- Granular permission system
- Role duplication
- Default role support
- User-role assignment
- Permission categories:
  - Pages
  - Users
  - Roles
  - Settings
  - Audit Logs
  - System
  - Themes

#### Settings System
- General settings (site title, description, timezone, etc.)
- Email configuration
- Media settings
- Key-value storage
- Settings caching

#### Audit Log
- Complete audit trail
- User action tracking
- IP address logging
- User agent recording
- Filterable by module, action, user, date
- Export to CSV
- Statistics dashboard
- Automatic pruning
- Configurable retention period

#### System Management
- Cache management (clear, optimize)
- Cronjob management
- System information dashboard
- Server info
- PHP info
- Laravel info
- Database info
- Requirements checker

#### Theme Management
- Theme activation
- Light/Dark mode toggle
- Theme customization
- Color scheme management
- Font settings
- Import/Export theme configs

#### Database
- Migrations for all tables:
  - pages
  - settings
  - users (extended)
  - roles
  - role_users
  - user_meta
  - activations
  - audit_histories

#### Models
- Page model with relationships
- Setting model with caching
- User model with permissions and preferences
- Role model with permissions
- AuditHistory model with pruning
- UserMeta model
- Activation model

#### Controllers
- PageController (full CRUD + bulk operations)
- UserController (full CRUD + profile + super user)
- RoleController (full CRUD + duplication + assignment)
- SettingController (general, email, media)
- AuditLogController (view, export, stats, clean)
- CacheController (clear, optimize, test)
- CronjobController (run, schedule, list commands)
- SystemInfoController (server, PHP, Laravel, DB info)
- ThemeController (activate, customize, import/export)

#### Form Requests
- PageRequest (validation for pages)
- UserRequest (validation for users)
- RoleRequest (validation for roles)
- UpdatePasswordRequest
- UpdateProfileRequest

#### Traits
- HasPermissions (permission checking)
- HasPreferences (user preferences)

#### Helpers
- `setting()` - Get/set settings
- `set_setting()` - Set a setting value
- `has_permission()` - Check user permission
- `has_any_permission()` - Check any permission
- `has_all_permissions()` - Check all permissions
- `is_super_user()` - Check if super user
- `audit_log()` - Create audit log entry
- `mercosan_admin_url()` - Generate admin URLs
- `format_bytes()` - Format bytes to human readable
- `cache_remember_forever()` - Cache helper
- `mercosan_version()` - Get package version
- `is_active_route()` - Check active route
- `mercosan_config()` - Get config values

#### Views
- Master layout with sidebar navigation
- Dashboard with statistics
- Pages: index, create, edit
- Users: index
- Roles: index
- Settings: index, general
- System: info
- Responsive Bootstrap 5 design
- Alert system
- Form validation display

#### Configuration
- Comprehensive config file
- Route prefix configuration
- Middleware configuration
- Model customization
- Pagination settings
- Audit log settings
- Permission definitions
- Theme settings
- Cache settings
- Media settings
- Security settings

#### Routes
- Web routes for all features
- API routes for all features
- RESTful naming conventions
- Route groups and prefixes

### Features Highlights

- **Production Ready**: Complete and tested functionality
- **Extensible**: Easy to extend with custom models and logic
- **Secure**: Permission-based access control
- **Auditable**: Complete audit trail of all actions
- **Performant**: Caching support throughout
- **Modern UI**: Clean Bootstrap 5 interface
- **API First**: RESTful API for all operations
- **Well Documented**: Comprehensive documentation
- **Type Safe**: PHP 8.1+ with strict types
- **Laravel Standards**: Follows Laravel best practices

### Technical Details

- PHP 8.1+ required
- Laravel 10.x and 11.x supported
- PSR-4 autoloading
- Service Provider auto-discovery
- Publishable assets (config, migrations, views)
- Database migrations with checks
- Eloquent models with relationships
- Form Request validation
- Bootstrap 5 UI framework
- Bootstrap Icons
- Responsive design

## [Unreleased]

### Planned Features
- Email templates management
- Notification system
- Activity timeline
- Advanced search
- Data export/import
- API documentation
- Two-factor authentication
- Password reset functionality
- Social login integration
- File manager
- Media library
- Dashboard widgets
- Custom fields
- Multilingual support
- Dark mode persistence
- Real-time notifications
- WebSocket support

---

For upgrade instructions, see INSTALL.md
