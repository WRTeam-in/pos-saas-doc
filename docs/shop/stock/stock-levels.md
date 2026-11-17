---
title: Stock Levels
description: See how much of every product you hold in the current branch.
---

import Screenshot from '@site/src/components/Screenshot';

# Stock Levels

Stock Levels lists every product and variant with its quantity in the branch you are working in, and lets you correct a quantity on the spot.

**Where to find it:** Inventory > Stock > Stock levels. Needs `inventory.view`; the **Adjust** button needs `inventory.adjust`.

<Screenshot name="shop-stock-levels" alt="Stock levels list with All stock, Low and Out tabs" />

## Read the list

The page header names the branch you are viewing. To see another branch, switch branch first (see [Branches](../branches/branches.md)).

Tabs, each with a count: **All stock**, **Low** and **Out**. Search by product name or SKU, and filter by category, brand and unit.

| Column | What it shows |
| --- | --- |
| Product | Product name and, for variable products, the option such as `Size: L`. |
| SKU | The variant's SKU. |
| Current stock | Quantity in this branch. |
| Status | **Out** (zero or less), **Low** (above zero and at or below the threshold) or **Healthy**. |

### What counts as low stock

A product is Low when its quantity is at or below its own **Alert quantity** (set on the [product](../catalogue/products.md)). Products without one use the **Default low stock threshold** in Settings, in the Inventory card.

## Adjust stock from the list

1. Click **Adjust** on a row.
2. Choose **Add stock** or **Remove stock** and enter **How many?**. The **Set stock to 0** shortcut fills in the full quantity to remove.
3. For products that track expiry, enter an **Expiry date** when adding stock.
4. Enter a **Reason** (required) and click **Adjust stock**.

The change is recorded in [Stock adjustments](stock-adjustments.md).

## Allow negative stock

In Settings, the Inventory card has **Allow stock to go negative**. Products tracked by batch never go below zero, whatever this says.

## Related

- [Stock adjustments](stock-adjustments.md)
- [Stock transfers](stock-transfers.md)
- [Batches and expiry](batches-and-expiry.md)
- [Reorder suggestions](../purchasing/reorder-suggestions.md)
