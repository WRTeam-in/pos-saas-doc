---
title: System updates
description: Install a new version from a ZIP package in the Super admin panel.
---

import Screenshot from '@site/src/components/Screenshot';

# System updates

Install a new version of the software from an update package, without a terminal.

**Where to find it:** sidebar, **Settings**, **System updates**. Super admins only.

<Screenshot name="platform-system-updates" alt="System updates page with the installed version and update history" />

## Install an update

1. Check the **Installed version** shown on the page.
2. Choose the **Update package (.zip)**.
3. Enter your password and click **Install update**, then confirm.

What happens:

1. A database backup is made first. If it fails, nothing is changed.
2. The site goes into maintenance mode while files are replaced and database changes run.
3. If anything goes wrong, the replaced files are put back and the version stays as it was.

Rules for the package:

- It must hold a `VERSION` file with a version newer than the installed one.
- Up to 300 MB unpacked. The server's upload limits must allow the file; see [PHP ini settings](../../installation/php-ini-settings.md).
- Your `.env` file and the `storage` folder are never touched.

**Update history** lists each update with its date, version and result.

## Related

- [Updating by hand](../../installation/updating.md)
- [Backups](backups.md)
