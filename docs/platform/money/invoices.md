---
title: Invoices
description: Every subscription invoice across all businesses.
---

import Screenshot from '@site/src/components/Screenshot';

# Invoices

Each time a business pays for a plan, or you record a manual payment, an invoice is created. This page lists them all.

**Where to find it:** sidebar, **Invoices**. Needs `billing.view`. Voiding needs `billing.manage`.

<Screenshot name="platform-invoices-list" alt="Invoices list with status tabs and filters" />

## Filter the list

| Filter | Options |
|---|---|
| Status tabs | All statuses, Pending, Paid, Failed, Void |
| Search | Business name |
| Gateway | Stripe, Razorpay, Flutterwave, PayPal, Manual payment |
| Mode | Live or Test |
| From, To | Created date range |

Columns: Invoice number, Business, Plan, Amount, Status, Gateway, Paid on.

## Invoice statuses

| Status | Meaning |
|---|---|
| Pending | Checkout started, not paid yet |
| Paid | Payment confirmed and the subscription extended |
| Failed | Checkout could not start, or was abandoned |
| Void | Cancelled by an admin. Kept on record, cannot be paid |

Pending invoices older than one day are marked Failed by the nightly job. If the money arrives later, it is still applied.

Invoice numbers use a prefix, `INV-` by default. Change it under Settings, Billing. Existing invoices keep their numbers.

## Mismatch

An invoice shows a red **Mismatch** badge when the gateway reported a different amount or currency from the invoice. The invoice stays Pending and nothing is applied. The owner is told to contact support, and the reason is saved on the invoice. Check the payment in the gateway, then either record a manual payment or void the invoice. Mismatches also appear on the dashboard under Needs attention.

## Void an invoice

1. Click **Void** on a row, or on the business page.
2. Confirm.

Voiding a paid invoice does not shorten the subscription: the paid period stays. A void invoice that is later paid at the gateway is not applied; it is logged as an error.

## Related

- [Businesses](../businesses/businesses.md)
- [Payment gateways](payment-gateways.md)
- [Reports](reports.md)
- [General settings](../settings/general-settings.md#billing)
