---
title: Announcements
description: Show a notice at the top of every business panel, or only for one plan.
---

import Screenshot from '@site/src/components/Screenshot';

# Announcements

An announcement is a notice shown to businesses at the top of their app. Use it for maintenance, new features or billing news.

**Where to find it:** sidebar, **Announcements**. Needs `announcements.manage`.

<Screenshot name="platform-announcements-list" alt="Announcements list with live status" />

## Create an announcement

1. Click **New announcement**.
2. Fill in the fields below.
3. Click **Save**.

| Field | What it does |
|---|---|
| Title | Up to 120 characters. Required |
| Message | Optional text, up to 1000 characters |
| Style | **Info**, **Warning** or **Urgent** |
| Audience | **Every business**, or **Only businesses on** one plan |
| From, To | Optional dates. Empty means no start or no end. The end date includes that whole day |
| Show to businesses | The on/off switch |

The list shows each announcement's title, audience, window and a **Live** or **Not live** badge. An announcement is live when it is switched on and today is inside its window.

## Edit and delete

Click **Edit** to change an announcement, or **Delete** to remove it. To hide one without losing it, switch **Show to businesses** off.

Saving and deleting are written to the [Audit log](../admins/audit-log.md).

:::tip
A plan audience reaches only businesses currently on that plan. To reach everyone, choose **Every business**.
:::

## Related

- [Plans](../money/plans.md)
- [Support inbox](support-inbox.md)
- [Audit log](../admins/audit-log.md)
