---
title: Plans
description: Create and edit subscription plans, prices, trial days, limits and features.
---

import Screenshot from '@site/src/components/Screenshot';

# Plans

A plan is what a business subscribes to: a price, a trial length, and a set of limits and features. You can edit the default plans or add your own.

**Where to find it:** sidebar, **Plans**. Viewing needs `billing.view`; creating and editing need `billing.manage`.

<Screenshot name="platform-plans-list" alt="Plans list with prices and status" />

## Default plans

A fresh install creates four plans in USD. They are only created when no plan exists, so your edits are never overwritten. Treat these values as a starting point.

| Plan | Monthly | Yearly | Branches | Team members | Products |
|---|---|---|---|---|---|
| Trial (14 trial days, not public) | 0 | 0 | 3 | 5 | Unlimited |
| Starter | 19.00 | 190.00 | 1 | 2 | 500 |
| Growth | 49.00 | 490.00 | 3 | 10 | 5000 |
| Pro | 99.00 | 990.00 | Unlimited | Unlimited | Unlimited |

Trial includes every yes/no feature. Starter includes none. Growth includes all except SMS. Pro includes all.

## Create or edit a plan

Click **New plan**, or **Edit** on a row.

| Field | What it does |
|---|---|
| Name | Shown to businesses |
| Code | Short id: lowercase letters, numbers, `-` and `_`. Set once; cannot be changed later |
| Currency | The plan's currency. Payments are never converted |
| Monthly price, Yearly price | Prices in that currency, up to 2 decimals |
| Trial days | Length of the trial for the trial plan |
| Sort order | Lower numbers are shown first |
| Status | **Active** or **Archived** |
| Show on the Billing page | Whether businesses can pick this plan themselves |

Under **What this plan includes**:

- Limits (branches, team members, products): a number, or empty for **Unlimited**.
- Yes/no features: tick to include. These are Loyalty points, Batch and expiry tracking, Stock take, Quotations, Daily owner summary and SMS.

Changes take effect at once for every business on the plan. Saving writes "Plan created" or "Plan updated" to the [Audit log](../admins/audit-log.md).

## The trial plan

One plan is the trial plan. New sign-ups start on it.

- It cannot be archived.
- It needs at least 1 trial day. With 0 days, new sign-ups would be read-only at once.
- It cannot be bought. Businesses choose a paid plan before or after the trial ends.

## What a business can buy

A business can only start a checkout for a plan that is Active, shown on the Billing page, not the trial plan, and has a price above zero. The gateway must be enabled and accept the plan currency. See [Payment gateways](payment-gateways.md).

When a business moves to a different plan, it must be within that plan's limits. Otherwise checkout is refused with a message naming the limits it exceeds. Renewing the same plan is never refused.

Archiving a plan hides it from new purchases. It does not move businesses already on it.

## Overrides

A business can have its own limits or feature values, set on its Manage page or through [Feature rollout](../businesses/feature-rollout.md). An override wins over the plan.

## Related

- [Businesses](../businesses/businesses.md)
- [Payment gateways](payment-gateways.md)
- [Invoices](invoices.md)
- [Business billing and plans](../../shop/account/billing-and-plans.md)
