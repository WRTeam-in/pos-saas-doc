---
title: Dashboard
description: Read the shop dashboard - key numbers, trends, stock alerts, open shifts and recent sales.
---

import Screenshot from '@site/src/components/Screenshot';

# Dashboard

The Dashboard summarises how the business is doing for a period you choose. What you see depends on your permissions: figures about takings need report access, stock widgets need inventory access.

**Where to find it:** Dashboard (top of the sidebar). Every signed-in member can open it.

<Screenshot name="shop-dashboard-overview" alt="Dashboard with key number cards and sales trend chart" />

## Period and branch

- Choose **Today**, **7 days**, **30 days** or **90 days** at the top. The default is 7 days.
- If you work in more than one branch, pick one in the **Branch** filter or leave **All branches**.
- Numbers are compared with the previous period of the same length.

## Get started checklist

A new business that has not yet completed a sale sees a **Get started** card with up to three steps, each shown only if you can do it: **Add your first product** (`products.create`), **Add some stock** (`inventory.adjust`) and **Make your first sale** (`sales.create`). The card disappears after the first completed sale.

## Key numbers

Needs `reports.sales`. Each card shows the figure, a small trend line and the change against the previous period.

| Card | What it shows |
|---|---|
| Revenue | Completed sales total, before refunds and including tax. |
| Gross profit | Net sales minus cost price, with the margin. Needs `reports.financial`. If some items sold have no cost price the margin is hidden. |
| Orders | Number of completed sales. |
| Average basket | Revenue divided by orders. |
| Items sold | Total quantity sold. |
| Refunds | Amount refunded, by the day each refund was issued. |

## Charts and boards

Needs `reports.sales` unless noted.

| Widget | What it shows |
|---|---|
| Sales trend | This period against the previous period, day by day. |
| Sales by Payment Method | How takings split across payment methods. |
| Busiest hours | Orders by hour of the day. |
| Sales by category | Which categories sell most. |
| Customer insights | New and returning customers, top customers, and loyalty points issued and redeemed when loyalty is on. Needs `customers.view` too. |
| Sales breakdown | Subtotal, discounts given, tax collected, refunded, unpaid balance and total sales. |
| Branch comparison | Takings per branch. Shown when you work in several branches and have **All branches** selected. |

## Stock and operations

| Widget | Needs | What it shows |
|---|---|---|
| Inventory health | `reports.inventory` | Stock value, low stock, out of stock and slow movers (no sales in the last days shown). |
| Expiry watch | `reports.inventory` and tracked batches | Expired and soon-to-expire stock. |
| Open shifts | `shifts.view` | Cashiers with an open register: opening cash, expected cash and a **View shift** link. |
| Top Products | `reports.sales` | Best sellers for the period. |
| Recent Sales | `reports.sales` | The latest sales, with a link to all sales. |
| Low stock | `inventory.view` | Products running low, or "Nothing is running low." |

:::tip
Open the bell in the header for alerts about low stock, expiring batches and overdue customer dues. See [Navigating the Panel](navigating-the-panel.md).
:::

## Related

- [Reports](../reports/overview.md)
- [Shifts and Cash](../selling/shifts-and-cash.md)
- [Stock Adjustments](../stock/stock-adjustments.md)
