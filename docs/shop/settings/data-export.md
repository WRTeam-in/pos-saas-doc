---
title: Data Export
description: Download every record of your business as a zip of CSV files.
---

import Screenshot from '@site/src/components/Screenshot';

# Data Export

Data export gives the owner a zip file with every record of the business as CSV files, plus your uploaded pictures and receipts.

**Where to find it:** sidebar > **System** > **Settings**, **Your data** card at the bottom. Requires `settings.manage` and `data.export`, which only the Owner has.

<Screenshot name="shop-data-export" alt="Your data card with Include pictures and receipts option" />

## Export your data

1. Open **Settings**.
2. In **Your data**, tick or untick **Include pictures and receipts**.
3. Click **Export my data**.

The browser downloads `<business code>-data-<date>.zip`. It is built while you wait, so a large business can take a while. Leave the page open.

## What is in the zip

| Item | Contents |
| --- | --- |
| `tables/*.csv` | One CSV per kind of record: products, sales, customers, stock movements, purchases, expenses, settings, team and more. UTF-8, opens in Excel or Sheets. |
| `files/` | Product pictures, logos and member avatars, when pictures are included. |
| `manifest.json` | Business name, time generated, row count per table, and which columns were left out. |

Passwords, gateway secrets and tokens are never included. Gateway and SMTP secret settings are left out. If your files total more than 1 GB they are omitted and the manifest says so.

## Limits

- Up to 3 exports per hour per business.
- Only one export can run at a time.
- A business with more than 2,000,000 rows cannot be exported this way. Ask your platform administrator.
- Each export is written to the [Audit Log](../account/audit-log.md) as **data_exported**.
- Export still works when your subscription is read-only.

## Related

- [Backups](backups.md)
- [Audit Log](../account/audit-log.md)
- [Billing & Plans](../account/billing-and-plans.md)
