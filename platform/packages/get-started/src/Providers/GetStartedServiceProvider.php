<?php

namespace Botble\GetStarted\Providers;

use Botble\Base\Facades\Assets;
use Botble\Base\Facades\BaseHelper;
use Botble\Base\Supports\ServiceProvider;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Dashboard\Events\RenderingDashboardWidgets;
use Illuminate\Support\Facades\Auth;

class GetStartedServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function boot(): void
    {


    }

    protected function shouldShowGetStartedPopup(): bool
    {
        return ! BaseHelper::hasDemoModeEnabled() &&
            is_in_admin(true) &&
            Auth::guard()->check();
    }
}
