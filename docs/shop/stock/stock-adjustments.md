---
title: Stock Adjustments
description: Add or remove stock by hand and keep a history of who changed what and why.
---

import Screenshot from '@site/src/components/Screenshot';

# Stock Adjustments

A stock adjustment adds or removes a quantity of one product in one branch, with a reason. The list is the history of all manual changes.

**Where to find it:** Inventory > Stock > Stock adjustments. Needs `inventory.view` to see the history and `inventory.adjust` to add one.

<Screenshot name="shop-stock-adjustments" alt="Stock adjustments history" />

## History

The list shows Date, Product, Branch, Change, Balance After, Reason and By. Filter by branch, type (**Add stock** or **Remove stock**), user and date range, or search by product, SKU or reason. You only see the branches you have access to.

## Add an adjustment

1. Click **Add Stock Adjustment**. The form opens in a dialog over the list.
2. Choose the **Branch**.
3. Search for the **Product** by name, SKU or barcode (type at least 2 characters). The current stock in that branch is shown.
4. Enter **Change**: a positive number to add, a negative one to remove (for example `10` or `-3`). This is the amount to add or remove, not the new total.
5. Enter a **Reason**, or click a common one: Opening stock, Restock, Stock count, Damaged, Expired.
6. Click **Add Stock Adjustment**.

Fields that appear only for tracked products:

| Field | When it shows |
| --- | --- |
| Batch / lot number | Adding stock to a batch-tracked product. Leave blank for an automatic batch. |
| Expiry date | Adding stock to an expiry-tracked product. Required unless the product has a default expiry date. It cannot be in the past. |
| Batch | Removing stock, only if you have `stock-batches.override`. The default is **Auto (earliest expiry)**. |

Rules:

- Change cannot be zero.
- Whole numbers only, unless the product's unit allows decimals.
- Archived products cannot be adjusted.
- Removing more than a tracked product holds is refused.

:::tip
For a full recount of a shelf or branch, use a [stock take](stock-takes.md) instead of many adjustments.
:::

## Related

- [Stock levels](stock-levels.md)
- [Batches and expiry](batches-and-expiry.md)
- [Stock takes](stock-takes.md)
