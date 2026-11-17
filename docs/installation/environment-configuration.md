---
title: Environment configuration
description: The .env values you may need to change after installing.
---

# Environment configuration

The installer writes your `.env` file. You rarely need to touch it, but these are the values that matter. Most business settings live inside the panels, not in `.env`.

**Where to find it:** the `.env` file in the project root.

## Key values

| Variable | What it does |
|----------|--------------|
| `APP_NAME` | The application name. Set by the installer. |
| `APP_URL` | Your site's full address, for example `https://example.com`. |
| `APP_ENV` | `production` on a live site. |
| `APP_DEBUG` | Must be `false` on a live site. |
| `APP_KEY` | The encryption key. Never change it on a live site. |
| `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Database connection. |
| `ADMIN_DOMAIN` | Serve the Super admin panel on its own host (for example `admin.example.com`) instead of `/admin`. Leave empty to use `/admin`. |
| `BACKUP_MYSQLDUMP_PATH` | Path to `mysqldump` if it is not on the PATH. Used by backups. |
| `INSTALLER_VALIDATOR_URL` | Purchase code validator used by the installer. Leave the default. |
| `SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION` | Default to `database`. |

:::warning
Changing `APP_KEY` makes saved encrypted values unreadable, such as gateway keys and SMS secrets. Back it up.
:::

## Email

The `.env` mail values default to the `log` mailer, which only writes emails to the log. For real email, enter your SMTP details in the Super admin panel under Settings > System email, then use **Send test email**. Businesses can also use their own mail account in their [email settings](../shop/settings/email-settings.md).

## After changing .env

Clear cached configuration so the new values are read:

```bash
php artisan optimize:clear
```

## Related

- [Web installer](web-installer.md)
- [Cron jobs](cron-jobs.md)
- [FAQs](../faqs.md)
