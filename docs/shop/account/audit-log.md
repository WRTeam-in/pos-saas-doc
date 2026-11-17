---
title: Audit Log
description: A permanent record of who changed what, and when.
---

import Screenshot from '@site/src/components/Screenshot';

# Audit Log

The audit log records who changed what in your business, and when. Entries cannot be edited or deleted.

**Where to find it:** sidebar > **System** > **Audit log**. Requires `audit.view`.

<Screenshot name="shop-audit-log" alt="Audit log table with user and event filters" />

## Filters

| Field | What it does |
| --- | --- |
| **Search** | Searches the entries. |
| **User** | Show one team member's actions (**All users** by default). |
| **Event** | Show one kind of event (**All events**). |
| **From (UTC)** / **To (UTC)** | Date range, as calendar days in UTC. **To** cannot be before **From**. |

## Columns

**No.**, **ID**, **When (UTC)**, **User**, **Event**, **Record** (what was changed, with its name or number), and **Changes** (each changed field, old value struck through beside the new one). Entries made by the system itself show **System** as the user.

## Events you can filter by

`created`, `updated`, `deleted`, `restored`, `permanently_deleted`, `batch_override`, `batch_expiry_corrected`, `password_changed`, `invitation_sent`, `invitation_resent`, `invitation_revoked`, `invitation_accepted` and `data_exported`. The filter list also contains `backup_created`, `backup_failed`, `backup_downloaded` and `backup_setting_changed`.

:::note
Times are shown in UTC, not your business time zone, so they match what is stored.
:::

## Related

- [Data Export](../settings/data-export.md)
- [Team](../people/team.md)
- [Roles & Permissions](../people/roles-and-permissions.md)
