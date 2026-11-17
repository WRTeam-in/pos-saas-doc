---
title: Introduction
description: What the application includes and how to set it up.
---

# Introduction

The application is a multi-tenant (SaaS) point-of-sale and back-office system. Shops sign up, pick a plan and run their business from one admin panel; you, the platform owner, manage everything from a separate Super admin panel.

:::tip Prefer to watch?
The [video tutorials](/tutorials) show every part of the product step by step, with on-screen captions.
:::

## What is included

| Part | What it is |
|------|------------|
| Shop admin panel | The back office each business uses: products, stock, purchasing, customers, expenses, reports and settings. |
| POS terminal | The checkout screen cashiers use to ring up sales, take payments and print receipts. |
| Super admin panel | Your own panel at `/admin` (or on its own domain). Manage businesses, plans, payment gateways, invoices, support, languages and backups. |
| Public pages | A landing page and a pricing page, plus sign-up for new businesses. |

## Recommended setup order

1. Check the [server requirements](installation/server-requirements.md) and [deploy the files](installation/deployment.md).
2. Run the [web installer](installation/web-installer.md) and create your Super admin account.
3. Add the [cron job](installation/cron-jobs.md) so scheduled tasks run.
4. [Sign in](installation/first-login.md) to the Super admin panel and set up the platform: [general settings](platform/settings/general-settings.md), system email, [plans](platform/money/plans.md) and [payment gateways](platform/money/payment-gateways.md).
5. Create a shop (or sign up as a business) and follow the [setup wizard](shop/getting-started/setup-wizard.md).

## Requirements at a glance

- PHP 8.3 or newer with the extensions listed in [Server requirements](installation/server-requirements.md).
- MySQL 8 or MariaDB 10.6+. The application targets MySQL.
- Node.js 20+ and npm, only if you build the front-end assets yourself.
- `mysqldump` available on the server, only for the backup feature.
- A cron job that runs the Laravel scheduler every minute.

:::note
The application does not need a queue worker to run, because it sends emails and SMS during the request. See [Queue worker](installation/queue-worker.md).
:::

## Related

- [Installation overview](installation/overview.md)
- [Third-party costs](third-party-costs.md)
- [Shop admin panel](shop/overview.md)
- [Super admin panel](platform/overview.md)
