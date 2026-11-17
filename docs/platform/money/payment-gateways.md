---
title: Payment gateways
description: Set up Stripe, Razorpay, Flutterwave and PayPal so businesses can pay for their plan.
---

import Screenshot from '@site/src/components/Screenshot';

# Payment gateways

These are your gateways: the ones businesses use to pay you for a plan. Each business also sets up its own gateways to take payments from its customers. Those are separate. See [Payment methods](../../shop/settings/payment-methods.md).

**Where to find it:** sidebar, **Settings**, **Payments**. Needs `settings.manage`.

<Screenshot name="platform-payments" alt="Payment gateways page with Stripe selected" />

## Set up a gateway

1. Open **Payments** and pick a gateway in the **Gateways** list: Stripe, Razorpay, Flutterwave or PayPal.
2. Choose the **Mode**: **Live** or **Test**. The selected mode is the one used for real payments.
3. Fill in the credentials for that mode.
4. Copy the **Webhook URL** and add it in the gateway's dashboard (see below).
5. Turn on **Enabled** and click **Save**.

Live and Test credentials are stored separately, so you can switch modes without retyping keys. The status line under the gateway name shows **Not enabled**, **Configured** or **Credentials missing**. A gateway is only offered to businesses when it is enabled and has every required credential for its mode.

## Credentials

Secret fields are stored encrypted and never shown again. Leave a secret box blank to keep the saved value, click **Replace** to change it, or tick **Clear the saved value**.

| Gateway | Fields | Required |
|---|---|---|
| Stripe | Publishable Key, Secret Key, Webhook Secret | Secret Key |
| Razorpay | Key Id, Key Secret, Webhook Secret | Key Id, Key Secret |
| Flutterwave | Public Key, Secret Key, Webhook Secret | Public Key, Secret Key |
| PayPal | Client Id, Client Secret, Webhook Id | Client Id, Client Secret |

For PayPal, use the Sandbox app's credentials in Test mode and the Live app's in Live mode.

## Webhooks

Webhooks let a payment complete even if the customer closes the browser tab. Each gateway has its own URL:

| Gateway | Webhook URL | Event to send | Secret to copy back |
|---|---|---|---|
| Stripe | `https://your-domain/webhooks/platform/stripe` | `checkout.session.completed` (also `checkout.session.async_payment_succeeded`) | Signing secret into **Webhook Secret** |
| Razorpay | `https://your-domain/webhooks/platform/razorpay` | `payment_link.paid` | The secret you typed into **Webhook Secret** |
| Flutterwave | `https://your-domain/webhooks/platform/flutterwave` | `charge.completed` | The "Secret hash" into **Webhook Secret** |
| PayPal | `https://your-domain/webhooks/platform/paypal` | `CHECKOUT.ORDER.APPROVED` and `PAYMENT.CAPTURE.COMPLETED` | The Webhook ID into **Webhook Id** |

The page shows the exact URL with a **Copy** button. The gateway must be able to reach it from the internet, so it cannot be a localhost address.

When a webhook arrives its signature is verified, then the payment is re-checked with the gateway before anything is applied. Without a webhook, a payment only completes when the customer returns to the app after paying.

## Currencies

Each plan has one currency, and a gateway must accept it. The page warns "This gateway cannot take these plan currencies" when an active plan uses a currency a gateway rejects.

- Stripe and Razorpay accept any three-letter currency code (the gateway account itself must support it).
- Flutterwave: NGN, GHS, KES, UGX, TZS, ZAR, RWF, XAF, XOF, USD, EUR, GBP.
- PayPal: AUD, BRL, CAD, CNY, CZK, DKK, EUR, GBP, HKD, HUF, ILS, JPY, MXN, MYR, NOK, NZD, PHP, PLN, SEK, SGD, THB, TWD, USD, CHF.

## Test mode

Every invoice records the mode it was created in. Test-mode invoices show a **Test** badge, and are never counted in revenue or monthly recurring revenue.

:::warning
If you switch the mode while a payment is waiting, that invoice is not re-checked. The mode on the invoice must match the gateway's current mode.
:::

## Audit

Saving writes "Payment gateway settings updated" to the [Audit log](../admins/audit-log.md). It records which gateways are on, their mode, and the names of the settings that changed. Values are never logged.

## Related

- [Plans](plans.md)
- [Invoices](invoices.md)
- [General settings](../settings/general-settings.md)
- [Business billing and plans](../../shop/account/billing-and-plans.md)
