---
title: Refunds
description: Take returns against completed sales, pay the customer back, restock items and manage refund reasons.
---

import Screenshot from '@site/src/components/Screenshot';

# Refunds

A refund (return) is recorded against a completed sale. You choose which items come back and in what condition, pay the customer out, and the app updates stock, loyalty points and the sale's refunded total.

**Where to find it:** Sales > Refunds (history and new returns) and Sales > Refund Reasons. Requires `sales.return`.

<Screenshot name="shop-refunds-builder" alt="Return builder with item quantities, condition and payout" />

## Before you start

- **Open your register.** The money leaves your till, so you need an open shift. Otherwise you are sent to the POS with "Open your register before processing a return."
- **Be in the sale's branch.** If the sale was made in another branch, switch to it first.
- Only **Completed** sales can be returned.

## Process a return

1. Go to **Sales > Refunds** and select **New return**, or open a completed sale and select **New return**.
2. If you started from the list, enter the sale number (for example `SAL-000123`) and select **Find sale**. Searching suggests matching sales as you type.
3. For each item, enter the **Return qty**. The page shows how much is still returnable. Weighed or measured products accept decimals.
4. Set the **Condition**: **Resellable** puts the items back into stock; **Damaged** does not.
5. Pick a **Reason** (optional) from your active refund reasons.
6. Under **Refund payout**, choose how to pay the customer back: a single method, or **Split between methods**. The total must match the refund exactly; the page shows what is **Left to pay out**.
7. Select **Process return**.

You land on the sale's receipt, which now shows the refund.

### How the amount is worked out

The refund per item is the customer's actual paid share of that line, including its tax and any discount. Returning every unit of a line refunds exactly what was paid for it. A refund can never exceed what the customer actually paid on the sale.

### Loyalty points

If part of the sale was paid with points, that share is paid back as points ("Paid back as points") and the points earned on the refunded part are taken back. See [Loyalty](../people/loyalty.md).

:::warning
There is no gateway refund integration. For a sale paid through Stripe, Razorpay, Flutterwave or PayPal the refund is only recorded here. Return the money from your payment gateway dashboard.
:::

## Refund limit and approval

Under Settings > Cashier (POS) you can set a **Refund limit**: the most a user without refund approval can refund in total on one sale. Leave it empty or 0 for no limit. Users with the `refunds.approve` permission are not restricted. Others see "Ask a manager to approve it."

## Refund history

Sales > Refunds lists every return, newest first, with its refund number, sale, amount and payout methods. Search by refund number or sale number.

## Refund Reasons

Reasons are the choices cashiers pick when processing a return. New businesses start with Changed mind, Damaged or faulty, Wrong item, Expired and Other.

1. Open **Sales > Refund Reasons**.
2. Select **Add refund reason**, enter a name (names must be unique) and save.
3. Use the edit, activate/deactivate or delete actions on a row to manage existing reasons. Only active reasons appear in the return form.

## Related

- [Sales](sales.md)
- [Shifts and Cash](shifts-and-cash.md)
- [Roles & Permissions](../people/roles-and-permissions.md)
- [Payment Methods](../settings/payment-methods.md)
