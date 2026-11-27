---
title: General settings
description: Platform name, branding, sign-up rules, billing, system email, security and system health.
---

import Screenshot from '@site/src/components/Screenshot';

# General settings

Platform-wide settings live in one place, with a menu on the left. Settings are saved in the database and take effect at once.

**Where to find it:** sidebar, **Settings**. Needs `settings.manage`.

<Screenshot name="platform-settings-platform" alt="Platform settings page with the settings menu" />

The settings menu groups pages like this:

| Group | Pages |
|---|---|
| General | Platform, Appearance, New business defaults |
| Sign-up and billing | Sign-up, Billing, [Payments](../money/payment-gateways.md) |
| Messaging | System email, [Email templates](mail-templates.md) |
| Security and system | Security, [Legal pages](legal-pages.md), [Languages](languages.md), [Backups](backups.md), [File storage](file-storage.md), [System updates](system-updates.md), System |

Changes that alter a value are written to the [Audit log](../admins/audit-log.md) as "Settings updated" (secrets are masked).

## Platform

| Field | What it does |
|---|---|
| Platform name | Shown in the panel, emails and the authenticator app. Empty uses the name from the server configuration |
| Support email | Receives new support requests. Empty means every admin is emailed |
| Company name, Company address | Your company details |
| Email a weekly summary to platform admins | Sent Mondays at 08:00. Needs the scheduler cron job |
| Logo (light theme), Logo (dark theme) | Wide logo with your name, for the sidebar, sign-in pages and website header. The dark one falls back to the light one. PNG, JPG or WebP, up to 1 MB. Empty space around the logo is trimmed and a very large logo is scaled down when you upload it, so there is no need to crop or resize it first |
| Short logo (light theme), Short logo (dark theme) | Square icon for the collapsed sidebar. PNG, JPG or WebP, up to 1 MB. Trimmed and scaled the same way |
| Login background | Shown behind the sign-in and sign-up pages. PNG, JPG or WebP, up to 4 MB. Large pictures are saved as a screen-sized WebP (up to 1920 px wide) so the page loads fast. With none uploaded, the built-in picture `public/images/auth-bg.jpg` is used (a `.jpeg`, `.png` or `.webp` file with the same name also works) |
| Favicon | PNG, ICO, JPG or WebP, up to 512 KB |

## Appearance

The look of the admin panel.

| Field | What it does |
|---|---|
| Accent colour | Fixes the panel colour for everyone. When none is set, each admin picks a palette from the header |
| Text on the accent colour | Auto, White or Dark. Auto picks the most readable |
| Default theme | Light, Dark or System, until an admin chooses |
| Font | The font used across the panel |

## New business defaults

Starting values for a business created at sign-up.

| Field | What it does |
|---|---|
| Default currency | Currency of new businesses |
| Default timezone | Used when the visitor's browser does not report one |

## Sign-up

| Field | What it does |
|---|---|
| Allow new sign-ups | When off, nobody can create a new business. Existing businesses are not affected |
| Require email verification at signup | New businesses must verify their email before they can invite team members or take online payments |
| Blocked email domains | One per line, for example `mailinator.com`. Subdomains are blocked too |
| Invitations per business per hour / per day | Limits how fast a business can send team invitations (1 to 1000 per hour, 1 to 5000 per day) |
| Invitations per person per hour / per day | The same limits for each person who invites |

## Billing

| Field | What it does |
|---|---|
| Grace period (days) | How long a business keeps full access after a failed renewal. 0 to 60. Default 7 |
| Trial ending reminder (days before) | When the trial reminder email is sent. 1 to 14. Default 4 |
| Renewal reminders (days before) | Comma separated whole numbers from 1 to 60, for example `7, 3, 1`. Up to 5 values. Only the nearest threshold is sent |
| Invoice number prefix | Letters, numbers and dashes, up to 10 characters. Default `INV-`. Existing invoices keep their numbers |

Reminder emails are sent by the daily job `subscriptions:remind` at 09:00. They go to the business owner.

## System email

The mail server used for verification, password reset, invitations and billing emails.

| Field | What it does |
|---|---|
| Mail server, Port, Username, Password | SMTP details. The default port is 587. Leave the server empty to use the `.env` mail configuration. Leave the password blank to keep the saved one |
| Encryption | TLS (default), SSL or None |
| From address, From name | The sender shown on emails |

Use **Send test email** to send one message to your own address with the saved settings. A server address that is private or local is refused for the test.

## Security

| Field | What it does |
|---|---|
| Email admins about security events | Sign-in from a new address, 2FA lockouts, admins added or removed, 2FA resets |
| Require two-factor authentication for admins | See [Login and two-factor](../login-and-two-factor.md) |
| Admin idle timeout (minutes) | 5 to 240. Default 30 |
| Shop session lifetime (minutes) | How long a business user stays signed in. 15 to 1440 |
| Minimum password length (shop) | 8 to 64 |
| Failed sign-ins before lockout (shop) | 3 to 20 |

The shop fields apply to businesses. The admin sign-in throttle and admin password rule are fixed in code.

## System

| Field | What it does |
|---|---|
| Show a maintenance notice on every shop page | Turn on to show a notice to businesses |
| Notice text | Up to 300 characters. Empty shows "The system is under maintenance. Some features may be unavailable." |

The **System health** card on this page shows:

| Row | Meaning |
|---|---|
| Scheduler | **Running**, **Not running (check the cron job)**, or **No heartbeat yet**. A heartbeat is written every minute; it is stale after 5 minutes without one |
| Queued jobs, Failed jobs | Counts from the queue tables |
| PHP version, Framework version | What the server is running |

If the scheduler is not running, subscriptions do not advance, reminders and backups do not run, and the weekly summary is not sent. See [Cron jobs](../../installation/cron-jobs.md) and [Queue worker](../../installation/queue-worker.md).

## Related

- [Payment gateways](../money/payment-gateways.md)
- [Email templates](mail-templates.md)
- [Backups](backups.md)
- [Login and two-factor](../login-and-two-factor.md)
