---
title: Demo mode
description: Run a public demo site with sample logins and protected settings.
---

# Demo mode

Demo mode lets visitors try every panel while the important settings stay protected.

**Where to find it:** the `.env` file in the project root.

:::danger
Never turn on demo mode or the demo login buttons (`DEMO_MODE`, `DEMO_LOGIN_CARDS`) on a real live site. Anyone who opens the login page could then sign in with one click, including as a platform admin. Keep both set to `false` on a site with real businesses and customers.
:::

## Turn it on

```bash
DEMO_MODE=true
DEMO_BYPASS_EMAILS=you@yourcompany.com
```

Then run `php artisan optimize:clear`.

| Variable | What it does |
|---|---|
| `DEMO_MODE` | `true` turns demo mode on |
| `DEMO_LOGIN_CARDS` | Shows the demo login buttons on the sign-in page. Follows `DEMO_MODE` when not set |
| `DEMO_BYPASS_EMAILS` | Emails, separated by commas, that skip every demo restriction |
| `DEMO_PURCHASE_URL` | Where the **Buy now** button goes. Default: the POS SaaS page on the WRTeam marketplace |
| `DEMO_ADMIN_EMAIL`, `DEMO_PARTNER_EMAIL`, `DEMO_CASHIER_EMAIL` | Change the accounts behind the demo login buttons. Each has a matching `..._PASSWORD` variable |

## Demo logins

When demo logins are on, the sign-in page (`/login`) shows **Or try a demo account** under the form, with three buttons. One click on a button signs the visitor in as that account straight away. There is nothing to copy or type.

| Button | Opens | Email | Password | Change with |
|---|---|---|---|---|
| **Platform admin** | The Super admin panel | `admin@example.com` | `Demo@2026` | `DEMO_ADMIN_EMAIL`, `DEMO_ADMIN_PASSWORD` |
| **Business partner** | The shop panel as the store owner | `owner@example.com` | `Demo@2026` | `DEMO_PARTNER_EMAIL`, `DEMO_PARTNER_PASSWORD` |
| **Cashier** | The shop panel as a cashier | `cashier@example.com` | `Demo@2026` | `DEMO_CASHIER_EMAIL`, `DEMO_CASHIER_PASSWORD` |

The buttons are shown when `DEMO_LOGIN_CARDS=true`, or when `DEMO_MODE=true` and `DEMO_LOGIN_CARDS` is not set. To show demo mode without the buttons, set `DEMO_LOGIN_CARDS=false`. Run `php artisan optimize:clear` after any change.

The buttons only fill in and send the details above. The accounts must exist with that email and password. The demo seeder and `demo:accounts` below create or fix the default ones; if you change the emails or passwords with the variables, change the accounts to match. If you set `ADMIN_DOMAIN`, the **Platform admin** button sends the visitor to the admin sign-in page on that domain, where they sign in again.

The full demo data, with three shops and months of sales, is created with:

```bash
php artisan db:seed --class=LaunchDemoSeeder
```

On a demo site that was seeded earlier with other emails, this renames the sample accounts and sets the password. It refuses to run on a live site.

```bash
php artisan demo:accounts
```

If the sample Super admin has two-factor on, visitors still need its code to sign in.

## What visitors cannot do

- **Super admin panel:** save, change or delete anything. Reading is open, except downloading backups and opening the server logs.
- **Shop panel:** change settings, email and SMS settings, templates, gift card and loyalty settings, profile, password, roles, team and billing, or export and import data.

Everyday work stays open: selling, products, stock, customers and purchasing. A **Demo** badge is shown in the header and a **Buy now** button in the bottom corner (on the POS terminal both are in the header).

:::note
Demo data is not reset automatically. Visitors can add and delete products, customers and sales.
:::

## Your own unrestricted Super admin

1. Create the account first. The password needs at least 12 characters:

   ```bash
   php artisan platform:make-admin you@yourcompany.com --name="Owner" --role="Super admin"
   ```

2. Add the same email to `DEMO_BYPASS_EMAILS` and run `php artisan optimize:clear`.
3. Sign in. You change the password and, when it is required, set up two-factor.

This account is never shown on the demo login buttons.

## Related

- [Environment configuration](environment-configuration.md)
- [Login and two-factor](../platform/login-and-two-factor.md)
