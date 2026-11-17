---
title: Billing and Plans
description: Your plan, trial, usage limits, paying online, invoices, and what happens when a subscription lapses.
---

import Screenshot from '@site/src/components/Screenshot';

# Billing and Plans

Billing shows your current plan, how much of its limits you have used, the plans you can switch to, and your invoices. You pay online through a gateway the platform has switched on.

**Where to find it:** sidebar > **System** > **Billing**. Requires `billing.manage`, which only the Owner has.

<Screenshot name="shop-billing" alt="Billing page with current plan, usage bars and plan cards" />

## Plans and the trial

New businesses start on a free **Trial** plan. The number of trial days is set by the platform administrator. The platform also sets every plan's name, price, currency, limits and features, so what you see on the Billing page is your platform's own catalogue.

A plan controls two things:

| What | Examples |
| --- | --- |
| **Limits** | Number of branches, team members (including pending invitations) and products. A limit can be unlimited. |
| **Features** | Loyalty points, Batch and expiry tracking, Stock take, Quotations, Daily owner summary, SMS. |

If a feature is not in your plan, its menu item is hidden and its pages say "This feature is not included in your plan." The platform can also grant a business extra features or limits individually.

## Current plan

The top card shows the plan name, its monthly and yearly price, your **Billing cycle**, and **Trial ends** or **Renews on** with the days left. **Usage and limits** shows bars for branches, team members and products against your plan limits.

Banners warn you as time runs out: a trial reminder, and **Payment overdue** during the grace period.

## Pay or change plan

1. Under **Available plans**, choose **Monthly** or **Yearly** under **Billing interval**.
2. On the plan you want, pick **Pay with** a gateway if more than one is offered.
3. Click **Subscribe**, or **Renew now** for your current plan.
4. Complete payment on the gateway's page. You return to the Billing page with a confirmation.

- Gateways are the ones the platform enabled: Stripe, Razorpay, Flutterwave or PayPal. Only gateways that accept the plan's currency are offered. If none are available you see "Online payment is not available yet. Please contact us to activate your plan."
- A banner says "Test mode: payments made now are not real." when a gateway is in test mode.
- Each payment covers one period. **Renewal is manual**: you pay again before the end date, and a reminder email is sent before it ends.
- Your current plan offers **Renew now** only in its last 7 days. Paying again for the same plan adds a new period after the one you already paid for.
- Switching to a different plan starts it today. The days left on your old plan are lost, not refunded and not carried over. A warning shows how many days before you confirm.
- If the payment page does not return you, open Billing again. A payment that is still processing shows "We have not received your payment yet" and confirms automatically.

### Stop renewal reminders

On an active plan, click **I won't renew** to say you do not plan to continue. The plan stays active to the end of the paid period, then the shop becomes read-only and reminder emails stop. Click **I'll renew** to turn reminders back on.

## What happens when it lapses

| State | What you can do |
| --- | --- |
| **Trial** | Full use until the trial ends. |
| **Active** | Full use. |
| **Payment overdue** (grace) | Full use for 7 days after the period ends. Renew to avoid read-only. |
| **Read-only** | You can view data, run reports and export. You cannot add or change anything, except pay, record refunds, update your profile, and export your data. |

:::warning
In read-only mode every save is refused with "Your subscription is not active, so changes are turned off." Support tickets still work so you can ask for help.
:::

## Invoices

The **Invoices** table lists your latest invoices with **Invoice** number, **Plan**, **Period**, **Amount** and **Status** (Pending, Paid, Failed or Void). Click **View receipt** to open a printable receipt.

## Related

- [Support](support.md)
- [Data Export](../settings/data-export.md)
- [Team](../people/team.md)
- [Branches](../branches/branches.md)
