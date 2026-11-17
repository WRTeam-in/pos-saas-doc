---
title: Notifications
description: The header bell, stock and dues alerts, and platform announcements.
---

import Screenshot from '@site/src/components/Screenshot';

# Notifications

Notifications show what needs your attention right now. Nothing is stored: each alert is a live count and disappears when the count reaches zero.

**Where to find it:** the bell in the top bar, which opens **Notifications**. No dedicated permission, but each alert depends on what you may see.

<Screenshot name="shop-notifications" alt="Notifications page with alert cards" />

## Alerts

| Alert | Shown when | Needs |
| --- | --- | --- |
| **Products low or out of stock** | Products are at or below their low-stock threshold in your branches. | `inventory.view` |
| **Batches expired or expiring soon** | You track batches and some are expired or inside the expiry warning window. | `inventory.view` and `reports.inventory` |
| **Customers with dues older than 30 days** | Customers have an open sale with a balance older than 30 days. | `customers.view` |

Each alert is a card with a count. Click it to open the matching report or customer list. Without access to that screen, the alert still shows but does not link. When nothing is wrong you see "You are all caught up." Counts are limited to the branches you work in.

## Announcements

The platform team can post an announcement banner at the top of the panel. Dismiss one to hide it for the rest of your browser session.

## Related

- [Inventory & Expiry reports](../reports/inventory-and-expiry.md)
- [Customers](../people/customers.md)
- [General Settings](../settings/general-settings.md)
