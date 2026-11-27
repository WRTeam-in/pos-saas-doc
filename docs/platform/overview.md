---
title: Platform overview
description: What the Super admin panel is and what you can do in it.
---

import Screenshot from '@site/src/components/Screenshot';

# Platform overview

The platform panel is where you, the owner of the installation, run the whole SaaS: businesses, plans, payments, support and system settings. Businesses never see it.

**Where to find it:** `/admin`, or the host set in `ADMIN_DOMAIN` in your `.env` file. Sign in at `/admin/login`. Without `ADMIN_DOMAIN` this opens the shared sign-in page at `/login`, which signs in platform admins too.

<Screenshot name="platform-dashboard-overview" alt="Platform panel with the sidebar open" />

## Panel versus shop

| | Platform panel | Shop (business) panel |
|---|---|---|
| Who uses it | Platform admins | Business owners and staff |
| Sign in | `/admin/login` | `/login` |
| Accounts | Platform admins and platform roles | Users, with per-business roles |
| Sees | Every business | Only its own business |

If you set `ADMIN_DOMAIN`, the panel is served only on that host and the public site pages return a 404 there. `ADMIN_DOMAIN` is an `.env` value on purpose, so a wrong value in a screen can never lock you out. See [Environment configuration](../installation/environment-configuration.md).

## Sidebar

Each item is shown only if its route exists. What you can open also depends on your role.

| Menu item | What it is for | Permission |
|---|---|---|
| Dashboard | Headline numbers and alerts | Every admin |
| Businesses | Every business and its subscription | `businesses.view` |
| Reports | Business report, revenue, retention | `reports.view` |
| Features | Turn a feature on or off per business | `features.manage` |
| Support | Support requests from businesses | `support.manage` |
| Announcements | Banners shown to businesses | `announcements.manage` |
| Invoices | Subscription invoices | `billing.view` |
| Plans | Plans and what they include | `billing.view` |
| Website | Text, pictures and design of the public home page | `settings.manage` |
| Settings | Platform settings, payments, legal, languages, backups | `settings.manage` |
| Admins | Admins and roles | `admins.manage` |
| Audit log | Everything admins did | `audit.view` |

A search box finds a business by name, a person by name or email, or an invoice by number. It needs `businesses.view` and at least two characters.

Every admin also has **My account** (change password, two-factor, recovery codes). See [Login and two-factor](login-and-two-factor.md).

## How the SaaS fits together

- A new business signs up and starts on the trial plan. Its subscription moves through trial, active, payment overdue (grace) and read-only.
- Plans decide limits (branches, team members, products) and yes/no features. You can override both per business.
- Businesses pay for plans through the gateways you configure under [Payment gateways](money/payment-gateways.md). You can also record a manual payment.
- Everything you change in the panel is written to the [Audit log](admins/audit-log.md).

:::note
Several features depend on the scheduler cron job (subscription changes, reminders, backups, the weekly summary). Check it under Settings, System. See [Cron jobs](../installation/cron-jobs.md).
:::

## Related

- [Login and two-factor](login-and-two-factor.md)
- [Dashboard](dashboard.md)
- [Website](website.md)
- [Businesses](businesses/businesses.md)
- [Roles and permissions](admins/roles-and-permissions.md)
