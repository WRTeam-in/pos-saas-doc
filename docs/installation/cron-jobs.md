---
title: Cron jobs
description: Set up the scheduler that runs loyalty, billing, backup and summary tasks.
---

# Cron jobs

The application relies on the Laravel scheduler. You add one cron entry that runs every minute, and the application decides which tasks are due.

**Where to find it:** your server's crontab.

## Add the cron entry

```bash
* * * * * php /path/to/project/artisan schedule:run >> /dev/null 2>&1
```

Use the full path to your project, and the PHP 8.3 binary if your server has several versions.

## What the scheduler runs

| Command | When | What it does |
|---------|------|--------------|
| `loyalty:expire` | Daily 00:10 | Tidies expired loyalty point lots. |
| `loyalty:remind` | Daily 09:00 | Sends loyalty-expiry reminders. |
| `summary:send` | Every 10 minutes | Sends each business its owner summary once its local send time passes. |
| `payments:sweep-pending` | Every 5 minutes | Settles or releases online payments whose customer never came back. |
| `backup:run` | Daily 02:00 | Nightly database backup for businesses with automatic backup on. |
| `subscriptions:advance` | Daily 00:20 | Moves ended trials, periods and grace to expired or cancelled. |
| `subscriptions:remind` | Daily 09:00 | Sends trial and renewal reminder emails. |
| `platform:digest` | Mondays 08:00 | Weekly platform summary to admins, if switched on. |

A heartbeat task runs every minute to prove the scheduler is working.

:::note
Times follow the server's configured timezone.
:::

## Check it works

In the Super admin panel open Settings > System. Under **System health**, **Scheduler** shows **Running**. If it shows **Not running (check the cron job)** or **No heartbeat yet**, the cron entry is missing or failing. It counts as stale after 5 minutes without a heartbeat.

Without the cron, trials and subscriptions are not advanced, reminders and summaries are not sent, and no nightly backups are made.

## Related

- [Queue worker](queue-worker.md)
- [Backups](../platform/settings/backups.md)
- [FAQs](../faqs.md)
