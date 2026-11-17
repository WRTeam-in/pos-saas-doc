---
title: Tax Rates and Groups
description: Create tax rates, bundle them into groups and assign a group to a product.
---

import Screenshot from '@site/src/components/Screenshot';

# Tax Rates and Groups

A tax rate is a single tax such as VAT or GST. A tax group bundles one or more rates (for example CGST + SGST). You assign a tax group to a product or variant, and its rates are applied whenever that item is sold.

**Where to find it:** Tax & Pricing > Tax Rates and Tax Groups. Permissions: `tax-rates.*` and `tax-groups.*` (`view`, `create`, `update`).

<Screenshot name="shop-tax-groups" alt="Tax group form with its rates" />

## Create a tax rate

1. Open **Tax Rates** and click **New Tax Rate**.
2. Enter a **Name**. It must be unique.
3. Enter the **Rate** (up to 4 decimals) and choose the **Type**.
4. Set **Status** and click **Save Tax Rate**.

| Type | What it does |
| --- | --- |
| Percentage | A share of the price. 0 to 100. |
| Fixed | A flat amount charged per unit sold, regardless of price. |

Setting a rate to **Inactive** hides it from new tax groups without deleting it.

## Create a tax group

1. Open **Tax Groups** and click **New Tax Group**.
2. Enter a **Name** (unique).
3. Under **Rates in this Group**, tick the rates that apply together.
4. Set **Status** and click **Save Tax Group**.

Inactive groups no longer appear in the product form's tax group list.

## Assign a group to a product

On the [product form](../catalogue/products.md), pick the **Tax Group**. For variable products each variant row has its own **Tax Group**. **No tax** means no tax is charged.

## How tax is calculated

- **Price type**: in Settings, the Tax card has **Price type**. **Exclusive (tax added on top)** adds tax at checkout. **Inclusive (tax included in the price)** treats the price as already containing the percentage rates.
- **Percentage rates** are worked out on the line amount after discounts. In an inclusive setup, the tax is the part of the price that is tax, shared between the group's rates.
- **Fixed rates** are always added on top, per unit, even in an inclusive setup.
- Each rate is rounded to cents on its own, and the total is the sum of those amounts, so receipts always add up.

The product form shows a live preview of the tax for the chosen group.

## Related

- [Products](../catalogue/products.md)
- [Discount rules](discount-rules.md)
- [Price lists](price-lists.md)
