---
title: Discount Rules
description: Automatic percentage or fixed discounts for products, variants or whole sales.
---

import Screenshot from '@site/src/components/Screenshot';

# Discount Rules

A discount rule gives an automatic discount at the POS when its conditions are met. No code or manual entry is needed.

**Where to find it:** Tax & Pricing > Discount Rules. Permissions: `discount-rules.view`, `discount-rules.create`, `discount-rules.update`.

<Screenshot name="shop-discount-rule-form" alt="Discount rule form" />

## Create a rule

1. Click **New Discount Rule**.
2. Fill in the fields below.
3. Click **Save Discount Rule**.

| Field | What it does |
| --- | --- |
| Name | Shown in reports and the list. Unique. |
| Type | **Percentage** (up to 100) or **Fixed** (a flat amount off). |
| Value | The percentage or amount. At least 0.01, two decimals. |
| Scope | **Product**, **Variant** or **Sale**. |
| Branch | Limit to one branch, or **All branches**. |
| Customer Group | Limit to one [customer group](customer-groups.md), or **Any customer**. |
| Status | Inactive stops the rule applying, without deleting it. |
| Start date / End date | Optional. The rule only applies between them. The end must be after the start. |
| Min. quantity | Optional. Quantity of the item in the cart needed (Product and Variant scope). |
| Min. sale amount | Optional. Sale subtotal needed (Sale scope). |
| Products / Variants | Required for Product and Variant scope. Search, **Select all** or **Clear all**. |

## How rules are applied

- **Product and Variant rules** discount each matching line. The price they discount is the [price list](price-lists.md) price if one applies, otherwise the product's price. If several rules match a line, only the single best one (largest amount) is used; they do not stack. A rule never takes a line below zero.
- **Sale rules** discount the whole basket once the subtotal reaches **Min. sale amount**. Again the best single rule wins, and the discount is shared across the lines. A fixed amount is capped to the basket.
- Tax is calculated on the amount after the discount. See [Tax rates and groups](tax-rates-and-groups.md).

:::note
A product's own **Discounted price** (set on the [product](../catalogue/products.md)) is separate from discount rules. It becomes the starting price that rules then discount.
:::

## Related

- [Price lists](price-lists.md)
- [Customer groups](customer-groups.md)
- [POS terminal](../selling/pos-terminal.md)
