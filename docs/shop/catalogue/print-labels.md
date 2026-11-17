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

1. Search by name, SKU or barcode and click a result to add it. Only active products and variants appear.
2. Set the quantity for each line (1 to 500 labels).
3. Under **Sheet options**, choose **Paper / label size**:
   - 24 per sheet, 63.5 x 33.9 mm (A4)
   - 58 mm thermal roll
   - 80 mm thermal roll
4. Tick what to **Show on each label**: Product name, SKU, Price, Barcode. At least one is required.
5. Click **Generate sheet**. A print-ready page opens in a new tab. Click **Print**.

The price printed is the variant's current selling price. If a variant has no barcode, its SKU is used to draw the barcode.

## Related

- [Products](products.md)
