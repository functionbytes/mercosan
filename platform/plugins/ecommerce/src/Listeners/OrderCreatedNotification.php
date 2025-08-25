<?php

namespace Botble\Ecommerce\Listeners;

use Botble\Base\Events\AdminNotificationEvent;
use Botble\Base\Supports\AdminNotificationItem;
use Botble\Ecommerce\Events\OrderCreated;
use Botble\Ecommerce\Events\OrderPlacedEvent;
use Botble\Base\Supports\EmailHandler;
use Illuminate\Support\Facades\Mail;
use Botble\Newsletter\Facades\Newsletter as NewsletterFacade;

class OrderCreatedNotification
{
    public function handle(OrderPlacedEvent|OrderCreated $event): void
    {
        try {
            // Register user to newsletter automatically without sending email
            $this->registerUserToNewsletter($event->order);
            
            // Send admin notification to dashboard
            event(new AdminNotificationEvent(
                AdminNotificationItem::make()
                    ->title(trans('plugins/ecommerce::order.new_order_notifications.new_order'))
                    ->description(trans('plugins/ecommerce::order.new_order_notifications.description', [
                        'customer' => $this->getFullCustomerName($event->order),
                        'quantity' => $quantity = $event->order->products->count(),
                        'product' => $quantity > 1 ? trans('plugins/ecommerce::order.new_order_notifications.products') : trans('plugins/ecommerce::order.new_order_notifications.product'),
                    ]))
                    ->action(trans('plugins/ecommerce::order.new_order_notifications.view'), route('orders.edit', $event->order->getKey()))
            ));

            $emailHandler = new EmailHandler();
            $notificationEmail = get_ecommerce_setting('store_notification_email');
            $adminEmail = $notificationEmail ?: get_admin_email();

            if ($adminEmail) {
                $productListHtml = $this->generateProductListHtml($event->order);

                // Validate that we have all required data before sending
                if (empty($productListHtml)) {
                    $productListHtml = '<p>No se pudieron cargar los productos de la orden.</p>';
                }

                // Get customer name with full address details
                $customerName = $this->getFullCustomerName($event->order);

                $variableValues = [
                    'customer_name' => $customerName,
                    'customer_phone' => $event->order->shippingAddress->phone ?? $event->order->address->phone ?? 'N/A',
                    'customer_email' => $event->order->shippingAddress->email ?? $event->order->address->email ?? $event->order->user->email ?? 'N/A',
                    'customer_address' => $event->order->full_address ?? 'N/A',
                    'shipping_method' => $event->order->shipping_method_name ?? 'N/A',
                    'payment_method' => $event->order->payment->payment_channel ?? 'N/A',
                    'product_list' => $productListHtml,
                    'order_note' => $event->order->description ?? '',
                    'order_id' => $event->order->code ?? $event->order->id,
                    'order_edit_link' => route('orders.edit', $event->order->getKey()),
                    'site_title' => setting('admin_title', config('app.name', 'Mercosan')),
                ];

                // Set module before checking template status
                $emailHandler->setModule('ecommerce');

                \Log::info('Sending admin order notification', [
                    'order_id' => $event->order->id,
                    'admin_email' => $adminEmail,
                    'template_enabled' => $emailHandler->templateEnabled('admin_new_order', 'plugins'),
                    'variables_count' => count($variableValues),
                    'product_list_length' => strlen($productListHtml)
                ]);

                // Log the actual variables being sent
                \Log::info('Email variables being sent', [
                    'variables' => $variableValues,
                    'customer_name' => $variableValues['customer_name'] ?? 'NOT SET',
                    'product_list_sample' => substr($variableValues['product_list'] ?? 'NOT SET', 0, 100)
                ]);

                // Use the exact pattern from OrderHelper that works
                $emailHandler = \Botble\Base\Facades\EmailHandler::setModule('ecommerce');

                if ($emailHandler->templateEnabled('admin_new_order')) {
                    // Get proper shipping method with cost based on business rules
                    $shippingMethod = 'N/A';
                    $shippingCost = 0;

                    // Try to get the real shipping method name from the order's shipping option
                    $shippingMethodName = $this->getShippingMethodDisplayName($event->order);

                    if ($shippingMethodName) {
                        $shippingMethod = $shippingMethodName;
                        $shippingCost = $event->order->shipping_amount ?? 0;
                    } else if ($event->order->shipping_method_name) {
                        // Fallback to original method
                        $shippingMethod = $event->order->shipping_method_name;
                        if ($event->order->shipping_amount > 0) {
                            $shippingMethod .= ' - ' . format_price($event->order->shipping_amount);
                        } else {
                            $shippingMethod .= ' - Free';
                        }
                        $shippingCost = $event->order->shipping_amount;
                    }

                    // Get proper payment method
                    $paymentMethod = 'N/A';
                    if ($event->order->payment && $event->order->payment->payment_channel) {
                        $paymentMethod = $event->order->payment->payment_channel->label();
                    }

                    // Calculate amounts
                    $subtotal = $event->order->sub_total;
                    $discountAmount = $event->order->discount_amount ?? 0;
                    $taxAmount = $event->order->tax_amount ?? 0;
                    $total = $event->order->amount;

                    // Use the same structure as OrderHelper::getEmailVariables()
                    $emailVariables = [
                        'store_address' => get_ecommerce_setting('store_address'),
                        'store_phone' => get_ecommerce_setting('store_phone'),
                        'order_id' => $event->order->code,
                        'order_token' => $event->order->token,
                        'order_note' => $event->order->description,
                        'customer_name' => $customerName,
                        'customer_email' => $event->order->user->email ?? $event->order->address->email,
                        'customer_phone' => $event->order->user->phone ?? $event->order->address->phone,
                        'customer_address' => $event->order->full_address,
                        'product_list' => $productListHtml,
                        'shipping_method' => $shippingMethod,
                        'shipping_amount' => format_price($shippingCost),
                        'payment_method' => $paymentMethod,
                        'order_edit_link' => route('orders.edit', $event->order->getKey()),
                        // Add financial details
                        'sub_total' => format_price($subtotal),
                        'discount_amount' => format_price($discountAmount),
                        'tax_amount' => format_price($taxAmount),
                        'total_amount' => format_price($total),
                        'coupon_code' => $event->order->coupon_code ?? '',
                        'order_amount' => format_price($event->order->amount),
                    ];

                    \Log::info('Setting email variables using OrderHelper pattern', [
                        'variables' => $emailVariables
                    ]);

                    // Use the exact same method as OrderHelper::setEmailVariables()
                    $emailHandler = $emailHandler->setVariableValues($emailVariables);
                    $emailHandler->sendUsingTemplate('admin_new_order', $adminEmail);
                }
            }
        } catch (\Exception $e) {
            \Log::error('Error sending admin order notification email: ' . $e->getMessage(), [
                'order_id' => $event->order->id ?? null,
                'admin_email' => $adminEmail ?? null,
                'exception' => $e
            ]);
        }
    }

    protected function generateProductListHtml($order): string
    {
        try {
            // Validate order object first
            if (!$order || !$order->id) {
                return '<p>Orden no válida.</p>';
            }

            // Try multiple ways to get products
            $orderProducts = null;

            // First try: order products relationship
            if (method_exists($order, 'products') && $order->products()) {
                $orderProducts = $order->products()->get();
            }

            // Second try: order product items relationship if available
            if ((!$orderProducts || $orderProducts->isEmpty()) && method_exists($order, 'productItems')) {
                $orderProducts = $order->productItems()->get();
            }

            // Third try: direct database query as fallback
            if (!$orderProducts || $orderProducts->isEmpty()) {
                $orderProducts = \DB::table('ec_order_product')
                    ->where('order_id', $order->id)
                    ->join('ec_products', 'ec_order_product.product_id', '=', 'ec_products.id')
                    ->select(
                        'ec_products.name as product_name',
                        'ec_order_product.product_name as order_product_name',
                        'ec_order_product.qty',
                        'ec_order_product.price'
                    )
                    ->get();
            }

            if (!$orderProducts || $orderProducts->isEmpty()) {
                return '<p>No hay productos en esta orden (#' . ($order->code ?? $order->id) . ').</p>';
            }

            $html = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">';
            $html .= '<thead><tr style="background-color: #f8f9fa;">';
            $html .= '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: left; font-weight: bold;">Producto</th>';
            $html .= '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: center; font-weight: bold;">Cantidad</th>';
            $html .= '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: right; font-weight: bold;">Precio Unit.</th>';
            $html .= '<th style="padding: 12px 8px; border: 1px solid #dee2e6; text-align: right; font-weight: bold;">Total</th>';
            $html .= '</tr></thead><tbody>';

            $orderTotal = 0;
            foreach ($orderProducts as $product) {
                // Handle both Eloquent models and stdClass objects from direct query
                $qty = $product->qty ?? $product->pivot->qty ?? 1;
                $price = $product->price ?? $product->pivot->price ?? 0;

                // Try multiple ways to get the product name
                $name = null;
                if (isset($product->name) && !empty($product->name)) {
                    $name = $product->name;
                } elseif (isset($product->product_name) && !empty($product->product_name)) {
                    $name = $product->product_name;
                } elseif (isset($product->order_product_name) && !empty($product->order_product_name)) {
                    $name = $product->order_product_name;
                } elseif (isset($product->pivot) && isset($product->pivot->product_name) && !empty($product->pivot->product_name)) {
                    $name = $product->pivot->product_name;
                }

                // If still no name, try to get it from the product relationship
                if (empty($name) && isset($product->product) && !empty($product->product->name)) {
                    $name = $product->product->name;
                }

                // Final fallback
                if (empty($name)) {
                    $name = 'Producto sin nombre';
                }

                \Log::info('Product name resolution', [
                    'product_data' => is_object($product) ? get_object_vars($product) : $product,
                    'resolved_name' => $name,
                    'order_id' => $order->id
                ]);

                $lineTotal = $price * $qty;

                $html .= '<tr>';
                $html .= '<td style="padding: 10px 8px; border: 1px solid #dee2e6;">' . e($name) . '</td>';
                $html .= '<td style="padding: 10px 8px; border: 1px solid #dee2e6; text-align: center;">' . (int)$qty . '</td>';
                $html .= '<td style="padding: 10px 8px; border: 1px solid #dee2e6; text-align: right;">' . (function_exists('format_price') ? format_price($price) : '$' . number_format($price, 2)) . '</td>';
                $html .= '<td style="padding: 10px 8px; border: 1px solid #dee2e6; text-align: right; font-weight: bold;">' . (function_exists('format_price') ? format_price($lineTotal) : '$' . number_format($lineTotal, 2)) . '</td>';
                $html .= '</tr>';
            }

            $html .= '</tbody></table>';

            //
            // Ensure we return valid HTML
            return trim($html) ?: '<p>Error generando lista de productos.</p>';

        } catch (\Exception $e) {
            \Log::error('Error generating product list HTML: ' . $e->getMessage(), [
                'order_id' => $order->id ?? null,
                'exception' => $e
            ]);

            // Safe fallback with order info
            $orderInfo = 'orden';
            if ($order && (isset($order->code) || isset($order->id))) {
                $orderInfo = 'orden #' . ($order->code ?? $order->id);
            }

            return '<p>Lista de productos no disponible para la ' . $orderInfo . '. Por favor revisar en el panel de administración.</p>';
        }
    }


    protected function getFullCustomerName($order): string
    {
        try {
            // Log all available order data for debugging
            \Log::info('Order data for customer name', [
                'order_id' => $order->id,
                'has_shipping_address' => !empty($order->shippingAddress),
                'has_billing_address' => !empty($order->address),
                'has_user' => !empty($order->user)
            ]);

            $customerName = '';

            // Priority 1: Try shipping address first (most recent data from checkout)
            if ($order->shippingAddress) {
                $address = $order->shippingAddress;

                // Log all fields in shipping address
                \Log::info('Shipping address complete data', [
                    'address_data' => method_exists($address, 'toArray') ? $address->toArray() : (array)$address
                ]);

                // Try to get the complete name from the 'name' field first
                if (!empty($address->name)) {
                    $customerName = trim($address->name);
                } else {
                    // If no 'name' field, build from first_name + last_name
                    $nameParts = [];
                    if (!empty($address->first_name)) {
                        $nameParts[] = trim($address->first_name);
                    }
                    if (!empty($address->last_name)) {
                        $nameParts[] = trim($address->last_name);
                    }
                    if (!empty($nameParts)) {
                        $customerName = implode(' ', $nameParts);
                    }
                }
            }

            // Priority 2: If no name from shipping, try billing address
            if (empty($customerName) && $order->address) {
                $address = $order->address;

                // Log all fields in billing address
                \Log::info('Billing address complete data', [
                    'address_data' => method_exists($address, 'toArray') ? $address->toArray() : (array)$address
                ]);

                // Try to get the complete name from the 'name' field first
                if (!empty($address->name)) {
                    $customerName = trim($address->name);
                } else {
                    // If no 'name' field, build from first_name + last_name
                    $nameParts = [];
                    if (!empty($address->first_name)) {
                        $nameParts[] = trim($address->first_name);
                    }
                    if (!empty($address->last_name)) {
                        $nameParts[] = trim($address->last_name);
                    }
                    if (!empty($nameParts)) {
                        $customerName = implode(' ', $nameParts);
                    }
                }
            }

            // Priority 3: If still no name, try user account
            if (empty($customerName) && $order->user) {
                // Log user data
                \Log::info('User complete data', [
                    'user_data' => method_exists($order->user, 'toArray') ? $order->user->toArray() : (array)$order->user
                ]);

                if (!empty($order->user->name)) {
                    $customerName = trim($order->user->name);
                } else {
                    // Build from first_name + last_name
                    $nameParts = [];
                    if (!empty($order->user->first_name)) {
                        $nameParts[] = trim($order->user->first_name);
                    }
                    if (!empty($order->user->last_name)) {
                        $nameParts[] = trim($order->user->last_name);
                    }
                    if (!empty($nameParts)) {
                        $customerName = implode(' ', $nameParts);
                    }
                }
            }

            // Priority 4: Try getting from order table directly
            if (empty($customerName)) {
                // Check if order has customer_name field
                if (isset($order->customer_name) && !empty($order->customer_name)) {
                    $customerName = trim($order->customer_name);
                }
            }

            // Clean up the name
            $customerName = preg_replace('/\s+/', ' ', trim($customerName));

            \Log::info('Final customer name resolution', [
                'resolved_name' => $customerName,
                'name_length' => strlen($customerName),
                'order_id' => $order->id ?? 'unknown'
            ]);

            return !empty($customerName) ? $customerName : 'Cliente';

        } catch (\Exception $e) {
            \Log::error('Error getting customer name: ' . $e->getMessage(), [
                'order_id' => $order->id ?? null,
                'exception' => $e
            ]);

            return 'Cliente';
        }
    }

    /**
     * Get the display name for shipping method based on order's shipping option
     * Maps shipping option IDs to their real names with pricing information
     */
    protected function getShippingMethodDisplayName($order): ?string
    {
        try {
            // Get the shipping option from the order
            $shippingOption = $order->shipping_option ?? null;
            $shippingAmount = $order->shipping_amount ?? 0;

            \Log::info('Getting shipping method display name', [
                'order_id' => $order->id,
                'shipping_option' => $shippingOption,
                'shipping_amount' => $shippingAmount,
                'shipping_method_name' => $order->shipping_method_name ?? 'null'
            ]);

            if (!$shippingOption) {
                return null;
            }

            // Map shipping option to display name based on business rules
            $displayName = null;

            if ($shippingOption === 'pickup' || $shippingOption === '7') {
                // Always free pickup
                $displayName = __('plugins/ecommerce::shipping.pickup_method_name');
            } elseif (str_starts_with($shippingOption, 'free_delivery_rule_')) {
                // Free delivery from specific rule
                $displayName = __('plugins/ecommerce::shipping.free_delivery_method_name');
            } elseif (str_starts_with($shippingOption, 'paid_delivery_')) {
                // Paid delivery from specific rule - always has a cost
                $displayName = __('plugins/ecommerce::shipping.paid_delivery_method_name');
                if ($shippingAmount > 0) {
                    $displayName .= ' - ' . format_price($shippingAmount);
                }
            } elseif ($shippingOption === 'free_delivery') {
                // Free delivery by threshold
                $displayName = __('plugins/ecommerce::shipping.free_delivery_method_name');
            } else {
                // Try to identify the method from other patterns
                if (in_array($shippingOption, ['domicilio_gratis', 'envio_gratis'])) {
                    $displayName = __('plugins/ecommerce::shipping.free_delivery_method_name');
                } elseif (in_array($shippingOption, ['domicilio', 'paid_delivery'])) {
                    $displayName = __('plugins/ecommerce::shipping.paid_delivery_method_name');
                    if ($shippingAmount > 0) {
                        $displayName .= ' - ' . format_price($shippingAmount);
                    }
                }
            }

            \Log::info('Resolved shipping method display name', [
                'order_id' => $order->id,
                'shipping_option' => $shippingOption,
                'resolved_name' => $displayName,
                'shipping_amount' => $shippingAmount
            ]);

            return $displayName;

        } catch (\Exception $e) {
            \Log::error('Error getting shipping method display name: ' . $e->getMessage(), [
                'order_id' => $order->id ?? null,
                'exception' => $e
            ]);

            return null;
        }
    }

    /**
     * Register user to newsletter automatically without sending confirmation email
     */
    protected function registerUserToNewsletter($order): void
    {
        try {
            // Skip if newsletter plugin is not active
            if (!is_plugin_active('newsletter')) {
                return;
            }

            // Get email from order - try multiple sources
            $email = null;
            $name = null;

            // Priority 1: Try user email if logged in customer
            if ($order->user && $order->user->email) {
                $email = $order->user->email;
                $name = $order->user->name ?? '';
            }
            
            // Priority 2: Try shipping address email
            if (!$email && $order->shippingAddress && $order->shippingAddress->email) {
                $email = $order->shippingAddress->email;
                $name = $order->shippingAddress->name ?? '';
            }
            
            // Priority 3: Try billing address email
            if (!$email && $order->address && $order->address->email) {
                $email = $order->address->email;
                $name = $order->address->name ?? '';
            }

            // If no email found, skip registration
            if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                \Log::info('Newsletter auto-registration skipped - no valid email found', [
                    'order_id' => $order->id,
                    'email' => $email
                ]);
                return;
            }

            // Use centralized method with sendEvent=false to avoid sending emails
            $newsletter = NewsletterFacade::subscribeUser($email, $name, false);

            \Log::info('Newsletter auto-registration successful', [
                'order_id' => $order->id,
                'email' => $email,
                'name' => $name,
                'newsletter_id' => $newsletter->id,
                'was_created' => $newsletter->wasRecentlyCreated,
                'was_updated' => $newsletter->wasChanged()
            ]);

        } catch (\Exception $e) {
            // Log error but don't fail the order creation
            \Log::error('Error in newsletter auto-registration: ' . $e->getMessage(), [
                'order_id' => $order->id ?? null,
                'email' => $email ?? null,
                'exception' => $e
            ]);
        }
    }
}
