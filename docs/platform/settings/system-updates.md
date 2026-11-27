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
4. If the failure happens during the database changes, the message says so and names the database backup made in step 1. Some database changes may already be in place, so download that backup from **Backups**, import it with your database tool, then try again.

Rules for the package:

- It must hold a `VERSION` file with a version newer than the installed one.
- Up to 300 MB unpacked. The server's upload limits must allow the file; see [PHP ini settings](../../installation/php-ini-settings.md).
- Your `.env` file and the `storage` folder are never touched.

**Update history** lists each update with its date, version and result.

## If an update stops halfway

If the server stops the update partway through, for example on a time limit or a memory error, the site can stay in maintenance mode.

1. Run `php artisan up` on the server to open the site again.
2. Check `storage/logs` for the error.
3. The files that were replaced are copied to `storage/app/updates/<date>-<old>-to-<new>/files`. Put them back if the site does not work.
4. If database changes were made, download the backup from **Backups** and import it with your database tool, such as phpMyAdmin or the `mysql` command.
5. Install the package again once the cause is fixed.

## Make an update package (developers)

Build the package on your development copy with:

```bash
php artisan update:package 1.1.0 --since=v1.0.0
```

- `--since` is the git tag or commit of the version your customers run. Every file changed since then goes in.
- When CSS or JavaScript changed, the compiled `public/build` folder is added by itself. Run `npm run build` first.
- When `composer.json` or `composer.lock` changed, the whole `vendor` folder is added by itself. Run `composer install --no-dev --optimize-autoloader` first so no development tools ship.
- Add `--with-build` or `--with-vendor` to include them anyway.
- Deleted files are listed as a warning. An update only adds and replaces files, so they stay on the server.

The package is saved to `storage/app/packages/update-<version>.zip`.

## Related

- [Updating by hand](../../installation/updating.md)
- [Backups](backups.md)
