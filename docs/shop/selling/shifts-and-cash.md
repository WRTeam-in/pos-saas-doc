---
title: Shifts and Cash
description: Open and close registers, record cash in and out, and review shift reports and cash differences.
---

import Screenshot from '@site/src/components/Screenshot';

# Shifts and Cash

A shift is one cashier's register session in one branch, from opening cash to the final cash count. Shifts tie every sale, refund and cash movement to a cashier and show whether the drawer balances.

**Where to find it:** Sales > Shifts. Requires `shifts.view`. Opening and closing a register happens on the [POS Terminal](pos-terminal.md) (`sales.create`). Anyone can open the report of their own shift.

<Screenshot name="shop-shifts-report" alt="Shift report with payment breakdown and cash reconciliation" />

## The shift life cycle

1. **Open:** on the POS Terminal enter the **Starting cash amount** and select **Open Register**.
2. **Sell:** sales, cash refunds and cash movements are recorded against the shift.
3. **Move cash:** use **Cash in/out** for money added to or removed from the drawer.
4. **Close:** select **Close Register**, enter the **Counted cash** and an optional note, and confirm.

A cashier has one open shift per branch at a time. A held sale resumed later is attached to the shift that is open then.

## Cash in/out

| Field | What it does |
|---|---|
| Cash in / Cash out | Cash in is money you add to the drawer. Cash out is money you take from it. |
| Amount | A positive number. Cash out cannot exceed the cash expected in the drawer. |
| Reason | Float top-up (cash in), Supplier payment, Safe drop, Expense (cash out) or Other (either). Shown on the shift report. |
| Note | Detail such as who was paid. Required for cash out. |

Cash paid for an expense or to a supplier from a register is recorded as an automatic cash out on that shift. See [Expenses](../expenses/expenses.md).

## Expected cash and difference

The drawer should hold:

> opening cash + cash sales - cash refunds + cash in - cash out

Card, wallet and other non-cash payments are not in the drawer, so they are left out. When you close, the **Difference** is the counted cash minus the expected cash. Zero is perfect; negative means the drawer is short, positive means it is over. After closing you see "Register closed. Cash difference: ..." and land on the shift report.

## Shifts list

Sales > Shifts shows all shifts in your branches. Filter by date range, branch and cashier, and tick **Only shifts with a difference** to see closed shifts where the count did not match. The **Per cashier** summary shows shifts, sales total and net difference for each cashier. Select **Export CSV** to download the list.

## Shift report (Z-report)

Open a shift to see:

- **Opening cash**, **Expected cash**, **Counted cash** and **Difference**.
- **Payment breakdown:** everything received by payment method, including non-cash.
- **Cash sales**, **Cash refunds**, **Cash in** and **Cash out**.
- The cash movements with reasons, the sales made in the shift and the refunds issued.
- **Print Z-report** for a paper copy.

Closed shifts show the figures stored at closing. Open shifts show live figures. The Dashboard also lists open shifts. See [Dashboard](../getting-started/dashboard.md).

## Related

- [POS Terminal](pos-terminal.md)
- [Refunds](refunds.md)
- [Expenses](../expenses/expenses.md)
- [Roles & Permissions](../people/roles-and-permissions.md)
