(function () {
    'use strict';

    function readExistingDiscount() {
        const comp = document.querySelector('discount-component');
        if (!comp) {
            return {};
        }
        const raw = comp.getAttribute(':discount') || comp.getAttribute('discount') || '{}';
        try {
            return JSON.parse(raw);
        } catch (e) {
            return {};
        }
    }

    function injectFields() {
        if (document.getElementById('discount-extensions-fields')) {
            return;
        }

        const comp = document.querySelector('discount-component');
        const form = (comp && comp.closest('form')) || document.querySelector('form');

        if (!form) {
            return;
        }

        const data = readExistingDiscount();
        const firstOrderChecked = Number(data.first_order_only) ? 'checked' : '';
        const maxUsesValue = (data.max_uses_per_customer !== null && data.max_uses_per_customer !== undefined)
            ? String(data.max_uses_per_customer)
            : '';

        const wrapper = document.createElement('div');
        wrapper.id = 'discount-extensions-fields';
        wrapper.className = 'card mt-3';
        wrapper.innerHTML = [
            '<div class="card-header"><strong>Reglas avanzadas (Mercosan)</strong></div>',
            '<div class="card-body">',
            '  <div class="form-group mb-3 form-check">',
            '    <input type="hidden" name="first_order_only" value="0">',
            '    <input type="checkbox" name="first_order_only" id="discount_first_order_only" ',
            '           class="form-check-input" value="1" ' + firstOrderChecked + '>',
            '    <label class="form-check-label" for="discount_first_order_only">Solo para primera compra del cliente</label>',
            '    <p class="text-muted small mb-0">Bloquea el cupón si el cliente ya tiene órdenes completadas.</p>',
            '  </div>',
            '  <div class="form-group mb-0">',
            '    <label class="control-label" for="discount_max_uses_per_customer">Usos máximos por cliente</label>',
            '    <input type="number" min="0" step="1" name="max_uses_per_customer" id="discount_max_uses_per_customer" ',
            '           class="form-control" value="' + maxUsesValue + '" placeholder="Dejar vacío para ilimitado">',
            '    <p class="text-muted small mb-0">Cuántas veces el mismo cliente puede usar este cupón. Vacío o 0 = ilimitado.</p>',
            '  </div>',
            '</div>',
        ].join('\n');

        form.appendChild(wrapper);
    }

    function waitAndInject(retries) {
        if (retries <= 0) {
            return;
        }
        if (document.querySelector('discount-component, form')) {
            setTimeout(injectFields, 200);
            return;
        }
        setTimeout(function () { waitAndInject(retries - 1); }, 200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { waitAndInject(25); });
    } else {
        waitAndInject(25);
    }
})();
