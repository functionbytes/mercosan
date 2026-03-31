# Frontend Agent Memory

## Image Module Components (Created 2026-02-09)

Created 6 production-ready reusable Blade components at:
`modules/Image/resources/views/images/components/`

### Components Overview
1. **stat-card.blade.php** - Dashboard stat widgets with icons and colored borders
2. **language-selector.blade.php** - Multi-select dropdown with select/deselect all
3. **image-uploader.blade.php** - Drag-and-drop upload with preview and validation
4. **image-gallery.blade.php** - Gallery grid for TranslatedImage collections
5. **cost-calculator.blade.php** - Real-time AJAX cost estimation widget
6. **notification-badge.blade.php** - Auto-polling notification counter for navbars

### Key Patterns Learned

#### Component Parameter Passing
All components use `@include` with parameter arrays:
```blade
@include('image::images.components.stat-card', [
    'title' => 'Value',
    'required' => true,
])
```

#### JavaScript Integration
- Use `@push('scripts')` and `@push('styles')` for isolated JS/CSS
- Auto-generate unique IDs: `uniqid()` or `md5($name)` for multiple instances
- Use IIFE `(function() { ... })()` to avoid global scope pollution
- Always include CSRF token in AJAX: `headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }`

#### AJAX Polling Pattern (notification-badge)
```javascript
let pollInterval;
function startPolling() {
    updateData(); // Initial call
    pollInterval = setInterval(updateData, 60000);
}

// Pause when page hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(pollInterval);
    } else {
        startPolling();
    }
});
```

#### Debouncing Pattern (cost-calculator)
```javascript
let timeout;
function debounced() {
    clearTimeout(timeout);
    timeout = setTimeout(actualFunction, 300);
}
```

#### Drag-and-Drop File Upload (image-uploader)
- Prevent default on `dragover` and `drop` events
- Add visual feedback with border color changes
- Validate file size client-side before preview
- Use FileReader API for image preview generation
- Provide remove button to reset input

### Component Integration Lessons

1. **Cost Calculator + Language Selector**: Cost calculator automatically binds to form field changes. Render language selector BEFORE cost calculator for proper event binding.

2. **Image Gallery**: Expects TranslatedImage model with `status->color()` and `status->label()` methods. Always provide empty state.

3. **Notification Badge**: Requires route `images.notifications.unread-count` returning `{success: true, count: 5}`.

4. **Multiple Instances**: All components generate unique IDs to support multiple instances on same page.

### Documentation Files
- `README.md` - Complete usage guide with troubleshooting
- `EXAMPLES.blade.php` - Working examples of all components
- `QUICK_REFERENCE.md` - Copy-paste snippets

### Common Pitfalls Avoided
- NO Tabler Icons (ti ti-*) - use Font Awesome 6 only
- NO inline styles unless necessary (prefer Bootstrap classes)
- NO Livewire/Alpine/Vue - pure jQuery + Bootstrap
- Spanish labels with first-word capitalization only
- Always pass parameters explicitly (no implicit globals)

### Reusable Patterns for Future Components

#### Basic Card Component Structure
```blade
<div class="card">
    <div class="card-body">
        <h6 class="fw-bold mb-3 border-bottom pb-2">Title</h6>
        <div class="row g-3">
            {{-- Content --}}
        </div>
    </div>
</div>
```

#### Bootstrap Gap Utilities (preferred over margins)
```blade
<div class="d-flex gap-2">...</div>
<div class="row g-3">...</div>
```

#### Icon + Text Pattern
```blade
<i class="fas fa-icon"></i> Texto
```

### Testing Considerations
- Verify CSRF meta tag exists in layout
- Test with multiple instances on same page
- Verify polling pauses when tab hidden
- Test AJAX error handling
- Validate file upload size limits
- Check responsive behavior on mobile

### Module File Structure Pattern
```
modules/ModuleName/resources/views/
  ├── modulename/
  │   ├── components/      # Reusable partials
  │   ├── layouts/         # Module-specific layouts
  │   └── pages/           # Full page views
```

### Performance Notes
- Debounce AJAX calls (300ms for cost calculation)
- Throttle polling (60s for notifications)
- Use event delegation for dynamic content: `$(document).on('click', '.selector', handler)`
- Minimize reflows: batch DOM updates

### Bootstrap 5.3 Utilities Reference
- Spacing: `gap-2`, `g-3`, `mb-3`, `py-2`
- Flex: `d-flex`, `justify-content-between`, `align-items-center`
- Display: `d-none`, `d-block`, `d-inline-block`
- Position: `position-relative`, `position-absolute`, `top-0`, `start-100`, `translate-middle`
- Opacity: `bg-opacity-10`
- Border: `border-start`, `border-4`, `border-bottom`, `pb-2`

### Next Steps for Component Library
- Consider creating form field components (input, textarea, select)
- Build modal components for common patterns (confirm delete, etc.)
- Create table components with sorting/filtering
- Build alert/notification components beyond toastr

## List Group Pattern for Dynamic Items (2026-02-19)

Used in Chat module macro edit page for conditions and actions.

### Pattern: List Group Items with Visual Hierarchy
Instead of nested cards, use list-group-item with colored borders and badges:

```blade
<div class="list-group list-group-flush" id="container"></div>

<!-- JavaScript generates items -->
<div class="list-group-item border-start border-4 border-primary mb-2">
    <div class="d-flex align-items-center gap-2 mb-2">
        <span class="badge bg-primary-subtle text-primary px-2 py-1">
            <i class="fas fa-filter me-1"></i>Item #1
        </span>
        <button class="btn btn-sm btn-light-danger text-danger ms-auto" title="Delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="row g-2">
        <!-- Fields with labeled icons -->
        <div class="col-12 col-md-4">
            <label class="form-label small fw-semibold mb-1">
                <i class="fas fa-tag me-1 text-muted"></i>Label
            </label>
            <select class="form-select form-select-sm">...</select>
        </div>
    </div>
</div>
```

### Visual Features
- **Color coding**: border-start border-4 with different colors (primary, success)
- **Numbered badges**: bg-{color}-subtle with text-{color}
- **Icon labels**: Small icons in field labels for context
- **Hover effects**: Shadow + transform on hover
- **Compact delete**: Light-danger button, subtle when not hovered

### CSS Enhancements
```css
.list-group-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transform: translateY(-1px);
}

.btn-light-danger {
    background-color: #fee;
    border: 1px solid #fcc;
}
```

### When to Use
- Dynamic form sections (add/remove items)
- Conditions, rules, filters
- Action lists with parameters
- Better than nested cards for 3+ similar items
- Provides clear visual separation without bulk

### Icons for Context
- Filter/condition: `fas fa-filter`
- Action: `fas fa-bolt`
- Field/tag: `fas fa-tag`
- Operator: `fas fa-equals`
- Value/input: `fas fa-keyboard`
- Settings: `fas fa-cog`

### Responsive Grid
- Desktop: 3-4 columns (col-md-3, col-md-4, col-md-5)
- Mobile: Stacked full-width (col-12)
