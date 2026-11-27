---
title: Web installer
description: Walk through every screen of the browser-based installer.
---

import Screenshot from '@site/src/components/Screenshot';

# Web installer

The installer sets up the database and creates your Super admin account. It opens automatically when you visit an uninstalled site.

**Where to find it:** Open your domain, or go to `/install`.

<Screenshot name="install-welcome" alt="Installer welcome screen" />

## The screens

1. **Welcome.** Lists what you need: app URL and database host, port, name, username and password. Click **Next step**.
2. **Server requirements.** Shows each PHP version and extension as passed or failed. Fix failures and click **Reload**. See [Server requirements](server-requirements.md).
3. **Folder permissions.** Checks `/storage/framework`, `/storage/logs` and `/bootstrap/cache`.
4. **Purchase code.** Enter your purchase code. It is verified against the WRTeam validator for your domain. There is no way to skip it.
5. **PHP functions.** Confirms `symlink` and `proc_open` are enabled and `open_basedir` is off.
6. **Database.** Enter **Database host**, **Database port**, **Database name**, **Database user**, **Database password** and **Database prefix**. The database must be empty.
7. **Migrations.** Creates all tables and loads the base data. This can take a while, so do not close the page.
8. **Site and admin.** See below.
9. **Finish.** Shows your website address and admin login link.

<Screenshot name="install-site-and-admin" alt="Site and admin step of the installer" />

## Site and admin

| Field | What it does |
|-------|--------------|
| Platform name | The name of your platform, saved as the application name. |
| App url | Your site's address. |
| Admin name | Name of your Super admin account. |
| Admin email | The email you sign in with. |
| Admin password | At least 8 characters. |
| Confirm admin password | Repeat the password. |
| Install demo data | Optional. Adds a "Demo Store" business with sample products and customers, an owner `owner@example.com` and a cashier `cashier@example.com` (password `Demo@2026` for both). Not for a live site. |

This step also generates the encryption key, writes the settings to `.env` (production mode, debug off) and creates the storage link.

## After installing

On finish the installer locks itself and `/install` becomes a 404. Your first sign-in at `/admin/login` asks you to set up two-factor authentication. See [First login](first-login.md).

## Troubleshooting

- **Validation server could not be reached.** Your host blocks outbound HTTPS on port 443 or DNS fails. Ask the host to allow it.
- **Purchase code not valid for this site.** If it is registered to another domain, reset it from your purchase account first.
- **Database step fails.** Check host, port, name, user and password, and that `pdo_mysql` is installed. The database must have no tables.
- **Redirected to `/install` on an installed site.** The database has no tables, or `.env` points to the wrong database. See [FAQs](../faqs.md).

## Related

- [Environment configuration](environment-configuration.md)
- [Cron jobs](cron-jobs.md)
- [First login](first-login.md)
