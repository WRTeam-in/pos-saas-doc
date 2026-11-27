---
title: Updating
description: Update an installed copy to a newer version.
---

# Updating

Back up first, replace the code, then run the database migrations. With an update package (ZIP) you can do it from the panel instead: see [System updates](../platform/settings/system-updates.md).

**Where to find it:** a terminal on your server.

## Steps

1. Back up your database and the `storage` folder. See [Backups](../platform/settings/backups.md).
2. Upload the new files over the old ones. Keep your `.env` file and the `storage` folder.
3. Install dependencies and build assets if your package does not include them:

   ```bash
   composer install --no-dev --optimize-autoloader
   npm install
   npm run build
   ```

   If you build on your computer, replace the whole `public/build` folder on the server. `node_modules` is not needed there.

4. Run the migrations:

   ```bash
   php artisan migrate --force
   ```

5. Clear caches:

   ```bash
   php artisan optimize:clear
   ```

6. Check the site and Settings > System > **System health**.

:::warning
Do not run `db:seed` or `migrate:fresh` on a live site.
:::

## Related

- [Cron jobs](cron-jobs.md)
- [Changelog](../changelog.md)
- [FAQs](../faqs.md)
