---
title: Price Lists
description: Set quantity-tiered prices per variant and apply them to a branch or customer group.
---

import Screenshot from '@site/src/components/Screenshot';

# Price Lists

A price list holds special prices for specific variants, optionally with a minimum quantity (tiers). It replaces a variant's normal price when it applies to a sale.

**Where to find it:** Tax & Pricing > Price Lists. Permissions: `price-lists.view`, `price-lists.create`, `price-lists.update`, `price-lists.delete`.

<Screenshot name="shop-price-list-form" alt="Price list form with tiered prices" />

## Create a price list

1. Click **New Price List**.
2. Enter a **Name** (unique).
3. Choose a **Type**: **Retail**, **Wholesale** or **Custom**. This is only a label for your own organisation and does not change how prices apply.
4. Choose a **Branch**, or leave **All branches**.
5. Set **Status**.
6. Under **Prices in this List**, click **Add price** for each line: pick the **Variant**, enter the **Price** and the **Min. quantity** (at least 1, or 0.001 for decimal units).
7. Click **Save Price List**.

On an existing list you can add or remove prices one at a time. A variant can have several tiers, but not two with the same minimum quantity.

## Which list applies

The list is picked when an item is added to a sale:

1. If the customer belongs to a [customer group](customer-groups.md) with active price lists assigned, those lists are used. A list for the current branch wins over an all-branches list, then the newest list wins.
2. Otherwise the newest active list for the current branch that has no customer group, then the newest active all-branches list that has no customer group.

A list assigned to a customer group is for that group only. Walk-in customers and customers in other groups never get it.

Within the list, the tier with the highest **Min. quantity** that the sale quantity reaches is used. If the variant is not in the list, its normal price applies. Discount rules are then applied to the list price (see [Discount rules](discount-rules.md)).

## Archive and delete

Use **Archive** to take a list out of pricing. Items and group links are kept, so **Restore** brings it back intact. **Delete permanently** is only for archived lists.

## Related

- [Customer groups](customer-groups.md)
- [Discount rules](discount-rules.md)
- [Products](../catalogue/products.md)
