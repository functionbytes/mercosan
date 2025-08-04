<?php

namespace Botble\Ecommerce\Services;

use Botble\Base\Models\BaseModel;
use Botble\Ecommerce\Enums\ShippingMethodEnum;
use Botble\Ecommerce\Enums\ShippingRuleTypeEnum;
use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Models\Shipping;
use Botble\Ecommerce\Models\ShippingRule;
use Botble\Support\Services\Cache\Cache;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class HandleShippingFeeService
{
    protected array $shipping;

    protected ?BaseModel $shippingDefault = null;

    protected array $shippingRules;

    protected bool $useCache;

    protected Cache $cache;

    public function __construct()
    {
        $this->shipping = [];
        $this->shippingRules = [];

        $this->cache = Cache::make(static::class);
        $this->useCache = true;
    }

    public function execute(array $data, ?string $method = null, ?string $option = null): array
    {
        $result = [];

        $cacheKey = $this->getCacheKey($data);
        $cacheValue = null; // Temporarily disable cache for city-specific rules
        // $cacheValue = $this->getCacheValue($cacheKey);
        if ($cacheValue) {
            $result[ShippingMethodEnum::DEFAULT] = $cacheValue;
        } else {
            $default = $this->getShippingFee($data, ShippingMethodEnum::DEFAULT, $option);

            if ($default) {
                $result[ShippingMethodEnum::DEFAULT] = $default;
            }

            $this->setCacheValue($cacheKey, $default);
        }

        $result = apply_filters('handle_shipping_fee', $result, $data, $option);

        if ($method) {
            $options = Arr::get($result, $method, []);

            if (! is_array($options) || ! count($options)) {
                return [];
            }

            $filtered = Arr::where($options, function ($rate) {
                return ! Arr::get($rate, 'disabled');
            });

            $response = Arr::get($filtered, $option);

            return $response ? [$response] : [];
        }

        // Enhanced logic for hiding options
        $hideOtherOptionsIfFree = get_ecommerce_setting('hide_other_shipping_options_if_it_has_free_shipping', false);
        
        if ($hideOtherOptionsIfFree) {
            $hasFreeShipping = false;

            foreach ($result as $item) {
                foreach ($item as $option) {
                    if ((float) $option['price'] == 0) {
                        $hasFreeShipping = true;
                        break;
                    }
                }
            }

            if ($hasFreeShipping) {
                foreach ($result as $itemKey => $item) {
                    foreach ($item as $optionKey => $option) {
                        if ((float) $option['price'] > 0) {
                            Arr::forget($result, $itemKey . '.' . $optionKey);
                        }
                    }
                }
            }
        }
        

        return $result;
    }

    protected function getShippingFee(array $data, string $method, ?string $option = null): array
    {
        $weight = EcommerceHelper::validateOrderWeight(Arr::get($data, 'weight'));

        $orderTotal = Arr::get($data, 'order_total', 0);

        if (EcommerceHelper::isUsingInMultipleCountries()) {
            $country = Arr::get($data, 'country');
        } else {
            $country = EcommerceHelper::getFirstCountryId();
        }

        $result = [];
        if ($method == ShippingMethodEnum::DEFAULT) {
            $methodKey = $method . '-' . $country;
            if (Arr::has($this->shipping, $methodKey)) {
                $shipping = Arr::get($this->shipping, $methodKey);
            } else {
                $shipping = Shipping::query()
                    ->where('country', $country)
                    ->first();
                Arr::set($this->shipping, $methodKey, $shipping);
            }

            if (! empty($shipping)) {
                $result = $this->calculateDefaultFeeByAddress(
                    $shipping,
                    $weight,
                    $orderTotal,
                    $data,
                    $option
                );
            }

            if (empty($result)) {
                if ($this->shippingDefault) {
                    $default = $this->shippingDefault;
                } else {
                    /**
                     * @var Shipping $default
                     */
                    $default = Shipping::query()
                        ->whereNull('country')
                        ->first();
                    $this->shippingDefault = $default;
                }

                /**
                 * @var Shipping $default
                 */
                $result = $this->calculateDefaultFeeByAddress(
                    $default,
                    $weight,
                    $orderTotal,
                    $data,
                    $option
                );
            }
        }

        if ($result) {
            $result = collect($result);

            if (get_ecommerce_setting('sort_shipping_options_direction', 'price_lower_to_higher') == 'price_lower_to_higher') {
                $result = $result->sortBy('price');
            } else {
                $result = $result->sortByDesc('price');
            }

            $result = $result->toArray();
        }

        return $result;
    }

    protected function calculateDefaultFeeByAddress(
        ?Shipping $shipping,
        int|float $weight,
        int|float $orderTotal,
        array $data,
        string $option = null
    ): array {
        $result = [];

        if ($shipping) {
            $city = Arr::get($data, 'city');
            $state = Arr::get($data, 'state');
            
            \Log::info('HandleShippingFeeService: calculateDefaultFeeByAddress called', [
                'city' => $city,
                'state' => $state,
                'option' => $option,
                'shipping_id' => $shipping->getKey()
            ]);
            
            // If we have a city, look for all applicable rules, not just the specific option
            if ($city && $option) {
                \Log::info('HandleShippingFeeService: Processing city-specific rules', [
                    'city' => $city,
                    'option' => $option
                ]);
                
                // First check if this specific option rule applies to the city
                $ruleKey = 'rule-option-' . $option;
                if (Arr::has($this->shippingRules, $ruleKey)) {
                    $rule = Arr::get($this->shippingRules, $ruleKey);
                } else {
                    $rule = ShippingRule::query()->with(['items'])->find($option);
                    Arr::set($this->shippingRules, $ruleKey, $rule);
                }
                
                \Log::info('HandleShippingFeeService: Current rule found', [
                    'rule_id' => $rule ? $rule->id : null,
                    'rule_name' => $rule ? $rule->name : null
                ]);
                
                // Check if the current rule has city-specific configuration
                if ($rule) {
                    $citySpecificRule = $rule->items()
                        ->where('city', $city)
                        ->where('is_enabled', 1)
                        ->first();
                        
                    \Log::info('HandleShippingFeeService: City-specific rule check', [
                        'rule_id' => $rule->id,
                        'city' => $city,
                        'has_city_specific' => $citySpecificRule ? true : false,
                        'city_specific_adjustment' => $citySpecificRule ? $citySpecificRule->adjustment_price : null
                    ]);
                        
                    if (!$citySpecificRule) {
                        // Current rule doesn't apply to this city, find rules that do
                        \Log::info('HandleShippingFeeService: Current rule does not apply to city, searching for applicable rules');
                        $rule = null;
                    }
                }
                
                // If current rule doesn't apply, find the best rule for this city
                if (!$rule || !$rule->items()->where('city', $city)->where('is_enabled', 1)->exists()) {
                    \Log::info('HandleShippingFeeService: Searching for city-specific rules', [
                        'shipping_id' => $shipping->getKey(),
                        'city' => $city
                    ]);
                    
                    $cityRules = ShippingRule::query()
                        ->where('shipping_id', $shipping->getKey())
                        ->whereHas('items', function ($query) use ($city) {
                            $query->where('city', $city)->where('is_enabled', 1);
                        })
                        ->with(['items'])
                        ->get();
                        
                    \Log::info('HandleShippingFeeService: City rules found', [
                        'count' => $cityRules->count(),
                        'rules' => $cityRules->map(function ($r) {
                            return ['id' => $r->id, 'name' => $r->name, 'price' => $r->price];
                        })->toArray()
                    ]);
                        
                    // Use the first applicable rule for this city
                    $rule = $cityRules->first();
                }
            } else if ($option) {
                // Fallback to original logic when no city specified
                $ruleKey = 'rule-option-' . $option;
                if (Arr::has($this->shippingRules, $ruleKey)) {
                    $rule = Arr::get($this->shippingRules, $ruleKey);
                } else {
                    $rule = ShippingRule::query()->with(['items'])->find($option);
                    Arr::set($this->shippingRules, $ruleKey, $rule);
                }
            } else {
                $rule = null;
            }

            if ($rule) {
                $ruleDetail = $rule
                    ->items
                    ->where('city', $city)
                    ->where('is_enabled', 1)
                    ->first();
                if ($ruleDetail) {
                    $finalPrice = $rule->price + $ruleDetail->adjustment_price;
                    $result[$rule->id] = [
                        'name' => $rule->name,
                        'price' => $finalPrice,
                        'city_specific' => true,
                        'city_name' => $ruleDetail->city_name ?? null,
                        'state_name' => $ruleDetail->state_name ?? null,
                        'rule_type' => $rule->type->getValue(),
                    ];
                } else {
                    $result[$rule->id] = [
                        'name' => $rule->name,
                        'price' => $rule->price,
                        'city_specific' => false,
                        'rule_type' => $rule->type->getValue(),
                    ];
                }
            } else {
                \Log::info('HandleShippingFeeService: Searching for all applicable rules', [
                    'city' => $city,
                    'state' => $state,
                    'shipping_id' => $shipping->getKey()
                ]);
                
                $zipCode = Arr::get($data, 'address_to.zip_code');

                // First, prioritize city-specific location-based rules if we have a city
                if ($city && EcommerceHelper::loadCountriesStatesCitiesFromPluginLocation()) {
                    \Log::info('HandleShippingFeeService: Searching for city-specific location rules first');
                    
                    $cityRules = ShippingRule::query()
                        ->where('shipping_id', $shipping->getKey())
                        ->where('type', ShippingRuleTypeEnum::BASED_ON_LOCATION)
                        ->whereHas('items', function (Builder $query) use ($city, $state): void {
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
                        ->with([
                            'items' => function ($query): void {
                                $query
                                    ->where('is_enabled', 1)
                                    ->orderBy('adjustment_price');
                            },
                        ])
                        ->get();
                        
                    \Log::info('HandleShippingFeeService: City-specific rules found', [
                        'count' => $cityRules->count(),
                        'rules' => $cityRules->map(function ($r) {
                            return [
                                'id' => $r->id,
                                'name' => $r->name,
                                'price' => $r->price,
                                'type' => $r->type->getValue(),
                                'items' => $r->items->map(function ($item) {
                                    return [
                                        'city' => $item->city,
                                        'state' => $item->state,
                                        'adjustment_price' => $item->adjustment_price,
                                        'is_enabled' => $item->is_enabled
                                    ];
                                })->toArray()
                            ];
                        })->toArray()
                    ]);
                    
                    if ($cityRules->isNotEmpty()) {
                        $rules = $cityRules;
                    } else {
                        // Fall back to general rules if no city-specific rules found
                        $rules = $this->getGeneralShippingRules($shipping, $orderTotal, $weight, $zipCode);
                    }
                } else {
                    // No city specified, get general rules
                    $rules = $this->getGeneralShippingRules($shipping, $orderTotal, $weight, $zipCode);
                }

                \Log::info('HandleShippingFeeService: All rules found', [
                    'rules_count' => $rules->count(),
                    'rules' => $rules->map(function ($r) {
                        return [
                            'id' => $r->id,
                            'name' => $r->name,
                            'price' => $r->price,
                            'type' => $r->type->getValue(),
                            'items_count' => $r->items->count(),
                            'items' => $r->items->map(function ($item) {
                                return [
                                    'city' => $item->city,
                                    'state' => $item->state,
                                    'adjustment_price' => $item->adjustment_price,
                                    'is_enabled' => $item->is_enabled
                                ];
                            })->toArray()
                        ];
                    })->toArray()
                ]);

                \Log::info('HandleShippingFeeService: Processing rules in foreach loop', [
                    'rules_count' => $rules->count(),
                    'city' => $city,
                    'state' => $state
                ]);

                foreach ($rules as $rule) {
                    \Log::info('HandleShippingFeeService: Processing rule in loop', [
                        'rule_id' => $rule->id,
                        'rule_type' => $rule->type->getValue(),
                        'rule_name' => $rule->name
                    ]);
                    switch ($rule->type) {
                        case ShippingRuleTypeEnum::BASED_ON_ZIPCODE:
                            $ruleItem = $rule
                                ->items
                                ->where('zip_code', $zipCode)
                                ->first();

                            if (! $ruleItem) {
                                continue 2;
                            }

                            break;
                        case ShippingRuleTypeEnum::BASED_ON_LOCATION:
                            \Log::info('HandleShippingFeeService: Processing BASED_ON_LOCATION rule', [
                                'rule_id' => $rule->id,
                                'city' => $city,
                                'state' => $state,
                                'rule_items' => $rule->items->map(function ($item) {
                                    return [
                                        'city' => $item->city,
                                        'state' => $item->state,
                                        'adjustment_price' => $item->adjustment_price,
                                        'is_enabled' => $item->is_enabled
                                    ];
                                })->toArray()
                            ]);
                            
                            // First try exact match with state and city
                            $ruleItem = $rule
                                ->items
                                ->where('state', $state)
                                ->where('city', $city)
                                ->first();
                                
                            \Log::info('HandleShippingFeeService: Exact state+city match', [
                                'found' => $ruleItem ? true : false,
                                'ruleItem' => $ruleItem ? [
                                    'city' => $ruleItem->city,
                                    'state' => $ruleItem->state,
                                    'adjustment_price' => $ruleItem->adjustment_price
                                ] : null
                            ]);

                            // If no exact match, try city match only (ignore state requirement)
                            if (! $ruleItem) {
                                $ruleItem = $rule
                                    ->items
                                    ->where('city', $city)
                                    ->first();
                                    
                                \Log::info('HandleShippingFeeService: City-only match', [
                                    'found' => $ruleItem ? true : false,
                                    'ruleItem' => $ruleItem ? [
                                        'city' => $ruleItem->city,
                                        'state' => $ruleItem->state,
                                        'adjustment_price' => $ruleItem->adjustment_price
                                    ] : null
                                ]);
                            }

                            // If still no match, try state-level rules (city empty)
                            if (! $ruleItem && $state) {
                                $ruleItem = $rule
                                    ->items
                                    ->where('state', $state)
                                    ->whereIn('city', ['', null, 0])
                                    ->first();
                                    
                                \Log::info('HandleShippingFeeService: State-level match', [
                                    'found' => $ruleItem ? true : false,
                                    'ruleItem' => $ruleItem ? [
                                        'city' => $ruleItem->city,
                                        'state' => $ruleItem->state,
                                        'adjustment_price' => $ruleItem->adjustment_price
                                    ] : null
                                ]);
                            }

                            break;
                        default:
                            $ruleItem = $rule
                                ->items
                                ->where('state', $state)
                                ->where('city', $city)
                                ->first();

                            break;
                    }

                    if ($ruleItem) {
                        $finalPrice = max($rule->price + $ruleItem->adjustment_price, 0);
                        
                        // Get free shipping threshold from settings
                        $freeShippingThreshold = get_ecommerce_setting('free_shipping_threshold', 200000);
                        $currentOrderTotal = Arr::get($data, 'order_total', 0);
                        $isEligibleForFreeShipping = $currentOrderTotal >= $freeShippingThreshold;
                        $amountToFreeShipping = max(0, $freeShippingThreshold - $currentOrderTotal);
                        
                        // Create enhanced description
                        $cityName = $ruleItem->city_name ?? 'esta ciudad';
                        $basePrice = number_format($rule->price, 0, ',', '.');
                        $adjustmentPrice = number_format($ruleItem->adjustment_price, 0, ',', '.');
                        $totalPrice = number_format($finalPrice, 0, ',', '.');
                        
                        $description = "Tarifa especial para {$cityName}";
                        if ($ruleItem->adjustment_price > 0) {
                            $description .= " - Base: $ {$basePrice} + $ {$adjustmentPrice} = $ {$totalPrice}";
                        } else {
                            $description .= " - $ {$totalPrice}";
                        }
                        
                        // Add free shipping information if not eligible
                        if (!$isEligibleForFreeShipping && $amountToFreeShipping > 0) {
                            $amountFormatted = number_format($amountToFreeShipping, 0, ',', '.');
                            $description .= " | Agrega $ {$amountFormatted} más para envío gratis";
                        } else if ($isEligibleForFreeShipping && $finalPrice == 0) {
                            $description .= " | ¡Envío gratis aplicado!";
                        }
                        
                        $result[$rule->id] = [
                            'name' => $rule->name,
                            'price' => $finalPrice,
                            'city_specific' => true,
                            'city_name' => $ruleItem->city_name ?? null,
                            'state_name' => $ruleItem->state_name ?? null,
                            'rule_type' => $rule->type->getValue(),
                            'adjustment_price' => $ruleItem->adjustment_price,
                            'base_price' => $rule->price,
                            'description' => $description,
                        ];
                    } else {
                        $result[$rule->id] = [
                            'name' => $rule->name,
                            'price' => $rule->price,
                            'city_specific' => false,
                            'rule_type' => $rule->type->getValue(),
                        ];
                    }
                }
            }
        }

        return $result;
    }

    protected function getCacheKey(array $data): string
    {
        return md5(json_encode(Arr::only($data, ['origin', 'address_to', 'items', 'extra'])));
    }

    public function clearCache(): void
    {
        $this->cache->flush();
    }

    protected function getCacheValue(string $key): array|Repository|string|null
    {
        if ($this->useCache) {
            return $this->cache->get($key);
        }

        return null;
    }

    protected function setCacheValue(string $key, mixed $value): bool
    {
        if ($key) {
            return $this->cache->put($key, $value);
        }

        return true;
    }
    
    /**
     * Get general shipping rules (price/weight based) when no city-specific rules are found
     */
    protected function getGeneralShippingRules(Shipping $shipping, float $orderTotal, float $weight, ?string $zipCode = null)
    {
        \Log::info('HandleShippingFeeService: Getting general shipping rules', [
            'shipping_id' => $shipping->getKey(),
            'order_total' => $orderTotal,
            'weight' => $weight
        ]);
        
        $query = ShippingRule::query()
            ->where(function (Builder $query) use ($orderTotal, $shipping): void {
                $query
                    ->where('shipping_id', $shipping->getKey())
                    ->where('type', ShippingRuleTypeEnum::BASED_ON_PRICE)
                    ->where('from', '<=', $orderTotal)
                    ->where(function (Builder $sub) use ($orderTotal): void {
                        $sub
                            ->whereNull('to')
                            ->orWhere('to', '>=', $orderTotal);
                    });
            })
            ->orWhere(function (Builder $query) use ($weight, $shipping): void {
                $query
                    ->where('shipping_id', $shipping->getKey())
                    ->where('type', ShippingRuleTypeEnum::BASED_ON_WEIGHT)
                    ->where('from', '<=', $weight)
                    ->where(function (Builder $sub) use ($weight): void {
                        $sub
                            ->whereNull('to')
                            ->orWhere('to', '>=', $weight);
                    });
            });

        if (EcommerceHelper::loadCountriesStatesCitiesFromPluginLocation()) {
            $query = $query
                ->orWhere(function (Builder $query) use ($shipping): void {
                    $query
                        ->where('shipping_id', $shipping->getKey())
                        ->where('type', ShippingRuleTypeEnum::BASED_ON_LOCATION);
                });
        }

        if (EcommerceHelper::isZipCodeEnabled() && $zipCode) {
            $query = $query
                ->orWhere(function (Builder $query) use ($zipCode, $shipping): void {
                    $query
                        ->where('shipping_id', $shipping->getKey())
                        ->where('type', ShippingRuleTypeEnum::BASED_ON_ZIPCODE)
                        ->whereHas('items', function (Builder $sub) use ($zipCode): void {
                            $sub->where(['zip_code' => $zipCode]);
                        });
                });
        }

        return $query->with([
            'items' => function ($query): void {
                $query
                    ->where('is_enabled', 1)
                    ->orderBy('adjustment_price');
            },
        ])->get();
    }
}
