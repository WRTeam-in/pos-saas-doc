---
title: FAQs
description: Answers to common installation and usage problems.
---

# FAQs

## The page has no CSS and looks like plain HTML

A leftover `public/hot` file makes the app load assets from a development server that is not running. Delete `public/hot`. If `public/build` is missing, run `npm run build`.

## I am redirected to /install

The database has no tables, or `.env` points at the wrong or an empty database. Check the `DB_*` values in `.env`. For a new site, run the [web installer](installation/web-installer.md). For development, run `php artisan migrate --seed`.

## I get a 404 on /install

That is expected once installation finishes. The installer locks itself by writing `storage/installed`.

## My `.env` or config changes are ignored

Run `php artisan optimize:clear`.

## Class or route not found after an update

Run `composer install`, `php artisan migrate`, `npm install`, `npm run build`, then `php artisan optimize:clear`. See [Updating](installation/updating.md).

## The installer says the validation server cannot be reached

Your host blocks outbound HTTPS (port 443) or DNS fails. Ask your host to allow it.

## The Scheduler shows "Not running" in Settings > System

The cron entry is missing or failing. See [Cron jobs](installation/cron-jobs.md).

## Do I need a queue worker?

No. See [Queue worker](installation/queue-worker.md).

## Uploads fail or show "Upload too large"

Raise `upload_max_filesize` and `post_max_size`. See [PHP ini settings](installation/php-ini-settings.md).

## Emails are not arriving

With the default `log` mailer emails are only written to the log. Enter SMTP details under Settings > System email in the Super admin panel and send a test email.

## A business can only view data and cannot add or edit

A business becomes read-only when its trial or grace period has ended. The owner needs to subscribe or renew. See [Billing and plans](shop/account/billing-and-plans.md). Run the scheduler so statuses stay up to date.

## Backups fail

`mysqldump` must be installed and reachable. Set `BACKUP_MYSQLDUMP_PATH` in `.env` if it is not on the PATH. See [Backups](platform/settings/backups.md).

## I locked myself out of the Super admin panel

Create another admin with `php artisan platform:make-admin you@example.com --name="Your Name"`.

## Related

- [Support](support.md)
- [Installation overview](installation/overview.md)
