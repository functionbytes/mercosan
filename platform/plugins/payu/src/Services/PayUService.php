<?php
// FILE: platform/plugins/payu/src/Services/PayUService.php
// REWRITTEN: Core service logic updated for PayU Latam.

namespace FriendsOfBotble\PayU\Services;

use FriendsOfBotble\PayU\Providers\PayUServiceProvider;

class PayUService
{
    protected string $apiKey;
    protected string $merchantId;
    protected string $accountId;
    protected bool $isSandbox;
    protected array $data = [];

    public function __construct()
    {
        $this->apiKey = get_payment_setting('api_key', PayUServiceProvider::MODULE_NAME);
        $this->merchantId = get_payment_setting('merchant_id', PayUServiceProvider::MODULE_NAME);
        $this->accountId = get_payment_setting('account_id', PayUServiceProvider::MODULE_NAME);
        $this->isSandbox = get_payment_setting('mode', PayUServiceProvider::MODULE_NAME) === 'sandbox';
    }

    public function withData(array $data): self
    {
        $this->data = $data;
        $this->withAdditionalData();
        return $this;
    }

    public function redirectToCheckoutPage(): void
    {
        echo view('plugins/payu::form', [
            'data' => $this->data,
            'action' => $this->getPaymentUrl(),
        ]);
        exit();
    }

    protected function getSignature(): string
    {
        $stringToSign = "{$this->apiKey}~{$this->merchantId}~{$this->data['referenceCode']}~{$this->data['amount']}~{$this->data['currency']}";
        return md5($stringToSign);
    }

    protected function withAdditionalData(): void
    {
        $this->data = array_merge($this->data, [
            'merchantId' => $this->merchantId,
            'accountId'  => $this->accountId,
            'signature'  => $this->getSignature(),
        ]);
    }

    protected function getPaymentUrl(): string
    {
        return $this->isSandbox
            ? 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'
            : 'https://checkout.payulatam.com/ppp-web-gateway-payu/';
    }
}
