---
title: First login
description: Sign in to the Super admin panel for the first time.
---

# First login

After the installer finishes, you sign in with the Super admin account you created.

**Where to find it:** `/admin/login`, or your `ADMIN_DOMAIN` host if you set one.

## Steps

1. Open `/admin/login` and sign in with the admin email and password from the installer.
2. Set up two-factor authentication when asked. See [Login and two-factor](../platform/login-and-two-factor.md).
3. Open the dashboard. See [Dashboard](../platform/dashboard.md).
4. Go to the platform settings and fill in the platform details, system email, plans and payment gateways.

## Businesses sign in elsewhere

Shop owners and staff use `/login`, not `/admin/login`. If you installed demo data, a "Demo Store" business exists with sample products and customers. Its owner is `owner@example.com` and its cashier `cashier@example.com`, both with the password `Demo@2026`. Change these passwords or remove the store before you go live.

## Demo login buttons

On a demo site the `/login` page shows three buttons under the form: **Platform admin**, **Business partner** and **Cashier**. One click signs in as that account. They appear only when `DEMO_MODE` or `DEMO_LOGIN_CARDS` is `true` in `.env`.

| Button | Email | Password |
|---|---|---|
| Platform admin | `admin@example.com` | `Demo@2026` |
| Business partner | `owner@example.com` | `Demo@2026` |
| Cashier | `cashier@example.com` | `Demo@2026` |

:::warning
Keep demo mode and the demo login buttons off on a real live site. See [Demo mode](demo-mode.md).
:::

:::tip
If you lose access, create another admin from the server with `php artisan platform:make-admin you@example.com --name="Your Name" --role="Super admin"`. It asks for a temporary password of at least 12 characters, which must be changed at first sign-in.
:::

## Related

- [Platform overview](../platform/overview.md)
- [Platform admins](../platform/admins/admins.md)
- [Cron jobs](cron-jobs.md)
