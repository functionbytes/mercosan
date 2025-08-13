<?php

namespace Botble\Ecommerce\Supports;

use Botble\Base\Supports\Pdf;
use Botble\Ecommerce\Models\Order;
use Botble\Media\Facades\RvMedia;
use Barryvdh\DomPDF\Facade\Pdf as PdfFacade;
use Illuminate\Http\Response;

class ProductionHelper
{
    public function makeProductionOrderPDF(Order $order): \Barryvdh\DomPDF\PDF
    {
        $order->load(['products', 'user', 'shippingAddress']);
        
        $logo = get_ecommerce_setting('company_logo_for_invoicing') ?: theme_option('logo_in_invoices');
        $logoFullPath = $logo ? RvMedia::getRealPath($logo) : null;

        $html = view('plugins/ecommerce::orders.production-pdf', compact('order', 'logo', 'logoFullPath'))->render();

        return PdfFacade::loadHTML($html)->setPaper('A4', 'portrait');
    }

    public function streamProductionOrder(Order $order): Response|string|null
    {
        return $this->makeProductionOrderPDF($order)->stream("orden-produccion-{$order->code}.pdf");
    }

    public function downloadProductionOrder(Order $order): Response|string|null
    {
        return $this->makeProductionOrderPDF($order)->download("orden-produccion-{$order->code}.pdf");
    }

    public function getProductionOrderTemplate(): string
    {
        return view('plugins/ecommerce::orders.production-pdf')->render();
    }
}