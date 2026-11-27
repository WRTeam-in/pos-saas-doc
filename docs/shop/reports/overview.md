---
title: Reports Overview
description: The six reports, who can open them, and the filters and CSV export they share.
---

import Screenshot from '@site/src/components/Screenshot';

# Reports Overview

Reports turn your sales, payments, purchases, stock and expenses into totals you can filter by date and branch. Every report can be exported to CSV.

**Where to find it:** sidebar > **Reports**. Each report needs its own permission (see below).

<Screenshot name="shop-reports-sales" alt="Sales report with date and branch filters and summary cards" />

## The reports

| Report | Permission | Question it answers |
| --- | --- | --- |
| **Sales Report** | `reports.sales` | How much did we sell, and how much was refunded? |
| **Payments Report** | `reports.sales` | How much money came in, and by which method? |
| **Purchases Report** | `reports.financial` | How much did we spend with suppliers? |
| **Profit Report** | `reports.financial` | What is the gross and net profit? |
| **Inventory Report** | `reports.inventory` | What stock do we hold and what is it worth? |
| **Expiry Report** | `reports.inventory` + plan feature **Batch and expiry tracking** | Which batches have expired or are about to? |
| **Coupons report** | `reports.financial` + plan feature **Coupons** | How often was each [coupon](../pricing/coupons.md) used? |
| **Gift cards report** | `reports.financial` + plan feature **Gift cards** | What did we sell, and what is still open on [gift cards](../pricing/gift-cards.md)? |

A menu item only shows if you hold the permission. The Expiry Report is also hidden when your plan does not include batch and expiry tracking. See [Roles & Permissions](../people/roles-and-permissions.md) to grant access.

## Shared filters

The Sales, Payments, Purchases and Profit reports use the same filter bar.

| Field | What it does |
| --- | --- |
| **From** / **To** | Limits the report to a date range. Leave both empty for all time. |
| **Branch** | Limits the report to one branch. **All branches** covers every branch you may access. |
| **Apply** | Reloads the report with your choices. |

- Dates are read in your business time zone. A shop's "9 October" starts at the shop's midnight, not UTC midnight.
- If **From** is after **To**, the two are swapped and a notice tells you.
- An invalid date is ignored and a notice names it.
- You only ever see branches you are assigned to. Asking for a branch you cannot access shows all of your branches instead.

The Inventory and Expiry reports show stock as it is now, so they have no date range, only a **Branch** filter.

## Summary cards and table

Each report starts with summary cards for the whole filtered period, followed by a table that shows 15 rows per page. The cards cover every matching row, not just the page you are on. The table headings stay in view while you scroll.

## Export CSV

Click **Export CSV** to download the filtered report. The file contains every matching row, not only the current page, and respects your filters.

| Report | File name |
| --- | --- |
| Sales | `sales-report.csv` |
| Payments | `payments-report.csv` |
| Purchases | `purchases-report.csv` |
| Profit | `profit-report.csv` |
| Inventory | `inventory-report.csv` |
| Expiry | `expiry-report.csv` |

:::note
In read-only mode (an expired subscription) reports and exports still work. See [Billing & Plans](../account/billing-and-plans.md).
:::

## Related

- [Sales & Payments reports](sales-and-payments.md)
- [Inventory & Expiry reports](inventory-and-expiry.md)
- [Purchases & Profit reports](purchases-and-profit.md)
- [Roles & Permissions](../people/roles-and-permissions.md)
