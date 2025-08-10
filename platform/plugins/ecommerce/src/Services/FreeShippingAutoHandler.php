<?php

namespace Botble\Ecommerce\Services;

use Botble\Ecommerce\Models\ShippingRule;
use Botble\Ecommerce\Enums\ShippingRuleTypeEnum;
use Illuminate\Support\Arr;

class FreeShippingAutoHandler
{
    /**
     * Check if order qualifies for automatic free shipping
     */
    public function shouldAutoApplyFreeShipping(array $orderData): bool
    {
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        $country = Arr::get($orderData, 'country', 'CO');
        
        // First check if order meets free shipping threshold
        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        
        if ($orderTotal >= $freeShippingThreshold) {
            \Log::info('FreeShippingAutoHandler: Order qualifies for free shipping by threshold', [
                'order_total' => $orderTotal,
                'threshold' => $freeShippingThreshold,
                'city' => $city,
                'state' => $state
            ]);
            return true;
        }
        
        // Check if there are any specific free shipping rules that apply
        $freeShippingRules = $this->getFreeShippingRules($orderTotal, $city, $state, $country);
        
        return !empty($freeShippingRules);
    }
    
    /**
     * Get applicable free shipping rules
     */
    protected function getFreeShippingRules(float $orderTotal, ?string $city, ?string $state, ?string $country): array
    {
        $applicableRules = [];
        
        // Find rules with price = 0 that match the criteria
        // Exclude pickup/store pickup rules by name patterns
        $rulesQuery = ShippingRule::where('price', 0)
            ->where(function ($query) {
                $query->where('name', 'not like', '%recoger%')
                      ->where('name', 'not like', '%pickup%')
                      ->where('name', 'not like', '%tienda%')
                      ->where('name', 'not like', '%store%');
            });
        
        if ($country) {
            $rulesQuery->whereHas('shipping', function ($query) use ($country) {
                $query->where('country', $country);
            });
        }
        
        $rules = $rulesQuery->with(['items', 'shipping'])->get();
            
        foreach ($rules as $rule) {
            if ($this->ruleAppliesToOrder($rule, $orderTotal, $city, $state)) {
                // Additional validation: ensure this is actually a delivery rule, not pickup
                if (!$this->isPickupRule($rule)) {
                    $applicableRules[] = $rule;
                }
            }
        }
        
        return $applicableRules;
    }
    
    /**
     * Check if a rule is intended for pickup/store collection rather than delivery
     */
    protected function isPickupRule(ShippingRule $rule): bool
    {
        $name = strtolower($rule->name ?: '');
        
        // Check rule name patterns that indicate pickup
        $pickupKeywords = ['recoger', 'pickup', 'tienda', 'store', 'recolectar', 'collect'];
        
        foreach ($pickupKeywords as $keyword) {
            if (strpos($name, $keyword) !== false) {
                return true;
            }
        }
        
        // Additional check: if it's a price-based rule from 0.00 with no upper limit,
        // and has no location items, it's likely a generic pickup rule
        if ($rule->type == ShippingRuleTypeEnum::BASED_ON_PRICE &&
            $rule->from == 0 &&
            is_null($rule->to) &&
            $rule->items->isEmpty()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Check if a specific rule applies to the current order
     */
    protected function ruleAppliesToOrder(ShippingRule $rule, float $orderTotal, ?string $city, ?string $state): bool
    {
        switch ($rule->type) {
            case ShippingRuleTypeEnum::BASED_ON_PRICE:
                return $this->priceRuleApplies($rule, $orderTotal);
                
            case ShippingRuleTypeEnum::BASED_ON_LOCATION:
                return $this->locationRuleApplies($rule, $city, $state);
                
            case ShippingRuleTypeEnum::BASED_ON_WEIGHT:
                // Weight-based rules need weight data
                return false;
                
            default:
                return true; // Default rules always apply
        }
    }
    
    /**
     * Check if price-based rule applies
     */
    protected function priceRuleApplies(ShippingRule $rule, float $orderTotal): bool
    {
        $withinMinimum = $orderTotal >= $rule->from;
        $withinMaximum = is_null($rule->to) || $orderTotal <= $rule->to;
        
        return $withinMinimum && $withinMaximum;
    }
    
    /**
     * Check if location-based rule applies
     */
    protected function locationRuleApplies(ShippingRule $rule, ?string $city, ?string $state): bool
    {
        if (!$city && !$state) {
            return false;
        }
        
        // If rule has no items, it applies to all locations
        if ($rule->items->isEmpty()) {
            return true;
        }
        
        // Check if any item matches the location
        foreach ($rule->items as $item) {
            if (!$item->is_enabled) {
                continue;
            }
            
            $cityMatches = !$item->city || $item->city == $city;
            $stateMatches = !$item->state || $item->state == $state;
            
            if ($cityMatches && $stateMatches) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Create automatic free shipping method data
     */
    public function createAutoFreeShippingMethod(array $orderData): array
    {
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        $country = Arr::get($orderData, 'country', 'CO');
        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        
        // If order qualifies by threshold, find the specific price-based rule for 200,000
        if ($orderTotal >= $freeShippingThreshold) {
            \Log::info('FreeShippingAutoHandler: Order qualifies for threshold-based free shipping, searching for price rule', [
                'order_total' => $orderTotal,
                'threshold' => $freeShippingThreshold
            ]);
            
            // Find the specific price-based rule that matches the 200,000 threshold
            $priceBasedRule = ShippingRule::where('price', 0)
                ->where('type', ShippingRuleTypeEnum::BASED_ON_PRICE)
                ->where('from', '<=', $orderTotal)
                ->where(function ($query) use ($orderTotal) {
                    $query->whereNull('to')->orWhere('to', '>=', $orderTotal);
                })
                ->with(['items', 'shipping'])
                ->first();
                
            if ($priceBasedRule) {
                \Log::info('FreeShippingAutoHandler: Found price-based rule for threshold', [
                    'rule_id' => $priceBasedRule->id,
                    'rule_name' => $priceBasedRule->name,
                    'from' => $priceBasedRule->from,
                    'to' => $priceBasedRule->to
                ]);
                
                // Return empty array to let HandleShippingFeeService handle this rule properly
                // This ensures the rule is processed with all its logic and generates correct options
                return [];
            }
            
            \Log::warning('FreeShippingAutoHandler: No price-based rule found for threshold, using fallback');
            
            return [
                'default' => [
                    'free_shipping_auto' => [
                        'name' => __('Envío Gratis - Área Metropolitana'),
                        'price' => 0,
                        'auto_select' => true,
                        'skip_delivery_process' => true,
                        'is_free' => true,
                        'description' => __('¡Felicidades! Tu pedido califica para envío gratis en el Área Metropolitana.'),
                    ]
                ]
            ];
        }
        
        $freeShippingRules = $this->getFreeShippingRules(
            $orderTotal,
            $city,
            Arr::get($orderData, 'state'),
            Arr::get($orderData, 'country', 'CO')
        );
        
        if (empty($freeShippingRules)) {
            return [];
        }
        
        // Use the first applicable free shipping rule
        $rule = $freeShippingRules[0];
        
        return [
            'default' => [
                'free_shipping_auto' => [
                    'name' => $rule->name ?: __('Free Shipping'),
                    'price' => 0,
                    'auto_select' => true,
                    'skip_delivery_process' => true,
                    'is_free' => true,
                    'rule_id' => $rule->id,
                    'description' => __('Free shipping automatically applied - No delivery selection needed!'),
                ]
            ]
        ];
    }
    
    /**
     * Get free shipping threshold message
     */
    public function getFreeShippingMessage(float $orderTotal): ?string
    {
        $threshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        
        if ($orderTotal >= $threshold) {
            return __('Congratulations! Your order qualifies for free shipping.');
        }
        
        $amountNeeded = $threshold - $orderTotal;
        return __('Add :amount more to get free shipping!', ['amount' => format_price($amountNeeded)]);
    }
    
    /**
     * Check if we should skip shipping selection entirely
     */
    public function shouldSkipShippingSelection(array $orderData): bool
    {
        return $this->shouldAutoApplyFreeShipping($orderData);
    }
}