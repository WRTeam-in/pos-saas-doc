---
title: Quotations
description: Prepare priced offers for customers and prospects, track their status and convert them to sales.
---

import Screenshot from '@site/src/components/Screenshot';

# Quotations

A quotation is a formal offer with the same prices and taxes a sale would use. It does not reserve or deduct stock. When the customer agrees you convert it into a draft sale at the POS.

**Where to find it:** Sales > Quotations. Requires `quotations.view` and a plan that includes the **Quotations** feature. Creating needs `quotations.create`, editing and status changes `quotations.update`, deleting `quotations.delete`, and converting also needs `sales.create`.

<Screenshot name="shop-quotations-form" alt="Quotation form with customer details, items and summary" />

## Statuses

| Status | Meaning |
|---|---|
| Draft | Saved, not yet given to the customer. Can be edited and deleted. |
| Sent | You marked it as given to the customer. Can still be edited. |
| Accepted | The customer agreed. Can be converted. |
| Rejected | The customer declined. |
| Expired | Past its **Valid until** date while Draft or Sent. Cannot be sent, accepted or converted until you extend the date. A refusal can still be recorded. |
| Converted | Turned into a sale. Locked. |

The list has a tab for each status, a date range and branch filter, and search by quotation number, prospect name or customer name.

## Create a quotation

1. Go to **Sales > Quotations** and select **New quotation**.
2. Fill in the details:

| Field | What it does |
|---|---|
| Branch | The store the quotation is for. Converting needs an open shift on this branch. |
| Existing customer | Search by name, code or phone. Uses that customer's pricing group. |
| Prospect name, email, phone | For someone who is not a customer yet. A name is required when no customer is chosen. |
| Billing address / Shipping address | Printed on the quotation. |
| Issue date | The date written on it. |
| Valid until | Last day the offer stands. Cannot be before the issue date. |
| Expected delivery date | Optional promised date. |
| Terms and conditions | Payment, delivery or warranty terms. Printed. |
| Customer notes | A message for the customer. Printed. |
| Internal notes | Visible only to staff. Never printed. |

3. Under **Items**, search for products by name, SKU or barcode and set quantities. Prices and taxes are filled in automatically and cannot be typed. You can add up to 200 lines.
4. Check the **Quotation summary**. Totals are calculated by the server with the customer's pricing and current tax rules. Sale-wide discounts apply at checkout.
5. Select **Save draft**.

## Work the quotation

Open it from the list. Available actions depend on status:

- **Edit** (Draft or Sent).
- **Mark as sent:** records that you gave it to the customer. It does not email anything.
- **Accept** or **Reject** (from Sent).
- **Print:** a printable copy for the customer.
- **Delete:** drafts only.

## Convert to a sale

1. Open an accepted, sent or draft quotation that has not expired.
2. Select **Convert to sale**. You need an open shift on the quotation's branch, and you must be working in that branch.
3. The app creates a draft sale in the POS with the same products and quantities, at today's prices. Stock is checked now, not when the quote was written.
4. It shows **Please check before taking payment** notes for anything that changed: an item no longer available, a price that changed, or low stock.
5. Continue in the POS with **Open sale in POS**, take payment, and the quotation shows **Converted**.

The customer for the sale is the chosen customer. For a prospect, a customer is created from their details (or linked to an existing one with the same email). With no contact details it becomes a walk-in sale.

## Related

- [POS Terminal](pos-terminal.md)
- [Customers](../people/customers.md)
- [Shifts and Cash](shifts-and-cash.md)
- [Billing & Plans](../account/billing-and-plans.md)
