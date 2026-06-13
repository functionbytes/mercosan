<?php

namespace Mercosan\DiscountExtensions\Http\Listeners;

use Botble\Ecommerce\Models\Discount;

class RenderAdminFormFieldsListener
{
    public function handle(string $context, ?Discount $discount = null): string
    {
        $firstOrder = (int) ($discount?->first_order_only ?? 0);
        $maxUses = $discount?->max_uses_per_customer;

        return <<<HTML
<div class="form-group mb-3">
    <label class="control-label">
        <input type="checkbox" name="first_order_only" value="1" {$this->checked($firstOrder)}>
        Solo para primera compra del cliente
    </label>
    <p class="text-muted small mb-0">Bloquea el cupón si el cliente ya tiene órdenes completadas.</p>
</div>

<div class="form-group mb-3">
    <label class="control-label">Usos máximos por cliente</label>
    <input type="number" min="0" step="1" name="max_uses_per_customer" class="form-control"
           value="{$this->numberValue($maxUses)}"
           placeholder="Dejar vacío para ilimitado">
    <p class="text-muted small mb-0">Cuántas veces el mismo cliente puede usar este cupón. Vacío o 0 = ilimitado.</p>
</div>
HTML;
    }

    private function checked(int $value): string
    {
        return $value ? 'checked' : '';
    }

    private function numberValue(mixed $value): string
    {
        return $value !== null ? (string) (int) $value : '';
    }
}
