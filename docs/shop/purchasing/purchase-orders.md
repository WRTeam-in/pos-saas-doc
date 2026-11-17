---
title: Purchase Orders
description: Order stock from suppliers, receive it into a branch and record payments.
---

import Screenshot from '@site/src/components/Screenshot';

# Purchase Orders

A purchase order (PO) records what you ordered from a supplier. Receiving it adds the stock to a branch, and you can record payments and returns against it.

**Where to find it:** Purchasing > Purchase Orders. Permissions: `purchase-orders.view`, `purchase-orders.create`, `purchase-orders.update`.

<Screenshot name="shop-purchase-orders-list" alt="Purchase orders list with status tabs and payment status" />

## The list

Tabs: **All**, **Draft**, **Ordered**, **Received**, **Closed**, **Cancelled**. Filter by supplier, branch, payment status (**Unpaid**, **Partially paid**, **Paid**) and date range, or search by PO number or supplier. Columns include Order total, Paid, Due and Payment Status. You only see branches you have access to.

## Create a PO

1. Click **New Purchase Order**.
2. Under **Purchase Order Details** choose the **Supplier** and the **Branch** the stock will be received into. Optionally set **Expected Date** and **Notes** (internal).
3. Under **Items**, click **Add Item** and choose the **Product** (variant), **Qty Ordered** and **Unit Cost**. The line total and **Total** update as you type.
4. Click **Save**.

The PO is saved as a **Draft** with a number like `PO-0001`. Only active suppliers and active variants can be ordered. If you have no suppliers yet, the form tells you and links to **New supplier**.

## Order lifecycle

| Status | Meaning |
| --- | --- |
| Draft | Editable. Not sent. |
| Ordered | Placed with the supplier. |
| Partially received | An Ordered PO where some stock has arrived. |
| Received | Every item has arrived in full. |
| Closed | Finished. |
| Cancelled | Cancelled. |

1. **Mark as Ordered** (from Draft): the supplier is emailed. The order date is set to today. The PO needs at least one item.
2. **Edit** is available on a Draft, or an Ordered PO that has no receipts and no payments.
3. **Cancel Order** works on Draft or Ordered POs, but is refused if stock has been received (and not returned) or money has been paid.
4. **Close Order** is available once the PO is Received.

## Receive stock

On an Ordered PO, use the **Receive Stock** card.

1. Set **Received On** (not in the future) and optional **Notes**.
2. For each item enter **Receive now** (up to the remaining quantity), or click **Receive all remaining**.
3. For products that track batches or expiry, enter the **Quantity**, **Batch / lot number** and **Expiry date** of each lot. Click **Add another lot** if the delivery came in several. Lot quantities must add up to what you receive. A batch number is required for batch-tracked products.
4. Click **Receive Stock**.

Stock is added to the PO's branch. When every item has been received in full the PO becomes **Received**. Receiving history is listed at the bottom, and **Send received notification** sends a received email for the quantities received so far.

## Record payments

Use the **Payments** card on an Ordered, Received or Closed PO that still has a balance.

1. Enter **Amount**, choose a **Payment Method**, set the **Date** and an optional **Reference**.
2. Click **Add payment**.

You cannot pay more than is **Due**. Gateway, credit and loyalty methods are not offered. If you pay cash and have an open register shift, a cash-out is added to that shift so your drawer count stays correct.

The summary shows Order total, Returned, Paid, Due, **Supplier credit** and the payment status.

## Return goods

Use the **Purchase returns** card on the PO. See [Purchase returns](purchase-returns.md).

## Related

- [Suppliers](suppliers.md)
- [Reorder suggestions](reorder-suggestions.md)
- [Purchase returns](purchase-returns.md)
- [Batches and expiry](../stock/batches-and-expiry.md)
- [Shifts and cash](../selling/shifts-and-cash.md)
