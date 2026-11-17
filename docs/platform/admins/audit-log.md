---
title: Audit log
description: A read-only record of everything admins do in the platform panel.
---

import Screenshot from '@site/src/components/Screenshot';

# Audit log

The audit log records who did what, to which business, and when. Entries cannot be edited or deleted: there are no such screens or routes.

**Where to find it:** sidebar, **Audit log**. Needs `audit.view`.

<Screenshot name="platform-audit-log" alt="Audit log table with filters" />

## Filter

| Filter | What it does |
|---|---|
| Admin | One admin, by email. Removed admins stay in the list |
| Event | One kind of event |
| From, To | A date range |

Columns: When, Admin, Event, Business, Subject, Details, IP address. Hover over Details to see the full change (old and new values).

## What is recorded

| Area | Events |
|---|---|
| Sign-in | Admin signed in, two-factor code failed, two-factor locked after failed codes, admin password changed |
| Admins | Admin added, admin removed, admin two-factor reset, admin role changed, role saved, role deleted |
| Businesses | Business updated, suspended, reactivated, trial extended, note added, feature rolled out |
| Billing | Plan created, plan updated, manual payment recorded, invoice voided, payment gateway settings updated |
| Support and notices | Support request status changed, announcement saved or deleted, weekly summary emailed |
| Impersonation | Opened a business as its owner, stopped viewing as the owner |
| Settings | Settings updated, email template updated, legal pages updated, language added, translations updated, default language changed, language turned on or off, language deleted |
| Backups | Backup created, backup failed, backup downloaded, automatic backup setting changed |

Secrets are never stored. Gateway keys, SMTP passwords and temporary passwords are masked or left out, and legal text is recorded only as "which texts changed".

:::note
Shop-side changes made by business users are in each business's own audit log. See [Business audit log](../../shop/account/audit-log.md).
:::

## Related

- [Admins](admins.md)
- [Roles and permissions](roles-and-permissions.md)
- [Impersonation](../businesses/impersonation.md)
