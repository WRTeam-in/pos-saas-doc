---
title: Backups
description: Nightly and on-demand database backups, download and restore.
---

import Screenshot from '@site/src/components/Screenshot';

# Backups

A backup is a compressed dump of the whole database, so it contains every business. Only platform admins can reach it.

**Where to find it:** sidebar, **Settings**, **Backups**. Needs `backups.manage`.

<Screenshot name="platform-backups" alt="Backups page with the file list" />

## Automatic backup

Turn on **Automatic nightly backup** to back up every night at 02:00. The newest 14 are kept by default. Change that with **Backups to keep** (3 to 90) and click **Save changes**.

Automatic backups are on by default and need the scheduler cron job. See [Cron jobs](../../installation/cron-jobs.md). If a nightly backup fails, every platform admin is emailed.

## Back up now

Click **Back up now** to create a backup straight away. The page reports the file name. Only one backup runs at a time; a second attempt says another backup is already running.

## Status banners

| Banner | Meaning |
|---|---|
| The last automatic backup failed | Check the message and the server log |
| No backup has been made in the last 36 hours | Check that the scheduler is running |
| There is no backup yet | The first one is made tonight, or use **Back up now** |
| Automatic backups are off | **Back up now** and **Download** still work |

## Download and restore

The list shows each file, its size and date. Click **Download** to save one. Files are named `backup-YYYYMMDD-HHMMSS.sql.gz`, and are stored privately on the server outside the web root.

To restore, run this on the server. It replaces the current data:

```bash
gunzip < backup-YYYYMMDD-HHMMSS.sql.gz | mysql -u USER -p DATABASE
```

## Requirements

Backups work with MySQL, MariaDB and SQLite. For MySQL the `mysqldump` program must be available. If it is not on the server path, set `BACKUP_MYSQLDUMP_PATH` in `.env`. Use `BACKUP_DB_CONNECTION` to back up a different connection.

:::warning
Only a Super admin can download a backup. A backup holds every business's data and password hashes. Download it over a secure connection and store it safely.
:::

Running, failing, downloading and changing the automatic setting are written to the [Audit log](../admins/audit-log.md).

## Related

- [Cron jobs](../../installation/cron-jobs.md)
- [General settings](general-settings.md)
- [Business backups](../../shop/settings/backups.md)
