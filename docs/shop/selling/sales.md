---
title: Sales
description: Browse, filter and open completed, open and cancelled sales; collect balances and print receipts.
---

import Screenshot from '@site/src/components/Screenshot';

# Sales

The Sales page lists every sale made in the branches you work in. Open a sale to see its items, payments and timeline, print its receipt, collect a balance, cancel it or start a return.

**Where to find it:** Sales > Sales. Requires `sales.view`.

<Screenshot name="shop-sales-list" alt="Sales list with status tabs and filters" />

## Sale statuses

| Status | Meaning |
|---|---|
| Completed | Fully paid and finalised. |
| Open | A credit sale that still has a balance due. |
| Cancelled | Cancelled before any payment. Its stock went back to the shelf. |

Carts that are still being built or are on hold at the POS do not appear here.

## Find a sale

1. Use the tabs: **All**, **Completed**, **Open**, **Cancelled**.
2. Type in the search box: "Search by sale number, customer or phone".
3. Narrow down with the filters: payment status (**Paid**, **Due**, **Partially refunded**, **Fully refunded**), branch, cashier, payment method and a date range.

The list only includes branches you have access to.

## Open a sale

Select a sale to see:

- **Sale Summary:** sale number, date, branch, cashier, customer, and totals (subtotal, discount, tax, grand total).
- Items with SKU, quantity, unit price and tax.
- Payments, each with method, status, reference and time. Failed payments are struck through and not counted.
- **Sale Timeline** and any refunds against the sale.

## Actions on a sale

| Action | When it shows | Permission |
|---|---|---|
| **Receipt** | Completed and cancelled sales | `sales.view` |
| **New return** | Completed sale that is not fully refunded | `sales.return` |
| **Cancel sale** | Open sale with no payment received yet | `sales.cancel` |
| **Collect Payment** | Open sale with a balance due | `sales.create` |
| **Check payment status** | A pending online payment on an open sale | `sales.create` |

### Collect a balance

On an open sale, use the **Collect Payment** card: choose the payment method, enter the amount (and a reference if the method needs one) and submit. When the balance reaches zero the sale becomes Completed. You can also collect against a customer's whole account from [Customers](../people/customers.md).

### Cancel an open sale

**Cancel sale** returns the items to stock and removes the amount owed. A sale that already has a payment cannot be cancelled; use a [refund](refunds.md) instead.

## Receipts

The receipt page prints or shows the sale for the customer. Its layout comes from Settings > Receipt template: paper size (58mm, 80mm or A4), optional logo, customer, cashier, SKU, tax breakdown, barcode, QR code and batch, plus header text, return policy and footer. It also shows loyalty points earned, used and the balance when loyalty is on.

## Related

- [POS Terminal](pos-terminal.md)
- [Refunds](refunds.md)
- [Customers](../people/customers.md)
- [General Settings](../settings/general-settings.md)
