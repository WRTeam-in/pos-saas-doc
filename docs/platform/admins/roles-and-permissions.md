---
title: Roles and permissions
description: Control what each platform admin can see and do.
---

import Screenshot from '@site/src/components/Screenshot';

# Roles and permissions

A role is a name and a set of permissions. Each admin has exactly one role. Platform roles are separate from the roles inside a business.

**Where to find it:** sidebar, **Admins**, then **Roles**. Needs `admins.manage`.

<Screenshot name="platform-roles-list" alt="Platform roles list" />

## Super admin

**Super admin** is built in. It holds every permission, including future ones, and it cannot be edited or deleted. It is the only role that can open pages not listed in the tables below: a new page is closed to everyone but Super admins until it is added to `config/platform_permissions.php`.

Only a Super admin can give the Super admin role, and only a Super admin can change, reset or remove another Super admin. At least one Super admin must always exist.

## Custom roles

1. Open **Roles** and click **New role**.
2. Enter a **Name** (unique, up to 60 characters) and an optional **Description**.
3. Tick the **Permissions**.
4. Click **Save**.

Rules:

- You can only give permissions you have yourself. Super admins can give any.
- You can only assign a role that has no more access than you.
- A role that still has admins cannot be deleted. Move them to another role first.
- Every admin can open the dashboard, their own **My account** page, and sign out, whatever their role.

Saving and deleting are written to the [Audit log](audit-log.md).

## Permissions

| Group | Permission | Label on the role form |
|---|---|---|
| Businesses | `businesses.view` | See businesses |
| Businesses | `businesses.manage` | Change businesses (suspend, plans, notes, tags) |
| Businesses | `businesses.impersonate` | Open a business as its owner |
| Money | `reports.view` | See reports and the weekly summary |
| Money | `billing.view` | See invoices and plans |
| Money | `billing.manage` | Record payments, void invoices, edit plans |
| Customers | `support.manage` | Answer support requests |
| Customers | `announcements.manage` | Send announcements |
| Customers | `features.manage` | Roll features out |
| System | `audit.view` | See the audit log |
| System | `settings.manage` | Change settings, payments, languages |
| System | `backups.manage` | Run and download backups |
| System | `admins.manage` | Manage admins and roles |

## What each page needs

Some areas need one permission to read and another to change. Reading means opening a list or a report. Opening an add or edit form counts as changing.

| Area | Read | Change |
|---|---|---|
| Dashboard, My account, two-factor setup, language switch, sign out | Any signed-in admin | Any signed-in admin |
| Search | `businesses.view` | |
| Businesses list and data | `businesses.view` | `businesses.manage` (edit, status, bulk, notes, tags) |
| Open as owner | | `businesses.impersonate` |
| Record manual payment on a business | | `billing.manage` |
| Reports (business, revenue, retention, summary email) | `reports.view` | `reports.view` |
| Invoices list | `billing.view` | |
| Void an invoice | | `billing.manage` |
| Plans | `billing.view` | `billing.manage` |
| Support inbox | `support.manage` | `support.manage` |
| Announcements | `announcements.manage` | `announcements.manage` |
| Features (rollout) | `features.manage` | `features.manage` |
| Audit log | `audit.view` | |
| Backups (downloading one is Super admin only) | `backups.manage` | `backups.manage` |
| File storage, System updates | Super admin only | Super admin only |
| Website, Settings, Payments, Legal pages, Languages, Email templates | `settings.manage` | `settings.manage` |
| Admins and Roles | `admins.manage` | `admins.manage` |

An admin without the needed permission sees "Your role does not allow this." (HTTP 403).

:::tip
A support agent role could have `businesses.view`, `support.manage` and `reports.view`. A finance role could have `billing.view`, `billing.manage` and `reports.view`.
:::

## Related

- [Admins](admins.md)
- [Audit log](audit-log.md)
- [Login and two-factor](../login-and-two-factor.md)
