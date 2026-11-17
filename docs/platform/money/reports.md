---
title: Reports
description: Business report, revenue and subscriptions, and retention across all businesses.
---

import Screenshot from '@site/src/components/Screenshot';

# Reports

Three reports cover how businesses use the platform and how much recurring revenue it makes.

**Where to find it:** sidebar, **Reports**, then the tabs **Business report**, **Revenue & subscriptions** and **Retention**. Needs `reports.view`.

<Screenshot name="platform-reports-businesses" alt="Business report table with filters" />

## Business report

Sales, customers and billing for every business, side by side.

Filters: **Date range** (7 days, 30 days, 90 days, 1 year) or a custom **from** and **to** (up to five years), **Plan**, **Status** (Active or Suspended), **Tag**, and a name search. Click **Apply**, or **Reset**.

Summary tiles show the number of businesses (and how many have sales), sales, sales value, customers and products.

| Column | Meaning |
|---|---|
| Name, Plan, Joined | The business, its plan and sign-up date |
| Sales, Sales value | Completed sales in the window |
| Customers, Products, Branches, Users | All-time counts |
| Last sale | Date of the latest completed sale |
| Paid to platform | Live payments the business made to you, per currency |

Click a column heading to sort. **Export CSV** downloads the filtered rows.

With `businesses.manage` you can tick businesses and apply **Suspend**, **Reactivate** or **Extend trial** (with a number of days). See [Businesses](../businesses/businesses.md#suspend-reactivate-extend-a-trial).

### One business

Click a business name or **Report** in the Businesses list. The page shows:

- Sales by month for the last 12 months, and **Top products in this period**.
- **Plan usage** against each limit (users, branches, products), and the **Health** score.
- **Team**: members with their roles.
- **Subscription payments**: the last 10 invoices.
- **Admin actions on this business**.
- **Notes** and **Tags**.

## Revenue & subscriptions

Recurring revenue, churn, conversion and renewals.

| Figure | How it is worked out |
|---|---|
| Monthly recurring revenue | Active paid plans; yearly plans counted as a twelfth |
| ARR | Monthly recurring revenue times 12 |
| Revenue per paying business | Monthly recurring revenue divided by paying businesses |
| Paying businesses | Active subscriptions on a paid plan |
| Churn (30 days) | Paid subscriptions that ended in the last 30 days, over the paying base at the start of that period |
| Trial to paid | Businesses that ever paid with a live payment, out of all that signed up |

Other sections: subscriptions by state (Trial, Active, Past due, Expired, Cancelling), **Recurring revenue by plan**, **Renewals in the next 14 days**, and **Revenue by gateway**. Money is shown per currency and never converted. Test-mode payments are excluded.

**Export CSV** downloads the last 12 months: month, platform revenue, new businesses, sales and sales value.

### Email summary now

**Email summary now** sends the weekly summary to every platform admin immediately. It covers the last 7 days against the 7 before: sign-ups, sales, revenue, active businesses, recurring revenue, top businesses and alerts. Tick **Email a weekly summary to platform admins** under Settings, Platform to also send it every Monday at 08:00. That needs the scheduler cron job and a working system email. See [General settings](../settings/general-settings.md).

## Retention

Of the businesses that joined in each month, how many were still selling later. Each cell is the share of that month's sign-ups with at least one completed sale in the month shown. **Month 0** is the sign-up month. A blank cell means that month has not happened yet.

## Related

- [Dashboard](../dashboard.md)
- [Businesses](../businesses/businesses.md)
- [Invoices](invoices.md)
