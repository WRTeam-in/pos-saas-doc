---
title: Inventory and Expiry Reports
description: Stock value and low-stock counts, and batches that have expired or are about to.
---

import Screenshot from '@site/src/components/Screenshot';

# Inventory and Expiry Reports

The Inventory Report shows what you hold and what it is worth at cost. The Expiry Report lists batches that have expired or will soon.

**Where to find it:** sidebar > **Reports** > **Inventory Report** and **Expiry Report**. Both need `reports.inventory`. The Expiry Report also needs the plan feature **Batch and expiry tracking**.

## Inventory Report

<Screenshot name="shop-reports-inventory" alt="Inventory report with stock value cards" />

Shows current stock for every variant of every product, per branch. It has a **Branch** filter and no date range.

| Card | What it shows |
| --- | --- |
| **Stock Value** | Sum of quantity times cost price across the rows. |
| **SKU Count** | Number of variants. |
| **Low stock** | Variants at or below their alert quantity (or the default threshold). |
| **Out of stock** | Variants with zero or less stock. |

Columns: **Product**, **SKU**, **Branch**, **Quantity**, **Cost Price**, **Stock Value**. The CSV is `inventory-report.csv`.

The default low-stock threshold is set in [General Settings](../settings/general-settings.md#cashier-pos).

## Expiry Report

<Screenshot name="shop-reports-expiry" alt="Expiry report listing batches with days left" />

Lists batches that still have stock. Days are counted from today in the business time zone. "Expiring" means within the **Expiry warning (days)** setting.

### Filters

| Field | What it does |
| --- | --- |
| **Branch** | One branch or **All branches**. |
| **Status** | **All batches with stock**, **Expired**, or expiring within the warning days. |
| **Category** | Limits to one product category (**All** by default). |
| **Apply** | Reloads the list. |

### Summary and columns

Cards show the number **Expired**, the number expiring within the warning days, and the **Value at cost** of the filtered batches.

Columns: **Product**, **Variant**, **Batch**, **Branch**, **Expiry date**, **Days left**, **Quantity**, unit cost, **Value at cost**, status (**Expired**, **Expiring soon** or **OK**). The CSV is `expiry-report.csv` and is streamed, so large lists export without trouble.

:::note
The header bell also warns about low stock and expiring batches. See [Notifications](../account/notifications.md).
:::

## Related

- [Reports Overview](overview.md)
- [Stock Levels](../stock/stock-levels.md)
- [Batches & Expiry](../stock/batches-and-expiry.md)
- [General Settings](../settings/general-settings.md)
