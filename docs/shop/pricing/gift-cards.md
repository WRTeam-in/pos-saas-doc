---
title: Gift cards
description: Sell gift cards at the POS, accept them as payment, and manage balances and expiry.
---

import Screenshot from '@site/src/components/Screenshot';

# Gift cards

Sell gift cards at the till and accept them as payment. Every card keeps a full history of its balance.

**Where to find it:** Pricing > Gift cards. Permissions: `gift-cards.view` (see), `gift-cards.sell` (sell), `gift-cards.manage` (adjust, extend, disable, settings). Your plan must include Gift cards.

<Screenshot name="shop-gift-cards" alt="Gift cards list with balance and expiry" />

## Sell a gift card

1. On the POS select **Gift card** in the bottom bar (`Alt+G`).
2. Enter the amount, and optionally the recipient and a note.
3. Select **Add to sale** and take payment.

The card becomes active, and its code is printed, once the sale is paid in full. Until then it is **Pending**. A gift card cannot be bought with another gift card.

## Pay with a gift card

In the payment window open **Pay with a gift card**, enter the code, select **Check balance**, set the amount and select **Apply**. Several cards can be used, and the rest is paid another way. Too many wrong codes lock the lookup for a short time.

## Manage a card

Search by code or recipient, and filter by status and expiry. Staff without `gift-cards.manage` do not see full codes. Open a card for its **History** and:

| Action | What it does |
| --- | --- |
| Adjust balance | Adds an amount, or takes off with a minus, with a reason. Larger changes may need a manager |
| Extend expiry | Sets a new expiry date |
| Disable / Enable | Stops the card being spent, or allows it again |

Statuses: **Pending**, **Active**, **Used up**, **Expired**, **Disabled**. A card cancelled by a refund or a cancelled sale cannot be enabled again.

## Settings

Settings > Gift cards (`gift-cards.manage`):

| Field | What it does |
| --- | --- |
| Validity (months) | How long new cards are valid, 0 to 600. 0 means they never expire |
| Restrict to the selling branch | When on, a card works only at the branch that sold it |
| Adjustment limit without approval | The largest balance change without approval rights |

Some countries set a minimum validity for gift cards, so check the rules where you trade. Expired cards are closed by a nightly job, which needs the [cron job](../../installation/cron-jobs.md).

## Gift cards report

Reports > Gift cards report (`reports.financial`) shows cards sold, spent, refunded back, expired, cancelled and the outstanding balance. Selling a card is not counted as revenue; revenue is recorded when the card is spent.

## Related

- [POS terminal](../selling/pos-terminal.md)
- [Coupons](coupons.md)
