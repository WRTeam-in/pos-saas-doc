---
title: Customers
description: Keep a customer book, track balances owed, collect payments, set credit limits and print statements.
---

import Screenshot from '@site/src/components/Screenshot';

# Customers

The customer book holds the people and businesses you sell to. Attach a customer to a sale to apply their group pricing, sell on credit, earn loyalty points and keep a purchase history.

**Where to find it:** People > Customers. Requires `customers.view`.

<Screenshot name="shop-customers-list" alt="Customers list with status tabs and an owing filter" />

## Customer list

- Tabs filter by status: all, **Active** and **Inactive**.
- Search by name, phone, email or ID.
- Tick **Customers who owe** to show only those with an unpaid balance, and **Sort** by newest or highest balance.
- Switch between grid and list view.

## Add or edit a customer

Select **New customer** (needs `customers.create`). To change one, use Edit (needs `customers.update`).

| Field | What it does |
|---|---|
| First name | Required. |
| Last name, Company | Optional. |
| Phone / Email | At least one is required, so you can reach the customer. Email must be unique in your business. A phone number that belongs to someone else shows a warning, and you tick the confirmation box to save anyway. |
| Customer ID | Unique code, generated for you. Change it if you use your own scheme. |
| Customer group | Groups can get their own price lists at checkout. See [Customer Groups](../pricing/customer-groups.md). |
| Status | Active or Inactive. Only active customers can be picked at the POS. |
| Credit limit | The most this customer can owe at one time. Empty means no limit. |
| Tax ID | For business customers who need it on their invoice. |
| Birthday | Lets you send a birthday offer. |
| How they found you | Walk-in, Referral, Online store, Social media or Other. |
| Address, city, state, postal code, country | Optional. |
| Send offers and news | Marketing opt-in. Only turn on if the customer agreed. |
| Preferred channel | SMS, Email or WhatsApp. |
| Notes | Only your team sees this. |

Cashiers can also add a customer quickly from the POS cart. See [POS Terminal](../selling/pos-terminal.md).

## Customer page

Open a customer to see their profile and tabs:

| Tab | Shows |
|---|---|
| Overview | Total spent, number of purchases, last purchase, amount owed and, with loyalty on, points. Choose a period: 7 days, 30 days, 90 days, 12 months or all time. |
| Loyalty points | Balance, next tier, points expiring soon, history, and an **Adjust** form. Only when the program is on or the customer has points. |
| Purchase history | The latest sales for this customer in your branches. |
| Payments | Unpaid sales and the payments you collected, each with a receipt. |
| Credit & limits | Credit limit, remaining credit and **Set limit**. |
| Notes | Add and edit notes. |

**New sale** opens the POS with this customer already attached.

## Credit sales and balances

A customer's balance is what they still owe on open (credit) sales. Credit sales happen at the POS when:

- **Allow credit sales (checkout with a balance due)** is on in Settings > Cashier (POS), and
- the sale has a customer attached.

If a sale would take the customer over their credit limit, checkout refuses it. A user who can edit the customer can raise the limit right from the till.

## Collect a payment

Needs `customers.collect`.

1. Open the customer and select **Collect payment**.
2. Enter the **Amount**. It settles their oldest unpaid sales first and cannot exceed what they owe.
3. Choose the **Method**. Cash goes into your open register shift, so you need one open.
4. Add an optional reference (a card slip or bank transfer number) and note.
5. Submit. A receipt number is issued; you can open it later from the **Payments** tab.

You can also collect on a single sale from its page. See [Sales](../selling/sales.md).

## Statement

Select **Statement** on a customer to see every sale, payment and refund with a running balance. Pick a date range (leave empty for everything; the opening balance is what they owed before the first date) and **Print statement**.

## Alerts

The header bell warns about customers with dues older than 30 days and links to the list filtered to those who owe.

## Related

- [Loyalty](loyalty.md)
- [Customer Groups](../pricing/customer-groups.md)
- [Sales](../selling/sales.md)
- [POS Terminal](../selling/pos-terminal.md)
