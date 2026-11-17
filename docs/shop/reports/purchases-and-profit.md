---
title: Purchases and Profit Reports
description: What you spend with suppliers and what you earn after costs and expenses.
---

import Screenshot from '@site/src/components/Screenshot';

# Purchases and Profit Reports

The Purchases Report totals your supplier spend. The Profit Report works out gross and net profit from sales, cost of goods and expenses.

**Where to find it:** sidebar > **Reports** > **Purchases Report** and **Profit Report**. Both require `reports.financial`.

Both use the shared [date and branch filters](overview.md#shared-filters).

## Purchases Report

<Screenshot name="shop-reports-purchases" alt="Purchases report with spend cards" />

Lists purchase orders by order date. Draft and cancelled orders are left out. Totals are net of returns, the same figure used for supplier dues.

| Card | What it shows |
| --- | --- |
| **Total Spend** | Sum of the orders in the period. |
| **Purchase Orders** | Number of orders. |
| **Avg. order value** | Total spend divided by the number of orders. |
| **Pending Receipt** | Orders that are ordered but not yet received. |

Columns: **Date**, **PO #**, **Supplier**, **Status**, **Items**, **Total Cost**. The CSV is `purchases-report.csv`.

## Profit Report

<Screenshot name="shop-reports-profit" alt="Profit report with gross and net profit cards" />

Built from completed sales in the period.

| Card | How it is worked out |
| --- | --- |
| **Revenue** | Sale totals minus the tax collected. Tax is owed to the tax authority, so it is not counted as income. |
| **Refunds** | Refunds issued in the period, shown beside revenue. Revenue and profit are before refunds. |
| **COGS** | Cost of the goods sold: each line's unit cost times quantity. |
| **Gross Profit** | Revenue minus COGS. |
| **Margin** | Gross profit as a percentage of revenue. |
| **Expenses** | Expenses dated in the period (branch-filtered if you pick a branch). |
| **Net profit** | Gross profit minus expenses. |
| **Net margin** | Net profit as a percentage of revenue. |

Columns: **Date**, **Sale #**, **Revenue**, **COGS**, **Gross Profit**, **Margin**. The CSV (`profit-report.csv`) ends with an **Expenses** row and a **Net profit** row.

:::tip
Profit is only as accurate as your cost prices. Keep product costs and purchase receipts up to date.
:::

## Related

- [Reports Overview](overview.md)
- [Purchase Orders](../purchasing/purchase-orders.md)
- [Expenses](../expenses/expenses.md)
- [Products](../catalogue/products.md)
