---
title: Stock Takes
description: Count what is on the shelves, review the differences and update stock in one step.
---

import Screenshot from '@site/src/components/Screenshot';

# Stock Takes

A stock take is a guided physical count of a branch or one category. You enter what you counted, review shortages and surpluses, then approve to update stock.

**Where to find it:** Inventory > Stock > Stock takes. Needs `inventory.view` to see takes and `inventory.adjust` to start, count, approve or cancel. This page requires the stock take feature on your plan.

<Screenshot name="shop-stock-take-sheet" alt="Stock take counting sheet" />

## Start a count

1. Click **New stock take**.
2. Choose the **Branch**.
3. Under **What to count**, choose **The whole branch** or **One category** (and pick the **Category**; its sub categories are included).
4. Add **Notes** if you like, then click **Start counting**.

The sheet gets one row per active product variant in scope. For lot-tracked products there is one row per lot that holds stock. Only one count can be open per branch at a time. Codes start with `ST-`.

## Count

The system quantity is hidden while you count.

- Type the quantity in each **Counted** box and click **Save counts**. A row you do not save is left alone, and emptying a box and saving marks it as not counted.
- Use **Scan or type a code** (SKU, barcode or lot number) and **Find** to jump to a row. Enter moves to the next row, Esc returns to the scan box.
- **Not counted yet** shows only the rows you have not counted. The search box filters by product, SKU, barcode or lot.
- Found a lot that is not on the sheet? Use **Add lot**: choose the Product, then enter the Batch / lot number, Expiry date and Counted quantity.

You can leave and return; counts you saved are kept.

## Review and approve

1. Click **Review differences**. You see the Shortage and Surplus values at cost, the number of rows not counted, and each difference by product and lot.
2. Click **Approve and update stock** to apply the differences. Rows you did not count are left unchanged.
3. Or click **Cancel stock take** to discard the counts. No stock changes.

Each difference is applied as a stock adjustment with the reason `Stock take ST-0001`. If a row cannot be applied, approval stops and lists the affected products.

After approval the take shows as a read-only result with the differences. The list shows Status, counted rows and the value at cost of the approved take.

## Related

- [Stock adjustments](stock-adjustments.md)
- [Batches and expiry](batches-and-expiry.md)
- [Stock levels](stock-levels.md)
