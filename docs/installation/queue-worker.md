---
title: Queue worker
description: Whether you need a queue worker.
---

# Queue worker

You do not need to run a queue worker. The application code does not queue jobs for emails, SMS or payments; they are handled in the request or by the scheduler.

**Where to find it:** Installation > Queue worker.

## Configuration

`QUEUE_CONNECTION` defaults to `database` in `.env`. The Super admin panel shows **Queued jobs** and **Failed jobs** counts under Settings > System > **System health**. Both normally stay at 0.

## If you add a worker anyway

If you customise the application to queue work, run a worker under a process manager such as Supervisor:

```bash
php artisan queue:work --tries=3
```

Restart it after each [update](updating.md) with `php artisan queue:restart`.

## Related

- [Cron jobs](cron-jobs.md)
- [Environment configuration](environment-configuration.md)
