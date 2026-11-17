---
title: Stock Transfers
description: Move stock between your branches.
---

import Screenshot from '@site/src/components/Screenshot';

# Stock Transfers

A stock transfer moves products from one branch to another in a single step. Stock leaves the source branch and arrives at the destination immediately.

**Where to find it:** Inventory > Stock > Stock transfers. Needs `inventory.view` to see transfers and `inventory.transfer` to create one.

<Screenshot name="shop-stock-transfers" alt="Stock transfers list" />

## Create a transfer

1. Click **Add Stock Transfer**.
2. Choose **From branch** (it defaults to your current branch) and **To branch**. They must be different, and both must be branches you have access to.
3. Optionally add **Notes**.
4. Click **Add Item** for each product: choose the **Product** (and variant) and enter the **Quantity**. Each product can appear only once.
5. If you have `stock-batches.override`, you can pick a specific **Batch**. The default is **Auto (earliest expiry)**.
6. Click **Save**.

Each transfer gets a code starting with `TRF-`. If any line cannot leave the source branch (not enough stock, only expired lots, a bad batch), the whole transfer is cancelled and nothing moves.

For tracked products, each lot taken from the source arrives as the same lot (same number and expiry date) at the destination. Expired lots are left behind when **Block sales of expired stock** is on.

## Transfer list and details

Columns: Code, From branch, To branch, Items, Date and By. Filter by from branch, to branch, user and date, or search by code, product or note. Open a transfer to see its notes, products, batch / lot numbers and quantities.

You see a transfer if you have access to either of its branches.

:::note
A transfer cannot be edited or undone. To correct a mistake, create a transfer in the opposite direction.
:::

## Related

- [Branches](../branches/branches.md)
- [Stock levels](stock-levels.md)
- [Batches and expiry](batches-and-expiry.md)
