---
title: Sales and Payments Reports
description: Revenue, refunds and the money collected, with CSV export.
---

import Screenshot from '@site/src/components/Screenshot';

# Sales and Payments Reports

The Sales Report totals what you sold. The Payments Report totals what you actually collected and splits it by payment method.

**Where to find it:** sidebar > **Reports** > **Sales Report** and **Payments Report**. Requires `reports.sales`.

## Sales Report

<Screenshot name="shop-reports-sales-cards" alt="Sales report summary cards" />

Only completed sales are counted. Use the shared [date and branch filters](overview.md#shared-filters).

### Summary cards

| Card | What it shows |
| --- | --- |
| **Revenue** | Total of completed sales in the period, before refunds, including tax. |
| **Sales** | Number of completed sales. |
| **Avg Sale Value** | Revenue divided by the number of sales. |
| **Items sold** | Total quantity of items on those sales. |
| **Refunds Issued** | Refunds counted by the date the refund was issued, whichever day the sale was made. |
| **Net revenue** | Revenue minus refunds. |

### Table columns

**Date**, **Sale #**, **Customer** (shows **Walk-in customer** when none was chosen), **Items**, **Subtotal**, **Discount**, **Tax**, **Total**, **Status**.

The CSV (`sales-report.csv`) has the same columns.

## Payments Report

<Screenshot name="shop-reports-payments" alt="Payments report with totals by method" />

Counts only payments with status paid, on completed sales, by the date the payment was made.

| Card | What it shows |
| --- | --- |
| **Total Collected** | Sum of paid payments in the period. |
| **Payment Count** | Number of payments. |
| By method | Amount and percentage share for each payment **Method**. |

Table columns: **Date**, **Sale #**, **Method**, **Amount**, **Reference**. The CSV is `payments-report.csv`.

:::tip
Revenue and Total Collected can differ. Credit sales add to revenue but only add to collected money when the customer pays later.
:::

## Related

- [Reports Overview](overview.md)
- [Sales](../selling/sales.md)
- [Refunds](../selling/refunds.md)
- [Payment Methods](../settings/payment-methods.md)
