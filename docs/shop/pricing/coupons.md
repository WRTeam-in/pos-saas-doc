---
title: Coupons
description: Create coupon codes that cashiers enter at the POS for a discount on the whole sale.
---

import Screenshot from '@site/src/components/Screenshot';

# Coupons

A coupon is a code the cashier enters at the POS for a discount on the whole sale. Unlike a [discount rule](discount-rules.md), it applies only when the code is entered.

**Where to find it:** Pricing > Coupons. Permissions: `coupons.view`, `coupons.create`, `coupons.update`, `coupons.delete`. Your plan must include Coupons.

<Screenshot name="shop-coupons" alt="Coupons list with code, value and uses" />

## Create a coupon

Click **New coupon** and choose one of:

- **One coupon:** you choose the code, for example `WELCOME10`. Letters, numbers, dashes and underscores, up to 40 characters.
- **Many coupons:** enter a prefix and how many codes to make (up to 500 at a time). Codes look like `SUMMER-K7M2QX` and share the same settings.

| Field | What it does |
| --- | --- |
| Name | For your own reference |
| Type, Value | **Percentage** (up to 100) or **Fixed** amount |
| Branch | One branch, or **All branches** |
| Customer Group | One [customer group](customer-groups.md), or **Any customer** |
| Min. sale amount | The basket needed before the code works |
| Start date, End date | When the code is valid |
| Total uses | How often the code can be used in all |
| Uses per customer | Needs a customer on the sale |
| Can be combined with automatic sale discounts | Whether it can be used together with a sale-level discount rule |
| Status | Inactive switches the code off |

## Use a coupon at the POS

Select **Coupon** in the POS bottom bar (`Alt+K`), type the code and select **Apply**. The till says why when a code is refused: expired, used up, basket too small, wrong branch or customer, or a customer is needed. **Remove** takes it off. One coupon can be used per sale.

A sale with a coupon that is waiting for payment holds one use until it is completed or cancelled. Gift cards in the basket are not discounted.

A coupon that has been used cannot be deleted. Switch it off instead.

## Coupons report

Reports > Coupons report (`reports.financial`) shows each code's uses, total discount and last use, with **Export CSV**.

## Related

- [Discount rules](discount-rules.md)
- [POS terminal](../selling/pos-terminal.md)
