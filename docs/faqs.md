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

Create another admin with `php artisan platform:make-admin you@example.com --name="Your Name" --role="Super admin"`.

## Do I need node_modules on the server?

No. It is only used to build the CSS and JavaScript. Build on your computer with `npm run build` and upload the whole `public/build` folder. You need `node_modules` only if you build on the server, and you can delete it afterwards. See [Deployment](installation/deployment.md).

## A new menu item, such as Website, does not appear

Run `php artisan optimize:clear`. Then check that your role has the permission; Website needs `settings.manage`. See [Website](platform/website.md).

## How do I change the text or pictures of the home page?

In the Super admin panel under [Website](platform/website.md).

## How do I run a public demo?

See [Demo mode](installation/demo-mode.md).

## What are the demo login details?

On a demo site the login page shows three buttons that sign in with one click: **Platform admin** (`admin@example.com`), **Business partner** (`owner@example.com`) and **Cashier** (`cashier@example.com`), all with the password `Demo@2026`. You can change them with `DEMO_ADMIN_EMAIL`, `DEMO_PARTNER_EMAIL`, `DEMO_CASHIER_EMAIL` and the matching `..._PASSWORD` values in `.env`. See [Demo mode](installation/demo-mode.md#demo-logins).

## The login page shows demo buttons on my live site

Set `DEMO_MODE=false` and `DEMO_LOGIN_CARDS=false` in `.env`, then run `php artisan optimize:clear`. Never leave demo logins on for a real site, and change or remove the sample accounts.

## I was sent to the login page with "Your session expired and nothing was saved"

You sent a form after your session had ended, for example after leaving a page open for a long time. Sign in again; you return to the page you were on. Enter the change again, because it was not saved. On the sign-up and password pages the message is "The page was open too long, so nothing was sent. Please try again."

## How do I change the picture behind the login page?

Upload a **Login background** under the Super admin panel's [General settings](platform/settings/general-settings.md#platform). Without one, `public/images/auth-bg.jpg` is used (or a `.jpeg`, `.png` or `.webp` file with that name).

## Related

- [Support](support.md)
- [Installation overview](installation/overview.md)
