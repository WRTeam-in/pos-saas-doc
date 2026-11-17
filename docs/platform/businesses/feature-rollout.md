---
title: Feature rollout
description: Force a plan feature on or off for chosen businesses.
---

import Screenshot from '@site/src/components/Screenshot';

# Feature rollout

Plans decide which yes/no features a business has. Feature rollout lets you override that for selected businesses: a beta, a gift, or a fix.

**Where to find it:** sidebar, **Features**. Needs `features.manage`.

<Screenshot name="platform-features-list" alt="Features list with forced on and forced off counts" />

## The features

The list shows each yes/no feature, the plans that include it (**Included in plans**), and how many businesses are **Forced on** and **Forced off**. Limits such as branches or products are not listed here; set those per business under [Businesses](businesses.md).

| Feature | What it controls in a business |
|---|---|
| Loyalty points | Loyalty settings and customer points |
| Batch and expiry tracking | Batch and expiry screens and the expiry report |
| Stock take | Stock takes |
| Quotations | Quotations |
| Daily owner summary | The owner summary settings |
| SMS | SMS settings and templates |

## Roll a feature out

1. Open **Features** and click a feature.
2. The table shows, for each business, **By plan**, **Override** and **Effective**.
3. Tick the businesses (up to 500).
4. Choose **Force on**, **Force off** or **Follow the plan**.

| Choice | Result |
|---|---|
| Force on | The business has the feature, whatever its plan says |
| Force off | The business does not have it |
| Follow the plan | Removes the override, so the plan decides again |

The change applies at once. Each rollout is one entry in the [Audit log](../admins/audit-log.md).

:::note
The same override can be set per business on the Manage page, under "Special limits for this business". Rollout is the bulk way to do it.
:::

## Related

- [Plans](../money/plans.md)
- [Businesses](businesses.md)
- [Audit log](../admins/audit-log.md)
