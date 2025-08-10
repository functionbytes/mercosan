<?php

namespace Botble\Ecommerce\Services;

use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Models\Shipping;
use Botble\Ecommerce\Models\ShippingRule;
use Botble\Ecommerce\Enums\ShippingRuleTypeEnum;
use Illuminate\Support\Arr;

class DynamicShippingValidationService
{
    protected HandleShippingFeeService $shippingFeeService;
    
    public function __construct(HandleShippingFeeService $shippingFeeService)
    {
        $this->shippingFeeService = $shippingFeeService;
    }
    
    /**
     * Validate and filter shipping methods based on order total and selected city
     */
    public function validateShippingMethods(array $data): array
    {
        $orderTotal = Arr::get($data, 'order_total', 0);
        $city = Arr::get($data, 'city');
        $state = Arr::get($data, 'state');
        $country = Arr::get($data, 'country');
        
        // Log incoming data for debugging
        \Log::info('DynamicShippingValidation: validateShippingMethods called', [
            'order_total' => $orderTotal,
            'city' => $city,
            'state' => $state,
            'country' => $country,
            'all_data' => $data
        ]);
        
        // Get all available shipping methods with selection context
        $selectedMethod = Arr::get($data, 'shipping_method');
        $selectedOption = Arr::get($data, 'shipping_option');
        $shippingMethods = $this->shippingFeeService->execute($data, $selectedMethod, $selectedOption);
        
        \Log::info('DynamicShippingValidation: Available shipping methods', [
            'methods_count' => count($shippingMethods),
            'methods' => array_keys($shippingMethods)
        ]);
        
        // Filter methods based on order total and location
        $validMethods = $this->filterMethodsByOrderTotal($shippingMethods, $orderTotal, $city, $state, $country);
        
        \Log::info('DynamicShippingValidation: Filtered methods', [
            'original_count' => count($shippingMethods),
            'filtered_count' => count($validMethods),
            'valid_methods' => array_keys($validMethods),
            'original_methods_detail' => $shippingMethods,
            'filtered_methods_detail' => $validMethods
        ]);
        
        // Apply auto-selection logic
        $validMethods = $this->applyAutoSelectionLogic($validMethods);
        
        // Add priority sorting for free shipping
        $validMethods = $this->prioritizeFreeShipping($validMethods);
        
        return $validMethods;
    }
    
    /**
     * Filter shipping methods based on order total
     */
    protected function filterMethodsByOrderTotal(array $methods, float $orderTotal, ?string $city = null, ?string $state = null, ?string $country = null): array
    {
        $filtered = [];
        
        foreach ($methods as $methodKey => $methodOptions) {
            foreach ($methodOptions as $optionKey => $option) {
                $ruleType = Arr::get($option, 'rule_type');
                $isValid = true;
                
                // For price-based rules, validate the order total is within range
                if ($ruleType === ShippingRuleTypeEnum::BASED_ON_PRICE) {
                    $ruleId = Arr::get($option, 'rule_id');
                    if ($ruleId) {
                        $rule = ShippingRule::find($ruleId);
                        if ($rule) {
                            $isValid = $this->validatePriceRange($rule, $orderTotal);
                        }
                    }
                    // If no rule_id, it's a built-in method like pickup - always valid
                }
                
                // For location-based rules, validate the city/state
                if ($ruleType === ShippingRuleTypeEnum::BASED_ON_LOCATION && $city) {
                    $ruleId = Arr::get($option, 'rule_id');
                    if ($ruleId) {
                        $rule = ShippingRule::find($ruleId);
                        if ($rule) {
                            $isValid = $this->validateLocationRule($rule, $city, $state);
                            \Log::info('DynamicShippingValidation: Location rule validation', [
                                'rule_id' => $rule->id,
                                'rule_name' => $rule->name,
                                'option_key' => $optionKey,
                                'method_key' => $methodKey,
                                'city' => $city,
                                'is_valid' => $isValid
                            ]);
                        }
                    }
                    // If no rule_id, it's a built-in method - always valid for location
                }
                
                if ($isValid) {
                    if (!isset($filtered[$methodKey])) {
                        $filtered[$methodKey] = [];
                    }
                    $filtered[$methodKey][$optionKey] = $option;
                }
            }
        }
        
        return $filtered;
    }
    
    /**
     * Validate if order total is within the price range of the rule
     */
    protected function validatePriceRange(ShippingRule $rule, float $orderTotal): bool
    {
        if ($rule->type !== ShippingRuleTypeEnum::BASED_ON_PRICE) {
            return true;
        }
        
        $withinMinimum = $orderTotal >= $rule->from;
        $withinMaximum = is_null($rule->to) || $orderTotal <= $rule->to;
        
        return $withinMinimum && $withinMaximum;
    }
    
    /**
     * Validate if the location rule applies to the selected city/state
     */
    protected function validateLocationRule(ShippingRule $rule, string $city, ?string $state = null): bool
    {
        if ($rule->type !== ShippingRuleTypeEnum::BASED_ON_LOCATION) {
            return true;
        }
        
        // Log para debugging
        \Log::info('DynamicShippingValidation: Validating location rule', [
            'rule_id' => $rule->id,
            'rule_name' => $rule->name,
            'city' => $city,
            'state' => $state,
            'city_is_numeric' => is_numeric($city)
        ]);
        
        // Check if rule has specific items for this location
        // Handle both numeric city IDs and string city names
        $hasLocationItem = $rule->items()
            ->where('is_enabled', true)
            ->where(function ($query) use ($city, $state) {
                // Compare city as both ID and name
                if (is_numeric($city)) {
                    $query->where('city', $city);
                } else {
                    // If city is a string, try both exact match and case-insensitive
                    $query->where('city', $city)
                          ->orWhere('city', 'like', '%' . $city . '%');
                }
                
                if ($state) {
                    if (is_numeric($state)) {
                        $query->where('state', $state);
                    } else {
                        $query->where('state', $state)
                              ->orWhere('state', 'like', '%' . $state . '%');
                    }
                }
            })
            ->exists();
            
        // Log rule items for debugging
        $ruleItems = $rule->items()
            ->where('is_enabled', true)
            ->select('city', 'state', 'is_enabled')
            ->get()
            ->toArray();
            
        \Log::info('DynamicShippingValidation: Rule items', [
            'rule_id' => $rule->id,
            'items' => $ruleItems,
            'has_location_item' => $hasLocationItem
        ]);
            
        // If no specific location item, check if rule applies to all locations in this state
        if (!$hasLocationItem && $state) {
            $hasStateItem = $rule->items()
                ->where('is_enabled', true)
                ->where(function ($query) use ($state) {
                    if (is_numeric($state)) {
                        $query->where('state', $state);
                    } else {
                        $query->where('state', $state)
                              ->orWhere('state', 'like', '%' . $state . '%');
                    }
                })
                ->whereIn('city', ['', null, 0])
                ->exists();
                
            \Log::info('DynamicShippingValidation: State-only rule check', [
                'rule_id' => $rule->id,
                'state' => $state,
                'has_state_item' => $hasStateItem
            ]);
                
            return $hasStateItem;
        }
        
        return $hasLocationItem;
    }
    
    /**
     * Apply auto-selection logic when only one method is available
     */
    protected function applyAutoSelectionLogic(array $methods): array
    {
        $totalMethods = 0;
        $hasFreeShipping = false;
        $hasCitySpecificRate = false;
        
        // Count methods and check for free shipping and city-specific rates
        foreach ($methods as $methodOptions) {
            $totalMethods += count($methodOptions);
            foreach ($methodOptions as $option) {
                if ((float) $option['price'] === 0.0) {
                    $hasFreeShipping = true;
                }
                if (Arr::get($option, 'rule_type') === ShippingRuleTypeEnum::BASED_ON_LOCATION) {
                    $hasCitySpecificRate = true;
                }
            }
        }
        
        // Don't auto-apply free shipping if city-specific rates are available
        if ($hasFreeShipping && !$hasCitySpecificRate) {
            foreach ($methods as $methodKey => $methodOptions) {
                foreach ($methodOptions as $optionKey => $option) {
                    if ((float) $option['price'] === 0.0) {
                        $methods[$methodKey][$optionKey]['auto_select'] = true;
                        $methods[$methodKey][$optionKey]['skip_delivery_process'] = true;
                        $methods[$methodKey][$optionKey]['description'] = $this->getAutoSelectedMethodDescription($option);
                    }
                }
            }
        }
        // If only one method available (and not conflicting with city rates), mark it for auto-selection
        elseif ($totalMethods === 1) {
            foreach ($methods as $methodKey => $methodOptions) {
                foreach ($methodOptions as $optionKey => $option) {
                    $methods[$methodKey][$optionKey]['auto_select'] = true;
                    $methods[$methodKey][$optionKey]['description'] = $this->getAutoSelectedMethodDescription($option);
                }
            }
        }
        
        return $methods;
    }
    
    /**
     * Prioritize free shipping methods
     */
    protected function prioritizeFreeShipping(array $methods): array
    {
        $result = [];
        
        // Process each method group (e.g., "default")
        foreach ($methods as $methodKey => $methodOptions) {
            $freeOptions = [];
            $paidOptions = [];
            
            // Separate free and paid options within this method group
            foreach ($methodOptions as $optionKey => $option) {
                if ((float) $option['price'] === 0.0) {
                    $option['is_free'] = true;
                    $freeOptions[$optionKey] = $option;
                } else {
                    $paidOptions[$optionKey] = $option;
                }
            }
            
            // Merge free options first, then paid options, preserving the method key
            $result[$methodKey] = array_merge($freeOptions, $paidOptions);
        }
        
        return $result;
    }
    
    /**
     * Get description for auto-selected method
     */
    protected function getAutoSelectedMethodDescription(array $option): string
    {
        $price = (float) $option['price'];
        
        if ($price === 0.0) {
            return __('Free shipping automatically applied - No delivery selection needed!');
        }
        
        $citySpecific = Arr::get($option, 'city_specific', false);
        if ($citySpecific && Arr::get($option, 'city_name')) {
            return __('Automatically selected - Special rate for :city', ['city' => $option['city_name']]);
        }
        
        return __('Automatically selected - Only shipping method available');
    }
    
    /**
     * Get shipping methods summary for order total
     */
    public function getShippingMethodsSummary(float $orderTotal, ?string $city = null): array
    {
        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
        $hasFreeShipping = $orderTotal >= $freeShippingThreshold;
        
        // Always disable automatic free shipping messages when city-specific rates are available
        $summary = [
            'has_free_shipping' => false, // Disable automatic free shipping
            'free_shipping_threshold' => $freeShippingThreshold,
            'amount_to_free_shipping' => 0, // Don't show amount needed for free shipping
            'city_based_rates_available' => $this->hasCityBasedRates($city),
            'skip_delivery_selection' => false, // Always allow delivery selection
            'auto_applied_free_shipping' => false, // Never auto-apply
        ];
        
        return $summary;
    }
    
    /**
     * Check if city has specific shipping rates
     */
    protected function hasCityBasedRates(?string $city = null): bool
    {
        if (!$city || !EcommerceHelper::loadCountriesStatesCitiesFromPluginLocation()) {
            return false;
        }
        
        return ShippingRule::whereHas('items', function ($query) use ($city) {
            $query->where('city', $city)->where('is_enabled', true);
        })->exists();
    }
}