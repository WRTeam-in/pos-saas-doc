---
title: Print Labels
description: Print barcode labels for products on A4 sheets or thermal rolls.
---

import Screenshot from '@site/src/components/Screenshot';

# Print Labels

Generate a print-ready sheet of labels with barcodes for any active product or variant.

**Where to find it:** Inventory > Catalogue > Print Labels. Needs `products.view`.

<Screenshot name="shop-print-labels" alt="Print labels builder with sheet options" />

## Print a sheet

1. Add the products you need. There are three ways, and you can mix them:
   - **Search:** type a name, SKU or barcode in the search box and click a result. Press Enter on an exact code to add it at once.
   - **Scan:** scan a barcode at any time, wherever the cursor is. Each scan adds one more label for that item.
   - **Select products:** opens a pop-up where you can pick many items at once (see below).

   Only active products and variants appear. Each line shows the SKU, price and stock in the current branch. Clicking or scanning an item that is already in the list adds one to its quantity.
2. Set the quantity for each line (0 to 500 labels). A line set to 0 stays in the list but is marked **Not printed**.
3. Under **Sheet options**, choose **Paper / label size**:
   - 24 per sheet, 63.5 x 33.9 mm (A4)
   - 58 mm thermal roll
   - 80 mm thermal roll
4. Tick what to **Show on each label**: Product name, SKU, Price, Barcode. At least one is required.
5. Check the totals under the options: **Products**, **Labels** and, for A4, **Sheets**.
6. Click **Generate sheet**. A print-ready page opens in a new tab. Click **Print**.

The price printed is the variant's current selling price. If a variant has no barcode, its SKU is used to draw the barcode.

## Select many products at once

Click **Select products** to open the pop-up.

1. Narrow the list with the search box, a category (sub-categories are listed under their parent) and a brand.
2. Tick the items you want. Click **Show more** to load the next page of results.
3. **Select all** ticks every item that matches the filters, up to 1,000. If more match, only the first 1,000 are ticked and a message asks you to use the filters for the rest. **Clear all** unticks everything.
4. Click **Add selected**. Each new item is added with a quantity of 1.

Items already in your list are marked **Added** and cannot be ticked again.

## Change many quantities at once

Once the list has items, a bar above it offers:

| Control | What it does |
|---|---|
| **Quantity for all** | Type a number and click **Apply** to give every line that quantity |
| **Match stock** | Sets each line to the stock in this branch, so you print one label per piece. Items with no stock are set to 0, and no line goes above 500 |
| **Clear all** | Empties the list |

Use the cross on a line to remove just that item.

## Limits

- You can print at most 1,000 labels at a time. The running total turns into a warning above that, and **Generate sheet** stays off until you lower the quantities.
- Barcodes are drawn at their true size so scanners can read them. If a code is too long to fit on the chosen label, it is printed as text instead, and a note at the top of the print page lists those codes. On a thermal roll a long barcode may be turned to run along the roll.

## Related

- [Products](products.md)
