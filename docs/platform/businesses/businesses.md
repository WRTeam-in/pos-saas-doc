---
title: Businesses
description: List, inspect and manage every business and its subscription.
---

import Screenshot from '@site/src/components/Screenshot';

# Businesses

A business is one shop account (a tenant). This page covers finding a business, changing its subscription, recording a manual payment, suspending it, and keeping private notes and tags.

**Where to find it:** sidebar, **Businesses**. Needs `businesses.view`. Changes need `businesses.manage`; recording a payment needs `billing.manage`.

<Screenshot name="platform-tenants-list" alt="Businesses list with plan, status and health columns" />

## The list

Search by name. Columns:

| Column | Meaning |
|---|---|
| Name, Plan | The business and its current plan |
| Status | **Trial**, **Active**, **Payment overdue**, **Read-only**, or **No plan** |
| Sales (30d), Last sale | Completed sales in the last 30 days, and the date of the latest one |
| Health | Score and level (Healthy, At risk, Critical). See [Dashboard](../dashboard.md#business-health) |
| Renews on | Period end, or trial end while on trial |

Each row has **Report** (opens the business report) and, with `businesses.manage`, **Manage**.

## Subscription states

| State | What the business can do |
|---|---|
| Trial | Full access until the trial end date |
| Active | Full access until the period end |
| Payment overdue | Full access during the grace period (default 7 days, set under Settings, Billing) |
| Read-only | Can view and export data. Cannot add or change anything, except paying, leaving and exporting |

The nightly job `subscriptions:advance` stores these changes: an ended trial becomes expired, an unpaid active period becomes past due with a grace end date, and an ended grace becomes expired. If the owner chose not to renew, the subscription becomes cancelled at period end. The state shown to the business is always worked out from the dates.

## Manage a business

Click **Manage**. The form has these fields.

| Field | What it does |
|---|---|
| Plan | The plan the business is on |
| Status | Trialing, Active, Past due, Cancelled or Expired |
| Billing interval | Monthly or yearly, or empty |
| Trial ends | Required when status is Trialing |
| Renews on | End of the paid period |
| Grace ends | Required when status is Past due |
| I won't renew | Cancel at period end |

:::warning
You are editing the subscription directly. Setting Trialing with no end date, or Past due with no grace date, is refused because the business would become read-only at once.
:::

### Special limits for this business

Under **Special limits for this business**, give one business its own value for each plan feature. Leave a box empty to use the plan value.

- Limits (branches, team members, products): type a number, or `unlimited`.
- Yes/no features: **Use plan value**, **On** or **Off**.

To switch one feature for many businesses at once, use [Feature rollout](feature-rollout.md).

### Record manual payment

Use this for a bank transfer or cash payment. It needs `billing.manage`.

1. In **Record manual payment**, pick the **Plan** (not the trial plan) and the billing interval.
2. Enter the **Amount** and an optional note, such as the transfer reference.
3. Click **Record manual payment**.

The payment is saved as a paid invoice with the gateway "Manual payment", and the subscription becomes Active. Paying again for the plan that is still running adds time after the current period. A different plan starts now.

### Invoices and voiding

The page lists the last 30 invoices of the business. **Void** keeps an invoice on record but it can no longer be paid. Voiding a paid invoice does not shorten the subscription. Voiding needs `billing.manage`.

### Open as owner

See [Impersonation](impersonation.md).

## Suspend, reactivate, extend a trial

These actions are on the **Business report** (Reports in the sidebar), for one business or a ticked selection (up to 200 at a time).

| Action | Effect |
|---|---|
| Suspend | Sets the business to suspended. Its members cannot work in it. |
| Reactivate | Sets it back to active |
| Extend trial | Adds 1 to 90 days (default 7) to the trial end. Only for businesses that are trialing |

Businesses already in the target state are skipped. Each change is written to the [Audit log](../admins/audit-log.md).

## Notes and tags

Open a business from **Report**. There you can add:

- **Notes**: free text up to 2000 characters, visible only to admins.
- **Tags**: short labels such as `vip` or `churn risk`. Up to 10 per business. Tags can be used to filter the business report.

Adding or removing notes and tags needs `businesses.manage`.

## Related

- [Reports](../money/reports.md)
- [Plans](../money/plans.md)
- [Invoices](../money/invoices.md)
- [Feature rollout](feature-rollout.md)
- [Business billing and plans](../../shop/account/billing-and-plans.md)
