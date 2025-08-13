<?php

namespace Botble\Ecommerce\Facades;

use Botble\Ecommerce\Supports\ProductionHelper as BaseProductionHelper;
use Illuminate\Support\Facades\Facade;

/**
 * @method static \Barryvdh\DomPDF\PDF makeProductionOrderPDF(\Botble\Ecommerce\Models\Order $order)
 * @method static \Illuminate\Http\Response streamProductionOrder(\Botble\Ecommerce\Models\Order $order)
 * @method static \Illuminate\Http\Response downloadProductionOrder(\Botble\Ecommerce\Models\Order $order)
 * @method static string getProductionOrderTemplate()
 *
 * @see \Botble\Ecommerce\Supports\ProductionHelper
 */
class ProductionHelper extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return BaseProductionHelper::class;
    }
}