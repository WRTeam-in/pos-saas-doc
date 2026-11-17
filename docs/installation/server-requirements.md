---
title: Server requirements
description: PHP version, extensions, folders and database needed by the application.
---

# Server requirements

The installer checks these automatically on its Server requirements and Folder permissions screens. Check them first to avoid surprises.

**Where to find it:** Installation > Server requirements.

## PHP

PHP **8.3.0 or newer** is required. These extensions must be loaded:

| Extension | Extension |
|-----------|-----------|
| `pdo_mysql` | `mbstring` |
| `fileinfo` | `openssl` |
| `tokenizer` | `json` |
| `curl` | `bcmath` |
| `ctype` | `dom` |
| `gd` | `xml` |
| `zip` | |

## PHP functions and settings

The installer has a PHP functions step. These must be satisfied:

- The `symlink` function is enabled (used for `storage:link`).
- The `proc_open` function is enabled.
- `open_basedir` is not set.

## Folders

These must be writable by the web server:

- `storage/framework`
- `storage/logs`
- `bootstrap/cache`

Other folders under `storage` also need to be writable, since uploads and backups are stored there.

## Database

- MySQL 8 or MariaDB 10.6+.
- An empty database and a user with full rights on it.

## Other

- **Outbound HTTPS (port 443)** so the installer can validate your purchase code, and for payment gateways and email.
- **`mysqldump`** on the server's PATH, only for backups. If it lives elsewhere, set `BACKUP_MYSQLDUMP_PATH` in `.env`.
- **Cron** access, to run the scheduler every minute.
- **Node.js 20+ and npm**, only if you build assets yourself. The built assets are what you deploy.

## Related

- [Deployment](deployment.md)
- [PHP ini settings](php-ini-settings.md)
- [Web installer](web-installer.md)
