<?php

namespace Botble\Ecommerce\AdsTracking;

use Botble\Ecommerce\Models\Order;
use Botble\Ecommerce\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FacebookCapi
{
    protected string $apiVersion = 'v18.0';

    protected array $pendingEvents = [];

    public function isEnabled(): bool
    {
        return get_ecommerce_setting('facebook_pixel_enabled', false)
            && get_ecommerce_setting('facebook_pixel_id')
            && get_ecommerce_setting('facebook_capi_access_token');
    }

    protected function getUserData(): array
    {
        $request = request();

        $data = [
            'client_ip_address' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        // Facebook Click ID cookie (set when user clicks a Meta ad)
        if ($fbc = $request->cookie('_fbc')) {
            $data['fbc'] = $fbc;
        }

        // Facebook Browser ID cookie (set by the browser pixel)
        if ($fbp = $request->cookie('_fbp')) {
            $data['fbp'] = $fbp;
        }

        // Hashed PII if customer is logged in
        if (auth('customer')->check()) {
            $customer = auth('customer')->user();

            if (! empty($customer->email)) {
                $data['em'] = [hash('sha256', strtolower(trim($customer->email)))];
            }

            if (! empty($customer->phone)) {
                $data['ph'] = [hash('sha256', preg_replace('/[^0-9]/', '', $customer->phone))];
            }
        }

        return $data;
    }

    protected function pushEvent(string $eventName, array $customData = []): void
    {
        if (! $this->isEnabled()) {
            return;
        }

        $this->pendingEvents[] = [
            'event_name'       => $eventName,
            'event_time'       => time(),
            'action_source'    => 'website',
            'event_source_url' => request()->fullUrl(),
            'user_data'        => $this->getUserData(),
            'custom_data'      => $customData,
        ];
    }

    public function view(Product $product): void
    {
        $this->pushEvent('ViewContent', [
            'content_ids'  => [(string) $product->id],
            'content_name' => $product->name,
            'content_type' => 'product',
            'currency'     => get_application_currency()->title,
            'value'        => (float) ($product->front_sale_price ?? $product->price),
        ]);
    }

    public function checkout(array $items, float $value): void
    {
        $this->pushEvent('InitiateCheckout', [
            'content_ids' => array_map(fn ($item) => (string) $item->id, $items),
            'num_items'   => count($items),
            'currency'    => get_application_currency()->title,
            'value'       => $value,
        ]);
    }

    public function purchase(Order $order): void
    {
        $this->pushEvent('Purchase', [
            'order_id'     => (string) $order->id,
            'content_ids'  => $order->products->pluck('product_id')->map(fn ($id) => (string) $id)->values()->all(),
            'content_type' => 'product',
            'currency'     => get_application_currency()->title,
            'value'        => (float) $order->sub_total,
            'num_items'    => (int) $order->products->sum('qty'),
        ]);
    }

    public function addToCart(Product $product, int $quantity, float $value): void
    {
        $this->pushEvent('AddToCart', [
            'content_ids'  => [(string) $product->id],
            'content_name' => $product->name,
            'content_type' => 'product',
            'currency'     => get_application_currency()->title,
            'value'        => $value,
            'num_items'    => $quantity,
        ]);
    }

    /**
     * Send all pending events to Meta's Conversions API.
     * Called after the HTTP response is sent (via app()->terminating()).
     */
    public function sendPendingEvents(): void
    {
        if (empty($this->pendingEvents) || ! $this->isEnabled()) {
            return;
        }

        $pixelId     = get_ecommerce_setting('facebook_pixel_id');
        $accessToken = get_ecommerce_setting('facebook_capi_access_token');
        $endpoint    = "https://graph.facebook.com/{$this->apiVersion}/{$pixelId}/events";

        try {
            Http::timeout(5)->post($endpoint, [
                'data'         => $this->pendingEvents,
                'access_token' => $accessToken,
            ]);
        } catch (\Throwable $e) {
            Log::warning('Facebook CAPI error: ' . $e->getMessage());
        }

        $this->pendingEvents = [];
    }
}
