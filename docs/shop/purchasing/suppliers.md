---
title: Suppliers
description: Keep a list of the people and businesses you buy from.
---

import Screenshot from '@site/src/components/Screenshot';

# Suppliers

Suppliers are the people and businesses you buy stock from. You pick one on every purchase order.

**Where to find it:** Purchasing > Suppliers. Permissions: `suppliers.view`, `suppliers.create`, `suppliers.update`, `suppliers.delete`.

<Screenshot name="shop-suppliers-list" alt="Suppliers list with amount owed" />

## The suppliers list

Tabs filter by status. Search by name. Columns: Name, Code, Contact person, **We owe this supplier** (the unpaid balance on their orders) and Status.

## Add a supplier

1. Click **New supplier**.
2. Fill in the form and click **Save supplier**.

| Field | What it does |
| --- | --- |
| Active | Off hides the supplier from the purchase order form without deleting it. |
| Name | Display name. Required and unique among active suppliers. |
| Code | Optional short reference, unique. Leave blank to auto-generate. |
| Business name | Optional registered or trading name. |
| Contact person, Phone, Email | All required. |
| Address line 1, City, Country | Required. Address line 2, State / region and Postal code are optional. |
| Tax registration number | Optional. Used on purchase invoices. |
| Notes | Internal notes, visible to staff only. |

When you edit a supplier, a **Purchasing** section shows **We owe this supplier**, the number of **Purchase Orders** and their recent orders.

## Import suppliers

Click **Import suppliers** and **Download template**, fill it in, then upload it (comma-separated, up to 2 MB). Only `name` is required. Other columns: `code`, `business_name`, `contact_person`, `phone`, `email`, `status`, `address_1`, `address_2`, `city`, `state`, `postal_code`, `country` (2-letter code such as US), `tax_reg_no`, `notes`. Skipped rows are listed with the reason.

## Archive and delete

A supplier with purchase orders cannot be archived or deleted. Otherwise use **Archive**, then **Restore** or **Delete permanently** from the archived tab. Archived and inactive suppliers take no new orders.

## Related

- [Purchase orders](purchase-orders.md)
- [Reorder suggestions](reorder-suggestions.md)
