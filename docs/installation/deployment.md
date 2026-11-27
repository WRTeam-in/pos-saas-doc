---
title: Deployment
description: Upload the files and point your web server at the public folder.
---

# Deployment

Put the application on your server and make the `public` folder the web root.

**Where to find it:** Installation > Deployment.

## Steps

1. Create an empty MySQL database and a database user.
2. Upload the application files to your server (for example `/var/www/pos`).
3. Set the document root of your domain to the `public` folder, not the project root.
4. Make `storage` and `bootstrap/cache` writable by the web server user.
5. Open your domain in a browser. You are redirected to `/install`.
6. Continue with the [web installer](web-installer.md).

:::warning
Never expose the project root to the web. Only `public` should be reachable, otherwise your `.env` file can be downloaded.
:::

## Dependencies and assets

The package you receive should include the `vendor` folder and the built assets in `public/build`. If either is missing, run these on the server (or locally, then upload):

```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build
```

| Folder or file | Needed on the server? |
|---|---|
| `vendor`, `public/build` | Yes |
| `.env` | Yes, the server's own file. Never replace it with a local one |
| `node_modules` | No, unless you build on the server |
| `resources/js`, `resources/css` | Only if you build on the server |
| `public/hot` | Never upload it. It makes the site look for a development server |
| `tests`, `.git` | No |

## Separate admin domain

By default the Super admin panel is at `/admin`. To serve it on its own host, set `ADMIN_DOMAIN` in `.env` (for example `admin.example.com`) and point that host at the same `public` folder. See [Environment configuration](environment-configuration.md).

## Related

- [Server requirements](server-requirements.md)
- [Web installer](web-installer.md)
- [Cron jobs](cron-jobs.md)
