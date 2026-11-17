---
title: Branches
description: Add locations, switch between them and control who can work in each.
---

import Screenshot from '@site/src/components/Screenshot';

# Branches

A branch is a location your team sells from and holds stock in. Stock, sales, shifts, transfers and purchase orders belong to a branch.

**Where to find it:** Branches > Branches. Needs `settings.manage`. The number of active branches is limited by your plan.

<Screenshot name="shop-branches-list" alt="Branches list with the default branch marked" />

## The branches list

Tabs filter by status. Search by name or code. Columns: Name, Branch Code and Status. The default branch is marked **Default**.

Row actions: **Edit**, **Make default**, and **Activate** or **Deactivate**.

## Add a branch

1. Click **New Branch**.
2. Enter a **Name**. It appears in the branch switcher and reports.
3. Optionally enter a **Branch Code**. Leave it blank to auto-generate one like `BR-0001`.
4. Set **Status** and click **Save Branch**.

Only an active branch counts against your plan's branch limit. Adding or reactivating a branch stops with a message once the limit is reached.

The new branch is assigned automatically to you and to every Owner of the business. Give other people access in [Team](../people/team.md).

## Default, deactivate

- **Make default** sets the branch used by default. Only an active branch can be the default.
- The default branch must stay active, so it cannot be deactivated.
- **Deactivate** hides the branch from the branch switcher and team assignment. If some people work only in that branch, you are warned that they will not be able to sign in until they are given another branch, and must confirm.

## Switch branch

If you have access to more than one active branch, a branch selector appears in the top bar. Choose a branch and the page reloads in that branch. You can only switch to active branches assigned to you.

What follows the current branch:

- Stock quantities and low-stock badges in [Stock levels](../stock/stock-levels.md) and on the [products](../catalogue/products.md) list.
- New sales at the POS and the register shift you open.
- Reorder suggestions and the default **From branch** on a stock transfer.
- Starting quantities entered when you add a product.

## Who can see what

Each team member is assigned the branches they can work in (**Branches** on the team member form, see [Team](../people/team.md)). Lists such as stock adjustments, transfers, purchase orders, purchase returns, stock takes and expenses only show records from your branches, and opening a record from another branch returns not found.

[Stock transfers](../stock/stock-transfers.md) are the way to move stock between branches. Products, categories, suppliers and price lists are shared across the business; a price list or discount rule can be limited to one branch.

## Related

- [Stock transfers](../stock/stock-transfers.md)
- [Team](../people/team.md)
- [Roles and permissions](../people/roles-and-permissions.md)
