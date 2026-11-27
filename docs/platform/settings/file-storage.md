---
title: File storage
description: Keep uploaded files on the server or in an Amazon S3 compatible bucket, and move between them.
---

import Screenshot from '@site/src/components/Screenshot';

# File storage

Choose where uploaded pictures and receipts are kept: on this server or in an S3 bucket. Businesses never see this setting.

**Where to find it:** sidebar, **Settings**, **File storage**. Super admins only.

<Screenshot name="platform-file-storage" alt="File storage page with the S3 bucket fields" />

## Use an S3 bucket

1. Fill in the bucket details and click **Save**.
2. Click **Test connection**. It writes, reads and deletes a small test file.
3. Switch to **Amazon S3 (or S3-compatible)** and confirm.

| Field | What it does |
|---|---|
| Access key ID, Secret access key | The bucket's keys. Leave blank to keep the saved ones |
| Bucket | The bucket's name |
| Region | For example `us-east-1`. Use `auto` for Cloudflare R2 |
| Endpoint | Only for S3-compatible services such as MinIO, DigitalOcean Spaces or Cloudflare R2 |
| Use path-style URLs | Turn on for MinIO and similar services |

## What happens when you switch

- New uploads go to the new place at once.
- Existing files are moved in the background and stay visible meanwhile. The page shows how many have moved.
- Files that could not be moved are counted. Click **Retry** to queue them again.
- You can switch back to the local disk in the same way. One switch must finish before the next starts.

:::note
Moving files needs the scheduler. If the page says it does not seem to be running, see [Cron jobs](../../installation/cron-jobs.md).
:::

## Related

- [Backups](backups.md)
- [General settings](general-settings.md)
