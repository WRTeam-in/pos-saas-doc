---
title: Backups
description: How your data is backed up, and how to keep your own copy.
---

import Screenshot from '@site/src/components/Screenshot';

# Backups

Your business has no backup screen of its own. Backups are whole-database dumps taken by the platform administrator for every business together.

**Where to find it:** not in the shop panel. Backups are managed in the platform panel under Settings, and need the platform permission `backups.manage`.

## What this means for you

- Nightly database backups are scheduled at 02:00 by the platform, when automatic backup is on. The platform decides how many recent copies to keep (14 by default; it is adjustable between 3 and 90).
- You cannot download or restore a backup from the shop panel. Ask your platform administrator if you need a restore.

:::note
The plan feature labelled **Daily owner summary** (internally `feature.backups`) controls the [Owner Summary](owner-summary.md), not backups.
:::

## Keep your own copy

Owners can download all of their business records at any time with [Data Export](data-export.md). It produces a zip of CSV files and uploaded pictures, and it keeps working even when your subscription is read-only.

If you host this application yourself, see [Cron Jobs](../../installation/cron-jobs.md) so the nightly backup runs,.

## Related

- [Data Export](data-export.md)
- [Owner Summary](owner-summary.md)
- [Cron Jobs](../../installation/cron-jobs.md)
