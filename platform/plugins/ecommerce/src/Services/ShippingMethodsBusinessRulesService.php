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
     * Get available shipping methods based on shipping rules from database
     *
     * This service dynamically loads shipping methods from ec_shipping_rules table
     * Each rule becomes a shipping method option
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
        ]);

        // Get shipping configuration for country
        $shipping = Shipping::where('country', $country)->first();
        if (!$shipping) {
            $shipping = Shipping::whereNull('country')->first();
        }

        if (!$shipping) {
            return [];
        }

        // Get all applicable shipping rules
        $applicableRules = $this->getApplicableRules($shipping, $orderData);

        \Log::info('ShippingMethodsBusinessRulesService: Found applicable rules', [
            'rules_count' => $applicableRules->count(),
            'rules' => $applicableRules->map(fn($rule) => [
                'id' => $rule->id,
                'name' => $rule->name,
                'type' => $rule->type->getValue(),
                'price' => $rule->price,
            ])->toArray()
        ]);

        // Convert rules to shipping methods
        $methods = [];
        foreach ($applicableRules as $rule) {
            $method = $this->convertRuleToMethod($rule, $orderData, $selectedMethod);
            if ($method) {
                $methods[] = $method;
            }
        }

        // Sort by priority (price-based free rules first, then others)
        usort($methods, function($a, $b) {
            // Pickup/free methods first (price = 0)
            if ($a['price'] == 0 && $b['price'] > 0) return -1;
            if ($a['price'] > 0 && $b['price'] == 0) return 1;

            // Then by price
            return $a['price'] <=> $b['price'];
        });

        \Log::info('ShippingMethodsBusinessRulesService: Final methods', [
            'methods_count' => count($methods),
            'methods' => array_map(function($method) {
                return [
                    'id' => $method['id'],
                    'name' => $method['name'],
                    'price' => $method['price'],
                    'is_selected' => $method['is_selected'] ?? false
                ];
            }, $methods)
        ]);

        return $methods;
    }

    /**
     * Get applicable shipping rules based on order data
     */
    protected function getApplicableRules(Shipping $shipping, array $orderData): Collection
    {
        $orderTotal = Arr::get($orderData, 'order_total', 0);
        $city = Arr::get($orderData, 'city');
        $state = Arr::get($orderData, 'state');

        // Get all rules for this shipping region
        $query = ShippingRule::where('shipping_id', $shipping->id);

        // Get price-based rules that apply to current order total
        // Rules must have their "from" threshold met to be shown
        $priceBasedRules = (clone $query)
            ->where('type', ShippingRuleTypeEnum::BASED_ON_PRICE)
            ->where(function($q) use ($orderTotal) {
                // Include rules where order total meets the minimum requirement
                $q->where('from', '<=', $orderTotal)
                  ->where(function($rangeQ) use ($orderTotal) {
                      $rangeQ->whereNull('to')
                             ->orWhere('to', '>=', $orderTotal);
                  });
            })
            ->with('items')
            ->get();

        $locationBasedRules = collect();

        // Get location-based rules only if city is selected
        if ($city) {
            $locationBasedRules = (clone $query)
                ->where('type', ShippingRuleTypeEnum::BASED_ON_LOCATION)
                ->whereHas('items', function($q) use ($city, $state) {
                    $q->where('is_enabled', 1)
                      ->where(function($subQ) use ($city, $state) {
                          // Match exact city
                          $subQ->where('city', $city);

                          // Or match state if city is empty (state-level rules)
                          if ($state) {
                              $subQ->orWhere(function($stateQ) use ($state) {
                                  $stateQ->where('state', $state)
                                        ->whereIn('city', ['', null, 0]);
                              });
                          }
                      });
                })
                ->with(['items' => function($q) {
                    $q->where('is_enabled', 1);
                }])
                ->get();
        }

        // Combine all rules
        return $priceBasedRules->merge($locationBasedRules);
    }

    /**
     * Convert a shipping rule to a shipping method
     */
    protected function convertRuleToMethod(ShippingRule $rule, array $orderData, ?string $selectedMethod): ?array
    {
        $finalPrice = $rule->price;
        $description = $rule->name;

        // Calculate final price for location-based rules
        if ($rule->type == ShippingRuleTypeEnum::BASED_ON_LOCATION && $rule->items->isNotEmpty()) {
            $city = Arr::get($orderData, 'city');
            $state = Arr::get($orderData, 'state');

            // Find matching item
            $ruleItem = $rule->items
                ->where('city', $city)
                ->where('state', $state)
                ->first();

            // Try city-only match
            if (!$ruleItem) {
                $ruleItem = $rule->items
                    ->where('city', $city)
                    ->first();
            }

            // Try state-level match
            if (!$ruleItem && $state) {
                $ruleItem = $rule->items
                    ->where('state', $state)
                    ->whereIn('city', ['', null, 0])
                    ->first();
            }

            if ($ruleItem) {
                $finalPrice = max($rule->price + $ruleItem->adjustment_price, 0);

                if ($ruleItem->city_name) {
                    $description = $rule->name . ' - ' . $ruleItem->city_name;
                }
            } else {
                // No matching location, don't include this rule
                return null;
            }
        }

        // Check if this method is selected
        $isSelected = $selectedMethod == (string)$rule->id;

        return [
            'id' => (string)$rule->id,
            'name' => $rule->name,
            'price' => $finalPrice,
            'description' => $description,
            'is_selected' => $isSelected,
            'priority' => $finalPrice == 0 ? 1 : 2, // Free methods first
            'method_type' => $rule->type->getValue(),
            'is_free' => $finalPrice == 0,
            'rule_id' => $rule->id,
        ];
    }
}