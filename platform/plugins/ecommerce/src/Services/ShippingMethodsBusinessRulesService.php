<?php

namespace Botble\Ecommerce\Services;

use Botble\Ecommerce\Enums\ShippingRuleTypeEnum;
use Botble\Ecommerce\Models\ShippingRule;
use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Models\Shipping;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ShippingMethodsBusinessRulesService
{
    /**
     * Get shipping methods according to business rules
     * 
     * Business Rules:
     * 1. Recoger en tienda: Always available for any order, must appear first in the list
     * 2. Domicilio (de pago): Only available if order total < free shipping threshold AND
     *    there is an applicable shipping rule for the selected city/address
     * 3. Domicilio (gratis): Available when:
     *    - Order total >= free shipping threshold, OR
     *    - There is a shipping rule that grants free shipping for the city/address
     * 
     * Priority order: Pickup → Free Delivery → Paid Delivery
     * Always return complete list of available methods, marking selected with is_selected
     */
    public function getAvailableShippingMethods(array $orderData, ?string $selectedMethod = null): array
    {
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        $country = Arr::get($orderData, 'country', EcommerceHelper::getFirstCountryId());
        
        // Extract selected method from different possible sources
        if (!$selectedMethod) {
            $selectedMethod = Arr::get($orderData, 'shipping_option');
        }
        if (!$selectedMethod) {
            $selectedMethod = Arr::get($orderData, 'shipping_option_from_data');
        }
        
        \Log::info('ShippingMethodsBusinessRulesService: Getting available shipping methods', [
            'order_total' => $orderTotal,
            'city' => $city,
            'state' => $state,
            'selected_method' => $selectedMethod,
            'shipping_option_from_data' => Arr::get($orderData, 'shipping_option'),
            'all_order_data_keys' => array_keys($orderData)
        ]);
        
        $methods = [];
        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        
        // 1. ALWAYS add "Recoger en tienda" first (always available, highest priority)
        $methods[] = $this->createPickupMethod($selectedMethod);
        
        // 2. Find applicable shipping rules for the location
        $applicableRules = $this->findApplicableRules($orderData, $country);
        $validRules = $this->filterValidRules($applicableRules, $orderData);
        
        \Log::info('ShippingMethodsBusinessRulesService: Found applicable rules', [
            'rules_count' => $applicableRules->count(),
            'valid_rules_count' => $validRules->count(),
            'free_shipping_threshold' => $freeShippingThreshold,
            'order_total' => $orderTotal,
            'applicable_rules_details' => $applicableRules->map(fn($rule) => [
                'id' => $rule->id,
                'name' => $rule->name,
                'type' => $rule->type->getValue(),
                'price' => $rule->price,
                'from' => $rule->from,
                'to' => $rule->to,
                'items_count' => $rule->items->count()
            ])->toArray(),
            'valid_rules_details' => $validRules->map(fn($rule) => [
                'id' => $rule->id,
                'name' => $rule->name,
                'type' => $rule->type->getValue(),
                'price' => $rule->price,
                'from' => $rule->from,
                'to' => $rule->to,
                'items_count' => $rule->items->count()
            ])->toArray()
        ]);
        
        // 3. Check eligibility conditions
        $isThresholdFreeShippingEligible = $orderTotal >= $freeShippingThreshold;
        $hasFreeShippingRules = $validRules->filter(fn($rule) => $rule->price == 0)->isNotEmpty();
        $hasPaidShippingRules = $validRules->filter(fn($rule) => $rule->price > 0)->isNotEmpty();
        
        \Log::info('ShippingMethodsBusinessRulesService: Eligibility conditions', [
            'isThresholdFreeShippingEligible' => $isThresholdFreeShippingEligible,
            'hasFreeShippingRules' => $hasFreeShippingRules,
            'hasPaidShippingRules' => $hasPaidShippingRules,
            'free_rules' => $validRules->filter(fn($rule) => $rule->price == 0)->map(fn($rule) => ['id' => $rule->id, 'name' => $rule->name, 'price' => $rule->price])->toArray(),
            'paid_rules' => $validRules->filter(fn($rule) => $rule->price > 0)->map(fn($rule) => ['id' => $rule->id, 'name' => $rule->name, 'price' => $rule->price])->toArray()
        ]);
        
        // 4. Apply business rules logic
        if ($isThresholdFreeShippingEligible) {
            // Order >= threshold: Add "Domicilio (Gratis)" due to threshold
            $methods[] = $this->createFreeDeliveryMethod($selectedMethod);
        } else {
            // Order < threshold: Prioritize PAID rules over FREE rules (as per business requirements)
            if ($hasPaidShippingRules) {
                // Has paid shipping rule for this city: Add "Domicilio" with price (priority for < threshold)
                foreach ($validRules->filter(fn($rule) => $rule->price > 0) as $rule) {
                    $methods[] = $this->createPaidDeliveryMethodFromRule($rule, $orderData, $selectedMethod);
                    break; // Only add one paid delivery method
                }
            } elseif ($hasFreeShippingRules) {
                // Has free shipping rule for this city: Add "Domicilio (Gratis)" (fallback when no paid rules)
                foreach ($validRules->filter(fn($rule) => $rule->price == 0) as $rule) {
                    $methods[] = $this->createFreeDeliveryMethodFromRule($rule, $selectedMethod);
                    break; // Only add one free delivery method
                }
            }
            // If no city-specific rules found, only "Recoger en tienda" will be available
        }
        
        // Remove null methods and re-index
        $methods = array_values(array_filter($methods));
        
        \Log::info('ShippingMethodsBusinessRulesService: Final methods according to business rules', [
            'methods_count' => count($methods),
            'threshold_eligible' => $isThresholdFreeShippingEligible,
            'has_free_rules' => $hasFreeShippingRules,
            'has_paid_rules' => $hasPaidShippingRules,
            'methods' => array_map(function($method) {
                return [
                    'id' => $method['id'],
                    'name' => $method['name'],
                    'price' => $method['price'],
                    'priority' => $method['priority'],
                    'is_selected' => $method['is_selected'] ?? false
                ];
            }, $methods)
        ]);
        
        return $methods;
    }
    
    /**
     * Create "Recoger en tienda" method (always available, highest priority)
     */
    protected function createPickupMethod(?string $selectedMethod): array
    {
        // Check various possible pickup identifiers
        $isSelected = in_array($selectedMethod, ['pickup', '7', 'store_pickup', 'recoger_en_tienda'], true);
        
        return [
            'id' => 'pickup',
            'name' => __('plugins/ecommerce::shipping.pickup_method_name'),
            'price' => 0,
            'description' => __('plugins/ecommerce::shipping.pickup_method_description'),
            'is_selected' => $isSelected,
            'priority' => 1,
            'method_type' => 'pickup',
            'is_free' => true
        ];
    }
    
    /**
     * Create "Domicilio (Gratis)" method for threshold-based free shipping
     */
    protected function createFreeDeliveryMethod(?string $selectedMethod): array
    {
        // Check various possible free delivery identifiers
        $isSelected = in_array($selectedMethod, ['free_delivery', 'domicilio_gratis', 'envio_gratis'], true);
        
        return [
            'id' => 'free_delivery',
            'name' => __('plugins/ecommerce::shipping.free_delivery_method_name'),
            'price' => 0,
            'description' => __('plugins/ecommerce::shipping.free_delivery_threshold_description'),
            'is_selected' => $isSelected,
            'priority' => 2,
            'method_type' => 'free_delivery',
            'is_free' => true
        ];
    }
    
    /**
     * Create "Domicilio (Gratis)" method from free shipping rule
     */
    protected function createFreeDeliveryMethodFromRule(ShippingRule $rule, ?string $selectedMethod): array
    {
        $methodId = 'free_delivery_rule_' . $rule->id;
        $isSelected = in_array($selectedMethod, [$methodId, 'free_delivery'], true);
        
        return [
            'id' => $methodId,
            'name' => __('plugins/ecommerce::shipping.free_delivery_method_name'),
            'price' => 0,
            'description' => $rule->name ?: __('plugins/ecommerce::shipping.free_delivery_rule_description'),
            'is_selected' => $isSelected,
            'priority' => 2,
            'method_type' => 'free_delivery',
            'rule_id' => $rule->id,
            'is_free' => true
        ];
    }
    
    /**
     * Create "Domicilio" method with price from shipping rule
     */
    protected function createPaidDeliveryMethodFromRule(ShippingRule $rule, array $orderData, ?string $selectedMethod): array
    {
        $finalPrice = $this->calculateFinalPrice($rule, $orderData);
        $description = $this->generatePriceDescription($rule, $orderData, $finalPrice);
        $methodId = 'paid_delivery_' . $rule->id;
        $isSelected = in_array($selectedMethod, [$methodId, 'paid_delivery'], true);
        
        return [
            'id' => $methodId,
            'name' => __('plugins/ecommerce::shipping.paid_delivery_method_name'),
            'price' => $finalPrice,
            'description' => $description,
            'is_selected' => $isSelected,
            'priority' => 3,
            'method_type' => 'paid_delivery',
            'rule_id' => $rule->id,
            'is_free' => false
        ];
    }
    
    /**
     * Find applicable shipping rules for the given order data
     */
    protected function findApplicableRules(array $orderData, string $country): Collection
    {
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        
        // Get shipping configuration for country
        $shipping = Shipping::where('country', $country)->first();
        if (!$shipping) {
            $shipping = Shipping::whereNull('country')->first();
        }
        
        if (!$shipping) {
            return collect();
        }
        
        $rules = collect();
        
        // 1. Location-based rules (city/state specific)
        if ($city && EcommerceHelper::loadCountriesStatesCitiesFromPluginLocation()) {
            $locationRules = ShippingRule::where('shipping_id', $shipping->id)
                ->where('type', ShippingRuleTypeEnum::BASED_ON_LOCATION)
                ->whereHas('items', function (Builder $query) use ($city, $state) {
                    $query->where('is_enabled', 1)
                          ->where(function ($subQuery) use ($city, $state) {
                              // Match exact city
                              $subQuery->where('city', $city);
                              // Also match state if city is empty (state-level rules)
                              if ($state) {
                                  $subQuery->orWhere(function ($stateQuery) use ($state) {
                                      $stateQuery->where('state', $state)
                                                ->whereIn('city', ['', null, 0]);
                                  });
                              }
                          });
                })
                ->with(['items'])
                ->get();
            
            $rules = $rules->merge($locationRules);
        }
        
        // 2. Price-based rules
        $priceRules = ShippingRule::where('shipping_id', $shipping->id)
            ->where('type', ShippingRuleTypeEnum::BASED_ON_PRICE)
            ->where('from', '<=', $orderTotal)
            ->where(function (Builder $sub) use ($orderTotal) {
                $sub->whereNull('to')->orWhere('to', '>=', $orderTotal);
            })
            ->with(['items'])
            ->get();
        
        $rules = $rules->merge($priceRules);
        
        return $rules;
    }
    
    /**
     * Filter rules that are actually valid for the order data
     * This ensures we only return rules that can actually be applied
     */
    protected function filterValidRules(Collection $rules, array $orderData): Collection
    {
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        
        return $rules->filter(function (ShippingRule $rule) use ($orderData, $city, $state) {
            switch ($rule->type) {
                case ShippingRuleTypeEnum::BASED_ON_LOCATION:
                    // Location rules require city or state to be present
                    if (!$city && !$state) {
                        return false;
                    }
                    
                    // Check if rule has matching enabled items for this location
                    $matchingItem = $rule->items->where('is_enabled', 1)->first(function ($item) use ($city, $state) {
                        // Exact city match
                        if ($item->city && $item->city == $city) {
                            return true;
                        }
                        // State-level match when city is empty in rule
                        if ($item->state && $item->state == $state && (!$item->city || $item->city == '')) {
                            return true;
                        }
                        return false;
                    });
                    
                    return $matchingItem !== null;
                
                case ShippingRuleTypeEnum::BASED_ON_PRICE:
                    // Price rules are already filtered in findApplicableRules by price range
                    return true;
                
                default:
                    // Other rule types (weight, zipcode, etc.) are considered valid if found
                    return true;
            }
        });
    }
    
    /**
     * Calculate final price including adjustments from rule items
     */
    protected function calculateFinalPrice(ShippingRule $rule, array $orderData): float
    {
        $basePrice = $rule->price;
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');
        
        if ($rule->type == ShippingRuleTypeEnum::BASED_ON_LOCATION) {
            // Find the specific rule item for location-based adjustments
            $ruleItem = $rule->items
                ->where('is_enabled', 1)
                ->where('city', $city)
                ->where('state', $state)
                ->first();
            
            // If no exact match, try city only
            if (!$ruleItem) {
                $ruleItem = $rule->items
                    ->where('is_enabled', 1)
                    ->where('city', $city)
                    ->first();
            }
            
            // If still no match, try state only
            if (!$ruleItem && $state) {
                $ruleItem = $rule->items
                    ->where('is_enabled', 1)
                    ->where('state', $state)
                    ->whereIn('city', ['', null, 0])
                    ->first();
            }
            
            if ($ruleItem) {
                $basePrice += $ruleItem->adjustment_price;
            }
        }
        
        return max($basePrice, 0);
    }
    
    /**
     * Generate description for paid delivery methods
     */
    protected function generatePriceDescription(ShippingRule $rule, array $orderData, float $finalPrice): string
    {
        $city = Arr::get($orderData, 'city');
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        $amountToFreeShipping = max(0, $freeShippingThreshold - $orderTotal);
        
        $cityName = $city ?: 'tu ubicación';
        $formattedPrice = number_format($finalPrice, 0, ',', '.');
        
        $description = __('plugins/ecommerce::shipping.delivery_to_city', ['city' => $cityName]) . ' - ' . __('plugins/ecommerce::shipping.delivery_price', ['price' => $formattedPrice]);
        
        if ($amountToFreeShipping > 0) {
            $amountFormatted = number_format($amountToFreeShipping, 0, ',', '.');
            $description .= ' | ' . __('plugins/ecommerce::shipping.add_amount_for_free_shipping', ['amount' => $amountFormatted]);
        }
        
        return $description;
    }
}