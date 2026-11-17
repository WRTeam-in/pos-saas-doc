---
title: Customer Groups
description: Segment customers such as Wholesale or VIP and give each group its own price lists.
---

import Screenshot from '@site/src/components/Screenshot';

# Customer Groups

A customer group segments your customers. Assign price lists to a group and its customers get those prices automatically at the POS. Discount rules can also be limited to a group.

**Where to find it:** Tax & Pricing > Customer Groups. Permissions: `customer-groups.view`, `customer-groups.create`, `customer-groups.update`.

<Screenshot name="shop-customer-group-form" alt="Customer group form with price lists" />

## Create a group

1. Click **New Customer Group**.
2. Enter a **Name** (unique).
3. Set **Status**. Inactive stops new customers from being assigned to the group.
4. Under **Price Lists for this Group**, tick the active [price lists](price-lists.md) that apply.
5. Click **Save Customer Group**.

Use the toggle in the list to activate or deactivate a group. Groups cannot be deleted.

## Put customers in a group

Edit a customer and choose the **Customer Group** (see [Customers](../people/customers.md)). When that customer is on a sale, the group's price lists and group-specific discount rules apply.

## Related

- [Price lists](price-lists.md)
- [Discount rules](discount-rules.md)
- [Customers](../people/customers.md)
