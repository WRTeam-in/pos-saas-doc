---
title: Reorder Suggestions
description: Turn low-stock items into a draft purchase order in a few clicks.
---

import Screenshot from '@site/src/components/Screenshot';

# Reorder Suggestions

Reorder Suggestions lists items at or below their alert level in your current branch, grouped by the supplier you last bought them from, and creates a draft purchase order from them.

**Where to find it:** Purchasing > Reorder Suggestions. Needs `purchase-orders.create`.

<Screenshot name="shop-reorder-suggestions" alt="Reorder suggestions grouped by supplier" />

## How suggestions are worked out

- Only active products and variants are considered, in the branch you are working in.
- An item is listed when its stock is at or below its **Alert quantity**, or the default low-stock threshold from Settings if it has none.
- The suggested quantity brings stock up to twice the alert level, less what is already on open Draft or Ordered orders. Whole-number units are rounded up.
- The unit cost is the cost on the last order that included the variant, otherwise the variant's cost price.
- Items are grouped under the supplier of that last order. Items never ordered before appear under **No supplier yet**.

If nothing qualifies, the page says **Nothing to reorder. Every item is above its alert level or already on order.**

## Create a draft PO

1. For each group, review the **In stock**, **Alert level**, **On order**, **Order** and **Unit cost** columns. Change any **Order** quantity or **Unit cost**. Set a quantity to 0 to leave an item out.
2. Under **Choose a supplier**, pick the supplier (it is preselected for groups with a known supplier).
3. Click **Create draft PO**.

A draft PO opens for the current branch. At least one item must have a quantity above zero. Then follow the normal flow in [Purchase orders](purchase-orders.md).

## Related

- [Purchase orders](purchase-orders.md)
- [Stock levels](../stock/stock-levels.md)
- [Products](../catalogue/products.md)
