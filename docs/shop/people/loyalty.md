---
title: Loyalty
description: Reward returning customers with points - how they are earned, spent and expire, tiers, and manual adjustments.
---

import Screenshot from '@site/src/components/Screenshot';

# Loyalty

Loyalty points reward customers who come back. They earn points on paid sales, spend them as money off a later sale, and unused points can expire. The program is switched off until you turn it on.

**Where to find it:** System > Settings > Loyalty points (`loyalty.manage`). Points on customers and at the POS appear once the program is on. Requires the **Loyalty points** plan feature.

<Screenshot name="shop-loyalty-settings" alt="Loyalty points settings with earning, spending and expiry rules" />

## Turn it on and set the rules

1. Open **Settings > Loyalty points**.
2. Turn on **Loyalty program**. Sales without a customer never earn.
3. Fill in the rules below. An example panel shows what a sample sale earns and what the points are worth.
4. Save.

### Earning

| Field | What it does |
|---|---|
| Points given | How many points the customer gets each time they spend the amount in the next box. |
| For every amount spent | The spend that earns those points. Example: 1 point for every 10 spent. |
| Amount counted | **Goods before tax** (the price after any discount, tax left out) or **Total including tax**. |

Points are earned once a sale is fully paid. The part of a sale paid with points does not earn points. Fractions are kept behind the scenes and the customer sees whole points.

### Spending

| Field | What it does |
|---|---|
| Points in a reward | How many points make one reward. |
| Money off for those points | How much comes off the bill for them. Example: 100 points = 1 off. |
| Minimum balance to spend | Customers can spend points once they have at least this many. |
| Most of a sale points can pay | A share of the sale total, 1 to 100 percent. |

### Expiry

| Field | What it does |
|---|---|
| Points expire after | Months until earned points expire. Enter 0 for points that never expire. |
| Warn customers | Days before expiry to remind them. |
| Remind customers before points expire | Sends the "Loyalty points expiring" message by email and SMS where the customer has those details. Edit the wording under message templates. |
| Business time zone | The day points expire is counted in this zone. |

:::note
Points are never spendable after their expiry date, but recording expiries and sending reminders run from the daily scheduler. Make sure the Laravel scheduler cron job is set up on your server. See [Cron Jobs](../../installation/cron-jobs.md).
:::

Default values for a new business: earn 1 point per 10 spent on goods before tax, 100 points are worth 1, minimum balance 100, at most 50% of a sale, expiry after 12 months, warning 14 days before.

## Tiers

Tiers are levels such as Silver or Gold. Once a customer has earned enough points in total, they move up and earn points faster.

1. Under **Tiers**, select **Add tier**.
2. Enter a **Tier name**, **Reached after earning** (lifetime points earned) and **Earns points** (a multiplier, for example 1.5 times).
3. Save. Each tier shows how many customers sit in it. You can add up to 10 tiers.

Tiers are optional; without them everyone earns at the normal rate. A customer's tier is based on lifetime points earned, not on their current balance.

## At the POS

With a customer attached, the cart shows their points balance, how many points the sale will earn and any points expiring soon. At payment, **Use loyalty points** lets the cashier enter **Points to use** or press **Use max**; the window shows what they are worth off the sale. Spending uses the points closest to expiry first. See [POS Terminal](../selling/pos-terminal.md).

## On the customer

Open a customer's **Loyalty points** tab to see their balance, tier, next tier, points expiring and a history with types: Earned, Spent, Expired, Adjusted, Taken back (refund) and Returned (refund).

With `loyalty.manage` you can select **Adjust** to add or remove points: enter the points (for example 50 or -20), a required reason and an optional expiry date. Adjustments are whole numbers.

## Refunds

When a sale with points is refunded, the share of points earned is taken back and the share paid with points is returned to the customer. See [Refunds](../selling/refunds.md).

## Related

- [Customers](customers.md)
- [POS Terminal](../selling/pos-terminal.md)
- [Refunds](../selling/refunds.md)
- [Email Settings](../settings/email-settings.md)
- [SMS Settings](../settings/sms-settings.md)
