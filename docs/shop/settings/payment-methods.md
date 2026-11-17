---
title: Payment Methods
description: Add and manage the manual payment types your cashiers can take at checkout.
---

import Screenshot from '@site/src/components/Screenshot';

# Payment Methods

Payment methods are the tiles your cashier sees when taking payment. Custom methods record a reference the customer gives you and never contact a gateway.

**Where to find it:** sidebar > **System** > **Settings** > **Payment Methods**. Requires `settings.manage`.

<Screenshot name="shop-payment-methods" alt="Manual payment methods list with Add payment method button" />

## Built-in methods

New businesses start with these:

| Method | Type | Can be deleted? |
| --- | --- | --- |
| **Cash** | Cash | No |
| **Card** | Card | No |
| **UPI** | Digital | Yes |
| **Bank Transfer** | Digital | Yes |
| **Cheque** | Other | Yes |
| **Loyalty points** | Loyalty | No |

Cash, Card and Loyalty points are protected because checkout and refunds rely on them. Turn a protected method off instead of deleting it.

## Add a method

1. Click **Add payment method**.
2. Enter a **Name** (up to 64 characters).
3. Pick a **Type**: **Cash**, **Card**, **Digital** or **Other**.
4. Tick **Requires reference** if the cashier must type a reference (for example a transaction ID) for each payment.
5. Click **Add payment method**.

## Manage a method

The list shows **Method**, **Type**, **Requires reference** and **Status**.

- Use the **Active** switch to turn a method on or off. Inactive methods disappear from checkout.
- Click **Remove** to delete a custom method.

## UPI settings

The **UPI** row has **UPI Settings** with two fields:

| Field | What it does |
| --- | --- |
| **UPI VPA** | Your UPI ID (Virtual Payment Address) that customers pay into, for example `merchant@okbank`. |
| **UPI Payee Name** | The name shown in the customer's UPI app. |

Click **Save UPI settings** to save.

:::note
Online gateways (Stripe, Razorpay, Flutterwave, PayPal) are configured separately under the **Payments** tab. See [General Settings](general-settings.md#payments).
:::

## Related

- [General Settings](general-settings.md)
- [POS Terminal](../selling/pos-terminal.md)
- [Payments report](../reports/sales-and-payments.md)
