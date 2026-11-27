---
title: Dashboard
description: "Read the platform dashboard: KPIs, revenue, alerts and business health."
---

import Screenshot from '@site/src/components/Screenshot';

# Dashboard

The dashboard shows how the platform is doing across every business: growth, recurring revenue, problem payments and businesses that need attention.

**Where to find it:** sidebar, **Dashboard**. Every signed-in admin can open it.

<Screenshot name="platform-dashboard" alt="Platform dashboard with KPI cards and charts" />

## Date range

The **Date range** control sets the window for the KPI tiles, the sign-up chart and **Top businesses by sales**: **7 days**, **30 days** (default), **90 days** or **1 year**. Each KPI is compared with the period just before it (**vs previous period**).

| KPI | What it counts |
|---|---|
| New businesses | Businesses created in the range |
| Active businesses | Businesses with at least one completed sale in the range |
| Sales | Completed sales across all businesses |
| Sales value | Total of those sales |

## Summary cards

| Card | What it shows |
|---|---|
| Businesses | Total, with how many are active and suspended |
| Subscriptions | Trialing, Active, Past due and Expired counts |
| Monthly recurring revenue | Active paid plans; a yearly plan counts as a twelfth. Each currency is shown on its own line |
| Revenue this month | Live payments and manual payments only. Test-mode payments are excluded |
| Failed and pending payments | Counts, plus a list of recent ones and **See all invoices** |
| New businesses (30 days) | Sign-ups, with how many trials end within 7 days |

:::note
Money is never converted between currencies. If plans use different currencies you see one line per currency.
:::

Subscription counts are worked out from dates, not from the stored status. They match what each business sees even if the nightly job has not run yet. See [Businesses](businesses/businesses.md) for the states.

Each card has an icon in a fixed colour that does not change with the accent colour. Red (failed payments) and orange (open support requests) appear only when there is something to deal with; at zero the icon is grey. Cards with history show a small trend line.

The cards also include **Support requests waiting**, the number of open requests.

## Needs attention

**Needs attention** lists what to act on, most urgent first:

| Alert | When it appears |
|---|---|
| Suspended | The business is suspended |
| Read-only | Its subscription has ended |
| In grace period | A renewal failed and the grace period is running |
| Trial ending | The trial ends within 3 days |
| Cancels at period end | The owner chose not to renew |
| Near plan limit | Usage is at 90% or more of a plan limit |
| Payment failed | A failed invoice in the last 14 days |
| Payment mismatch | A payment did not match its invoice (see [Invoices](money/invoices.md)) |
| Support requests waiting | Open tickets in the [Support inbox](care/support-inbox.md) |

## Business health

Each business gets a score from 0 to 100, based on recent sales (the most weight), subscription state, and how set up it is. A suspended business scores 0.

| Level | Score |
|---|---|
| Healthy | 70 or more |
| At risk | 40 to 69 |
| Critical | below 40 |

The dashboard shows how many businesses fall in each level. The score is also shown for each row in [Businesses](businesses/businesses.md).

## Other panels

- **Platform revenue** and **Growth**: revenue and new businesses for the last 12 months.
- **Subscriptions by plan** and **Sales across all businesses**.
- **Top businesses by sales** for the chosen range.
- **Quiet businesses**: active businesses at least 7 days old with no sale in the last 14 days.
- **Trials ending within 7 days**.
- **Recent sign-ups**.
- **Recent admin activity**: the latest entries of the [Audit log](admins/audit-log.md).

## System health

The scheduler heartbeat and queue counts are not on the dashboard. They are on **Settings, System**. See [General settings](settings/general-settings.md#system).

## Related

- [Reports](money/reports.md)
- [Businesses](businesses/businesses.md)
- [Support inbox](care/support-inbox.md)
