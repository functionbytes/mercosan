<?php

use FriendsOfBotble\PayU\Http\Controllers\PayUController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'core'])
    ->prefix('payment/payu')
    ->name('payment.payu.')
    ->group(function () {
        // This is the page the user is redirected to after payment (responseUrl).
        Route::get('callback', [PayUController::class, 'callback'])->name('callback');

        // This is the server-to-server confirmation webhook (confirmationUrl).
        Route::post('confirmation', [PayUController::class, 'webhook'])->name('confirmation');
    });
