<?php

namespace Botble\Ecommerce\Listeners;

use Botble\Base\Events\AdminNotificationEvent;
use Botble\Base\Supports\AdminNotificationItem;
use Botble\Ecommerce\Events\OrderCreated;
use Botble\Ecommerce\Events\OrderPlacedEvent;
use Botble\Base\Supports\EmailHandler;

class OrderCreatedNotification
{
    public function handle(OrderPlacedEvent|OrderCreated $event): void
    {
        // Send admin notification to dashboard
        event(new AdminNotificationEvent(
            AdminNotificationItem::make()
                ->title(trans('plugins/ecommerce::order.new_order_notifications.new_order'))
                ->description(trans('plugins/ecommerce::order.new_order_notifications.description', [
                    'customer' => $event->order->shippingAddress->name,
                    'quantity' => $quantity = $event->order->products->count(),
                    'product' => $quantity > 1 ? trans('plugins/ecommerce::order.new_order_notifications.products') : trans('plugins/ecommerce::order.new_order_notifications.product'),
                ]))
                ->action(trans('plugins/ecommerce::order.new_order_notifications.view'), route('orders.edit', $event->order->getKey()))
        ));

        // Send email notification to administrator
        $emailHandler = new EmailHandler();
        $notificationEmail = get_ecommerce_setting('store_notification_email');
        $adminEmail = $notificationEmail ?: get_admin_email();

        if ($adminEmail) {
            $emailHandler
                ->setType('plugins/ecommerce::admin_new_order')
                ->setModule('ecommerce')
                ->setVariableValues([
                    'customer_name' => $event->order->shippingAddress->name ?? $event->order->address->name ?? 'N/A',
                    'customer_phone' => $event->order->shippingAddress->phone ?? $event->order->address->phone ?? 'N/A',
                    'customer_address' => $event->order->full_address,
                    'shipping_method' => $event->order->shipping_method_name,
                    'payment_method' => $event->order->payment->payment_channel ?? 'N/A',
                    'product_list' => $this->generateProductListHtml($event->order),
                    'order_note' => $event->order->description ?? '',
                    'order_id' => $event->order->code,
                    'order_edit_link' => route('orders.edit', $event->order->getKey()),
                ])
                ->sendUsingTemplate($adminEmail);
        }
    }
    
    protected function generateProductListHtml($order): string
    {
        try {
            // Use order products table instead of products relationship
            $orderProducts = $order->products()->get();
            
            if (!$orderProducts || $orderProducts->isEmpty()) {
                return '<p>No hay productos en esta orden.</p>';
            }
            
            $html = '<table style="width: 100%; border-collapse: collapse;">';
            $html .= '<thead><tr style="background-color: #f8f9fa;">';
            $html .= '<th style="padding: 8px; border: 1px solid #dee2e6; text-align: left;">Producto</th>';
            $html .= '<th style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">Cantidad</th>';
            $html .= '<th style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">Precio</th>';
            $html .= '<th style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">Total</th>';
            $html .= '</tr></thead><tbody>';
            
            foreach ($orderProducts as $product) {
                $qty = $product->pivot->qty ?? 1;
                $price = $product->pivot->price ?? 0;
                
                $html .= '<tr>';
                $html .= '<td style="padding: 8px; border: 1px solid #dee2e6;">' . e($product->name ?? 'Producto') . '</td>';
                $html .= '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: center;">' . $qty . '</td>';
                $html .= '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">' . format_price($price) . '</td>';
                $html .= '<td style="padding: 8px; border: 1px solid #dee2e6; text-align: right;">' . format_price($price * $qty) . '</td>';
                $html .= '</tr>';
            }
            
            $html .= '</tbody></table>';
            
            return $html;
            
        } catch (\Exception $e) {
            // If there's any error, return a simple fallback
            return '<p>Lista de productos: ' . $order->products()->count() . ' producto(s) en la orden #' . ($order->code ?? $order->id) . '</p>';
        }
    }
}
