---
title: Installation overview
description: The steps to install the application on a server.
---

# Installation overview

You install the application by uploading the files to your server, pointing the web server at the `public` folder, and running the web installer in your browser.

**Where to find it:** Installation, the first page.

## The steps

1. Check your [server requirements](server-requirements.md).
2. [Deploy the files](deployment.md) and set the document root to `public`.
3. Open your site. It redirects to `/install`, the [web installer](web-installer.md).
4. Finish the installer and create your Super admin account.
5. Add the [cron job](cron-jobs.md).
6. [Sign in](first-login.md) at `/admin/login`.

## Good to know

- The installer needs an **empty** database. It never wipes an existing one.
- Once installation finishes, `/install` returns a 404 and cannot be run again.
- No default admin exists after installing. You create your own in the last installer step.
- There is no queue worker to configure. See [Queue worker](queue-worker.md).

Developers who want to run the code locally should read [Localhost setup](localhost-setup.md).

## Related

- [Environment configuration](environment-configuration.md)
- [PHP ini settings](php-ini-settings.md)
- [Updating](updating.md)
