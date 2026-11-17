---
title: Localhost setup
description: Run the application on your own computer for development or testing.
---

# Localhost setup

For development you set up the database with commands instead of the web installer.

**Where to find it:** a terminal in the project folder.

## Requirements

PHP 8.3+, Composer 2, Node.js 20+ with npm, and MySQL 8 or MariaDB 10.6+. With XAMPP on macOS, use XAMPP's MySQL and make sure `php -v` shows 8.3 or newer.

## Steps

1. Install dependencies and create the environment file:

   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

2. Create an empty database (for example `pos`) and set `APP_URL`, `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` in `.env`.
3. Create the tables and demo shop:

   ```bash
   php artisan migrate --seed
   php artisan storage:link
   npm install
   npm run build
   ```

4. Start the app with `php artisan serve` and open `http://127.0.0.1:8000`.
5. Create a Super admin: `php artisan platform:make-admin you@example.com --name="Your Name"`.

## Logging in

| Where | URL | Login |
|-------|-----|-------|
| Shop owner | `/login` | `test@example.com` / `password` |
| Super admin | `/admin/login` | The account you created in step 5 |

:::warning
Never run `php artisan db:seed` on a live site. It creates the `test@example.com` demo login.
:::

:::note
Open the site only after migrating. With no tables the app redirects to `/install`.
:::

## Related

- [Environment configuration](environment-configuration.md)
- [FAQs](../faqs.md)
