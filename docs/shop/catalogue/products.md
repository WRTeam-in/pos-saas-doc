---
title: Products
description: Add, edit, import, duplicate and archive the products you sell.
---

import Screenshot from '@site/src/components/Screenshot';

# Products

Products are the items you sell. Each product has a price, a category, a unit and stock per branch.

**Where to find it:** Inventory > Catalogue > Products. Needs `products.view` to see the list, `products.create` to add or import, `products.update` to edit, and `products.delete` to archive or delete.

<Screenshot name="shop-products-list" alt="Products list with status tabs and filters" />

## The products list

Tabs at the top filter by status, each with a count: **All**, **Active**, **Draft** and **Archived**.

Use the search box to find a product by name, SKU or barcode. The toolbar also filters by category, brand, unit, type (**Simple** or **Variable**) and stock (**In stock** or **Out of stock**). The stock figure and the stock filter use the branch you are currently working in.

Row actions:

| Action | What it does |
| --- | --- |
| View | Opens the product page (Overview, Variants, Inventory and Activity tabs). |
| Edit | Opens the edit form. |
| Move to draft / Activate | Switches the product between draft and active. |
| Duplicate | Makes a copy and opens it in the editor. |
| Archive | Hides the product. It can be restored from the Archived tab. |
| Restore | Brings an archived product back. |
| Delete permanently | Removes an archived product for good. |

:::note
Draft products are hidden from the POS register. A product with sales or stock history cannot be deleted permanently and can stay archived.
:::

## Add a product

1. Click **New product**.
2. Fill in **Product info**, **Pricing**, **Status** and **Organization** (below).
3. Click **Save product**, or **Save as draft** to keep it hidden for now.

<Screenshot name="shop-product-form" alt="Add product form" />

If you save a product with no stock, the confirmation tells you so, because a product with no stock cannot be rung up.

### Product info

| Field | What it does |
| --- | --- |
| Thumbnail | Main picture shown in the catalogue, POS grid and receipts. JPG, PNG or WebP, up to 5 MB. |
| Name | Display name. Required, up to 255 characters. |
| Product Type | **Simple** (one SKU) or **Variable** (one SKU per combination of attributes such as size or colour). See [Variants and attributes](variants-and-attributes.md). |
| SKU | Unique code for the product. Required for simple products; leave it blank and one is generated. The sparkle button generates one for you. |
| Barcode | Optional scannable code. The sparkle button generates a valid EAN-13. Must be unique. |
| Cost Price | What you paid. Used in profit reports, never shown to customers. |
| Starting quantity | Only when adding. Sets the opening stock in your current branch. Whole numbers unless the unit allows decimals. |
| Tax Group | Which [tax group](../pricing/tax-rates-and-groups.md) applies. **No tax** by default. A live preview shows the tax on the price. |
| Description | Up to 5000 characters. |

### Media

Add up to 5 extra pictures (JPG, PNG or WebP, 5 MB each). When editing, tick **Remove** under a saved picture to delete it on save.

### Pricing

| Field | What it does |
| --- | --- |
| Base price | The regular selling price. Required. |
| Discounted price | Optional sale price. Leave empty to sell at the base price. |
| Alert quantity | Low-stock threshold for this product. Leave empty to use the default from Settings. |
| In stock | Turn off to keep the product visible but unavailable. |

### Batches & expiry

| Field | What it does |
| --- | --- |
| Track batches / lot numbers | Keeps stock per lot. See [Batches and expiry](../stock/batches-and-expiry.md). |
| Track expiry dates | Each lot has an expiry date. The earliest expiry is sold first and expired stock cannot be sold. |
| Default expiry date | Pre-filled when receiving stock. Cannot be in the past. |

When you switch tracking on for a product that already has stock, that stock moves into an **Opening** batch. You cannot switch tracking off while stock still sits in batches, and you cannot switch it on while any stock is negative.

### Status and organization

- **Status**: on means active, off saves a draft.
- **Brand** (optional), **Unit** (required), **Category** (required), **Sub category** (optional) and **Tags** (comma separated). Only active brands, units and categories are offered. See [Categories, brands and units](categories-brands-units.md).

:::warning
You cannot change a product from a decimal unit (such as kg) to a whole-number unit while fractional stock, held carts or open purchase orders still use it.
:::

## Edit, duplicate, archive

- **Edit** opens the same form without the starting quantity. Change stock with [Stock adjustments](../stock/stock-adjustments.md) instead.
- **Duplicate** copies the product and opens the copy.
- **Archive** hides it. Restoring needs the category, brand and unit to still be available.

Your plan may limit the number of products. Adding, duplicating or restoring a product stops with a message once you reach the limit.

## Import products from CSV

1. Click **Import products**, then **Download template**.
2. Fill in the file and upload it (comma-separated, up to 2 MB).
3. Click **Import products** and read the results table. Rows with a problem are skipped and listed with the reason.

Required columns: `name`, `sku`, `description`, `category`, `brand`, `unit`, `base_price`. Category, brand and unit are matched by name against active records (the unit by its full name, not the short name).

Optional columns: `discounted_price`, `charge_tax`, `in_stock`, `barcode`, `tags`, `alert_quantity`, `track_batches`, `track_expiry`, `default_expiry_date`, `starting_quantity`, `batch_number`, `expiry_date`.

:::note
Imported products have no picture and land as drafts. Add a photo and activate each one from the editor.
:::

## Product page

Click **View** on a product to see:

- **Overview**: product profile, pricing breakdown and stock summary.
- **Variants**: the variants, their prices, and a form to add more.
- **Inventory**: stock by branch, plus batches for tracked products.
- **Activity**: every stock change with date, reason, quantity, balance and who made it.

## Related

- [Variants and attributes](variants-and-attributes.md)
- [Categories, brands and units](categories-brands-units.md)
- [Print labels](print-labels.md)
- [Stock levels](../stock/stock-levels.md)
- [Tax rates and groups](../pricing/tax-rates-and-groups.md)
