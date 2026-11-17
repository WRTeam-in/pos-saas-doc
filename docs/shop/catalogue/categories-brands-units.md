---
title: Categories, Brands and Units
description: Organise products with categories, brands and units of measure.
---

import Screenshot from '@site/src/components/Screenshot';

# Categories, Brands and Units

Categories, brands and units group your products and decide how quantities are counted. All three work the same way: create, edit, switch active/inactive, archive, restore, delete permanently.

**Where to find it:** Inventory > Catalogue > Categories, Brands, Units. Permissions are `categories.*`, `brands.*` and `units.*` (`view`, `create`, `update`, `delete`).

<Screenshot name="shop-categories-list" alt="Categories list" />

## Categories

Categories organise the catalogue and the POS category list. They have two levels: a top-level category and its sub categories.

1. Click **New category** (or the add-sub-category action on a row).
2. Enter the **Name**.
3. Choose a **Parent category**, or leave **None (top level)**.
4. Upload an **Image** (required, JPG, PNG or WebP, up to 2 MB).
5. Set **Active** and click **Save category**.

Notes:

- A category that has sub categories cannot be moved under another category.
- Archiving is refused while the category has sub categories or products.
- **Delete permanently** only works for an archived category never used by a product or sub category.
- Restoring fails if the parent is archived or the name is already taken.

**Import categories**: CSV with columns `name` (required), `parent` (the parent category name; blank for top level) and `status` (`active` or `inactive`, default active). Use **Download template** for the exact header.

## Brands

Brands let you filter and report by who makes a product.

| Field | What it does |
| --- | --- |
| Name | Brand name, unique. |
| Logo | Optional. JPG, PNG or WebP, up to 1 MB. |
| Active | Off hides the brand from the product form without deleting it. |

Brands can also be imported from CSV (`name`, `status`) and are deleted permanently only when no product (archived ones included) uses them.

## Units

Units say how a product is counted or sold.

| Field | What it does |
| --- | --- |
| Name | Full name, for example Kilogram. Unique. |
| Short name | Shown next to quantities, for example kg. Unique. |
| Type | **Count**, **Weight**, **Volume** or **Length**. |
| Allows decimals | On lets quantities such as 1.25 be sold. Weight, volume and length units default to decimals; count units do not. |
| Active | Off hides the unit from the product form. |

:::warning
You cannot switch a unit to whole numbers while fractional stock, held sales or open purchase orders still use it with decimals.
:::

The units list can be filtered by type. Units can be imported from CSV (`name` and `short_name` required; `type` and `status` optional).

## Related

- [Products](products.md)
- [Variants and attributes](variants-and-attributes.md)
