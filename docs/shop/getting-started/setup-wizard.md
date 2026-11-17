---
title: Setup Wizard
description: The first-run guide that walks you through currency, your first branch, products and team.
---

import Screenshot from '@site/src/components/Screenshot';

# Setup Wizard

The Setup Wizard is a four-step guide that appears for a brand-new business. It gets the essentials in place so you can start selling.

**Where to find it:** it opens automatically the first time the owner reaches the Dashboard. Later, reopen it from **System > Settings > Appearance > Setup guide > Run setup again**. Requires `settings.manage`.

<Screenshot name="shop-setup-wizard" alt="Setup wizard showing the Business details step" />

## How it works

- The wizard opens once per session while it is pending, then the rest of the panel stays reachable.
- Each step has **Save and continue** (the last one says **Finish**) and **Skip**. Every step after the first also has **Back**.
- **Close setup** dismisses the guide. You can run it again from Settings.
- You only see the steps you have permission for.

## Step 1: Business details

Needs `settings.manage`.

| Field | What it does |
|---|---|
| Currency | The currency for prices and reports. Choosing one fills in a matching symbol. |
| Symbol | The currency symbol shown next to amounts (up to 6 characters). |
| Default tax rate (%) | The shop-wide tax rate, 0 to 100. |
| Price type | **Exclusive (tax added on top)** or **Inclusive (tax included in the price)**. |
| Business time zone | Shown only if you have `loyalty.manage`. Decides the business day, for example when loyalty points expire. |

These use the same rules as the Settings page.

## Step 2: Your first branch

Needs `settings.manage`. Rename the default branch to your shop's real name and edit its **Branch code**. Use **Add branch** to open the new-branch form for more. See [Branches](../branches/branches.md).

## Step 3: Your first products

Needs `products.create`. A product needs a category and a unit; a brand is optional. A **General** category and common units are already added. The step lists them with a **Manage** button each.

You can:

- **Add a product** by hand.
- **Import from a spreadsheet**, after **Download the template**.

**Save and continue** appears once you have at least one product. If you have none, you must add one or press **Skip**.

## Step 4: Invite your team

Needs `users.manage`. Select **Invite a team member** to open the invitation form. If the owner's email is not verified yet, the step explains that and offers **Resend link** instead. See [Team](../people/team.md).

## When the wizard is finished

Finishing or skipping the last step shows "Your business is set up." and returns you to the [Dashboard](dashboard.md).

## Related

- [Sign Up and Onboarding](signup-and-onboarding.md)
- [Products](../catalogue/products.md)
- [Team](../people/team.md)
