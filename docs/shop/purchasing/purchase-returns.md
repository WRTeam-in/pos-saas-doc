---
title: Purchase Returns
description: Send goods back to a supplier and take them out of stock.
---

import Screenshot from '@site/src/components/Screenshot';

# Purchase Returns

A purchase return records goods you send back to a supplier. It removes the stock from the branch and reduces what you owe on the purchase order.

**Where to find it:** Purchasing > Purchase Returns. Needs `purchase-orders.view` to see the list and `purchase-orders.update` to record a return.

<Screenshot name="shop-purchase-returns" alt="Purchase returns list" />

## The list

Every return, newest first. Search by return number, PO number or supplier. Columns: Return no. (starting `PRT-`), PO Number, Supplier, Branch, Return date, items, Returned amount, Reason and By.

## Record a return

1. Click **New purchase return**.
2. Search and find the purchase order the goods came from. Only orders with received items still to return are shown.
3. Click **Return items**. This opens the **Purchase returns** card on that PO.
4. Set the **Return date** (not in the future) and an optional **Reason**.
5. For each item enter **Return qty**. **Can return** shows the maximum (received minus already returned). Lines left at 0 are ignored, and at least one line is needed.
6. For tracked products, optionally pick the **Batch**. The default is **Auto (earliest expiry)**.
7. Click **Return to supplier**.

The PO must be Ordered, Received or Closed.

What happens:

- The quantity is taken out of the PO's branch stock, from the chosen lot or earliest expiry first. Expired lots can be returned.
- The returned value is quantity times the PO's unit cost.
- The PO shows the returned amount, and **Due** and **Supplier credit** are updated.

## Related

- [Purchase orders](purchase-orders.md)
- [Batches and expiry](../stock/batches-and-expiry.md)
- [Suppliers](suppliers.md)
