---
title: Owner Summary
description: A daily report of sales, stock alerts and top sellers, emailed to the owner each evening.
---

import Screenshot from '@site/src/components/Screenshot';

# Owner Summary

The daily summary is a short report of the day, emailed to the owner each evening and optionally sent as a text message.

**Where to find it:** sidebar > **System** > **Settings** > **Alerts & backups** > **Daily summary**. Requires `settings.manage` and the plan feature **Daily owner summary**.

<Screenshot name="shop-owner-summary" alt="Daily summary settings with send time and recipients" />

## What the summary contains

- Number of sales and sales total for the day.
- Refunds total and net total.
- Payments split by method.
- Low-stock count and items.
- Count of expiring batches.
- Top sellers (the five best by quantity).

## Settings

| Field | What it does |
| --- | --- |
| **Send the daily summary** | Master switch. |
| **Send at (business time)** | Time of day, in your business time zone, from 00:00 to 23:50. A time before 06:00 reports the day that just ended, for shops that close after midnight. |
| **Send to** | Email address of the recipient. Only the Owner can change it. Others see it read-only. |
| **Also send a short text message** | Adds an SMS version. Only shows once an SMS gateway is active; otherwise a link to **SMS settings** appears. |
| **Phone number for the text** | Number that receives the text. Owner-only. |

Click **Save changes**.

## Send a test now

Click **Send a test now** to send today's report immediately. A message confirms "A test summary was sent." or tells you to check the email address and the email settings.

## How it is sent

The server checks every 10 minutes and sends each business its report once the local send time has passed. This relies on the scheduler cron job. See [Cron Jobs](../../installation/cron-jobs.md). The email uses your [Email Settings](email-settings.md) if you set an SMTP host, and the **Daily summary** email template can be edited or switched off.

## Related

- [Email Settings](email-settings.md)
- [SMS Settings](sms-settings.md)
- [Dashboard](../getting-started/dashboard.md)
