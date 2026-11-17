---
title: Batches and Expiry
description: Track lot numbers and expiry dates, sell the earliest expiry first, and report on expiring stock.
---

import Screenshot from '@site/src/components/Screenshot';

# Batches and Expiry

Batch tracking keeps a product's stock per lot, so you know which delivery it came from. Expiry tracking adds a date to each lot. The system sells the earliest expiry first and, by default, refuses to sell expired stock.

**Where to find it:** switch tracking on per product in Inventory > Catalogue > Products. Lots appear on the product page (Inventory tab, **Batches** card) and in Reports > Expiry Report. The expiry report and expiry correction require the **Batch and expiry tracking** feature on your plan.

<Screenshot name="shop-expiry-report" alt="Expiry report with expired and expiring lots" />

## Turn tracking on

Edit a product and open **Batches & expiry**:

- **Track batches / lot numbers**: stock is kept per lot.
- **Track expiry dates**: each lot has an expiry date. You can also set a **Default expiry date**, pre-filled when receiving stock.

Existing stock moves into an **Opening** batch. See [Products](../catalogue/products.md) for the limits on switching tracking off.

## How lots are created

Lots are created whenever stock comes in on a tracked product:

- Receiving a [purchase order](../purchasing/purchase-orders.md): enter a batch number and expiry per lot. A batch number is required for batch-tracked products.
- A [stock adjustment](stock-adjustments.md) that adds stock: enter **Batch / lot number** and **Expiry date**, or leave the number blank for an automatic batch.
- A product's **Starting quantity** or a CSV import row (`batch_number`, `expiry_date`).
- A [transfer](stock-transfers.md): each lot arrives with the same number and expiry.

Adding stock with the same batch number and expiry date to the same branch tops up the existing lot. An expiry date in the past is refused.

## How lots are used

When you sell, transfer or remove stock, lots are taken earliest expiry first, then lots with no expiry, then the oldest receipt. Expired lots are skipped. Users with `stock-batches.override` can pick a specific lot in the POS cart, on adjustments and on transfers.

## Settings

In Settings, the Inventory card has:

| Setting | What it does |
| --- | --- |
| Block sales of expired stock | Expired batches are skipped at the till and in transfers. Write-offs and supplier returns can still take them. |
| Expiry warning (days) | Batches expiring within this many days are flagged in the cart and counted as expiring in the report. |
| Allow stock to go negative | Does not apply to batch-tracked products, which never go below zero. |

Days are counted on the business time zone from the loyalty settings.

## Batches card

On a tracked product's page, the **Batches** card lists lots that hold stock in your branches: Batch, Branch, Expiry date, Days left and Quantity, earliest expiry first.

If you have `stock-batches.edit` you can correct a lot's expiry date with **New expiry date**. Only the date changes, never the quantity, and the correction is written to the audit log. It is refused when the lot is empty or another lot with the same number already has that date.

## Expiry report

Reports > Expiry Report (`reports.inventory`) lists every lot with stock.

- Filters: **Branch**, **Status** (**All batches with stock**, **Expired**, **Expiring within N days**) and **Category**. Click **Apply**.
- Summary: Expired, Expiring and Value at cost.
- Columns: Product, Variant, Batch, Branch, Expiry date, Days left, Quantity, Value at cost.
- **Export CSV** downloads the list.

## Related

- [Products](../catalogue/products.md)
- [Stock adjustments](stock-adjustments.md)
- [Purchase orders](../purchasing/purchase-orders.md)
