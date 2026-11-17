---
title: Expenses
description: Record what the business spends, group it by category and track it against profit.
---

import Screenshot from '@site/src/components/Screenshot';

# Expenses

Expenses record money the business spent, such as rent, utilities or salaries. They feed your net profit figures, and an expense paid in cash can also come out of an open register shift.

**Where to find it:** Expenses > Expenses and Expenses > Expense categories. Permissions: `expenses.view`, `expenses.create`, `expenses.update`, `expenses.delete`. Managing categories needs `expenses.update`.

<Screenshot name="shop-expenses-list" alt="Expenses list with filters and total" />

## The expenses list

Filter by date range, branch, category and payment method, or search by expense number or payee. **Total of these expenses** shows the sum of everything matching the filters. **Export CSV** downloads the filtered list (Number, Date, Branch, Category, Payee, Method, Reference, Amount, Note).

Columns: Expense no. (starting `EXP-`), Date, Branch, Category, Paid to, Payment Method and Amount. Row actions let you view the receipt, edit, and delete. You only see branches you have access to.

## Add an expense

1. Click **New expense**.
2. Fill in the form and click **Save expense**.

| Field | What it does |
| --- | --- |
| Expense date | The day the money was spent. It cannot be in the future. |
| Amount | More than zero, up to 2 decimals. |
| Category | The kind of cost. Reports group expenses by category. |
| Branch | The branch the cost belongs to, used for profit per branch. |
| Payment Method | How it was paid. Gateway, credit and loyalty methods are not offered. |
| Reference | A cheque, transaction or invoice number. Required for payment methods that need one, such as card or bank transfer. |
| Paid to | Who you paid, for example the landlord. |
| Note | Optional detail, such as the period covered. |
| Paid from the till | See below. |
| Receipt | Photo or PDF of the bill, up to 5 MB. Kept privately; only people who can view expenses can open it. |

:::note
You need at least one active expense category and one active payment method before an expense can be saved.
:::

### Paid from the till

Turn on **Paid from the till** when the cash came out of your drawer. It is only available for a cash payment method, on a branch where you have an open shift. Saving then also records a cash-out on your open shift, so the expected cash goes down and the drawer still balances. Leave it off for cash paid from somewhere else, such as the safe. See [Shifts and cash](../selling/shifts-and-cash.md).

## Edit and delete

- Editing an expense paid from a still-open shift keeps its branch fixed, and updates or removes the till cash-out if you change the amount or untick the option.
- Once that shift is closed, the amount, payment method and branch are locked and the expense cannot be deleted. Other details can still be edited.
- **Delete** asks for confirmation and removes the expense (and its till cash-out when the shift is open).

## Expense categories

Categories group expenses (for example Rent, Utilities, Salaries).

1. Open **Expense categories** and click **New category**.
2. Enter a **Name** (unique) and set **Active**.
3. Click **Save category**.

Switch a category on or off from the list. A category that already has expenses cannot be deleted; deactivate it instead. An expense keeps working with a category that was deactivated later.

## Related

- [Shifts and cash](../selling/shifts-and-cash.md)
- [Branches](../branches/branches.md)
- [Purchase orders](../purchasing/purchase-orders.md)
