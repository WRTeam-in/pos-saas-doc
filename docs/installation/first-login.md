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

Shop owners and staff use `/login`, not `/admin/login`. If you installed demo data, a "Demo Store" business exists with sample products and customers.

:::tip
If you lose access, create another admin from the server with `php artisan platform:make-admin you@example.com --name="Your Name"`. It asks for a temporary password of at least 8 characters, which must be changed at first sign-in.
:::

## Related

- [Platform overview](../platform/overview.md)
- [Platform admins](../platform/admins/admins.md)
- [Cron jobs](cron-jobs.md)
