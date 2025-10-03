<?php

namespace Botble\Ecommerce\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Ecommerce\Enums\OrderStatusEnum;
use Botble\Ecommerce\Enums\ShippingStatusEnum;
use Botble\Ecommerce\Models\OrderHistory;
use Botble\Ecommerce\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfirmDeliveryController extends BaseController
{
    public function show(Request $request, string $token)
    {
        $shipment = Shipment::where('delivery_token', $token)->first();

        if (! $shipment) {
            abort(404, 'Envío no encontrado');
        }

        $order = $shipment->order;
        $alreadyConfirmed = $shipment->delivered_at !== null;

        // Si no está confirmado, confirmar automáticamente
        if (! $alreadyConfirmed) {
            // Actualizar estado del envío
            $shipment->update([
                'status' => ShippingStatusEnum::DELIVERED,
                'delivered_at' => now(),
                'delivered_by' => $request->ip(),
            ]);

            // Actualizar estado de la orden
            $order->update([
                'status' => OrderStatusEnum::COMPLETED,
            ]);

            // Registrar en el historial
            OrderHistory::create([
                'action' => 'confirm_delivery',
                'description' => trans('plugins/ecommerce::order.delivery_confirmed_by_qr', [
                    'time' => now()->format('d/m/Y H:i'),
                ]),
                'order_id' => $order->id,
                'user_id' => Auth::id(),
            ]);

            // Marcar que acaba de ser confirmado
            $alreadyConfirmed = true;
        }

        return view('plugins/ecommerce::deliveries.confirm', compact('shipment', 'order', 'alreadyConfirmed'));
    }
}