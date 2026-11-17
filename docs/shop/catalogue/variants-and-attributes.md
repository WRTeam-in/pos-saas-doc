---
title: Variants and Attributes
description: Sell one product in several sizes, colours or other options.
---

import Screenshot from '@site/src/components/Screenshot';

# Variants and Attributes

An attribute is a characteristic such as Color or Size, with a list of values (Black, White, Red). A variable product has one variant per combination of values, and each variant has its own SKU, barcode, cost and stock.

**Where to find it:** Inventory > Catalogue > Attributes (`attributes.view`, `attributes.create`, `attributes.update`). Variants are managed on the product form and on the product page (`products.update`).

<Screenshot name="shop-attribute-form" alt="Attribute form with values and category limits" />

## Create an attribute

1. Click **New Attribute**.
2. Enter a **Name**, for example Size.
3. Set **Status**. Inactive hides the attribute from the variant builder without deleting it.
4. Under **Values**, type each value and click **Add Value**.
5. Under **Applies to categories**, untick the categories that should not offer this attribute. With everything ticked it is available for every category. Use the search box, **Select all** and **Clear all** to speed this up.
6. Click **Save Attribute**.

When editing an attribute you add new values with **New Value** and **Add Value**, and switch a value on or off with its **Activate** or **Deactivate** button. Names are unique, and a value can only appear once per attribute.

You can also create an attribute while building a product: click **Add Attribute** in the Variants section and type the name and comma separated values (for example `Red, Blue, Green`). This needs `attributes.create`.

## Make a variable product

1. On the product form choose **Variable** as the Product Type.
2. In **Variants**, tick the attribute values you want (for example Size: Small, Medium and Color: Red, Blue).
3. Click **Generate Variants**. Rows also update automatically as you tick values.
4. Optionally use **Fill all rows** to set the same **Cost Price** and **Starting quantity** on every row, then click **Fill all**.
5. Edit each row: **SKU**, **Barcode**, **Cost Price**, **Starting quantity** (new products only), **Status** (Active or Inactive) and **Tax Group**. Use the remove button to drop a row.
6. Save the product.

<Screenshot name="shop-product-variants-grid" alt="Variant grid on the product form" />

Rules:

- A variable product needs at least one variant, and up to 100 are allowed.
- SKUs and barcodes must be unique.
- A combination cannot appear twice.
- Only attributes that apply to the product's category can be used.

## Manage variants on the product page

Open a product and go to the **Variants** tab.

- **Add variant**: pick one value per attribute, then enter SKU, Barcode, Cost Price, optionally a Base price and Discounted price, and the Starting quantity. Adding a variant to a simple product turns it into a variable product.
- **Edit prices**: change a variant's Cost Price, Base price and Discounted price. Leave the base price empty to use the product's price (shown as **Same as product**). A discounted price must be lower than the base price.
- **Remove**: deletes a variant. You cannot remove the last variant of a variable product.

The table shows each variant's selling price after any [price list](../pricing/price-lists.md) or [discount rule](../pricing/discount-rules.md), and its current stock in your branch.

### Stock on the Base product

A simple product keeps a hidden Base product that holds its stock. Once real variants exist, the Base product is no longer sold. If it still holds stock, a **Stock on the Base product** card appears: choose the **Branch**, the variant to **Move to**, and the **Quantity**, then click **Move stock**. You can move part of it and repeat. This is not available for products that track batches.

## Related

- [Products](products.md)
- [Categories, brands and units](categories-brands-units.md)
- [Stock adjustments](../stock/stock-adjustments.md)
