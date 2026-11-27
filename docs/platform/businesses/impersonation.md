---
title: Impersonation
description: Sign in as a business owner for support, with a time limit and an audit trail.
---

import Screenshot from '@site/src/components/Screenshot';

# Impersonation

"Open as owner" signs you in to a business as its owner so you can see what they see. It is meant for support. It is time-limited, restricted and always recorded.

**Where to find it:** **Businesses**, **Manage**, then the **Open as owner** card. Needs `businesses.impersonate`.

<Screenshot name="platform-impersonation-card" alt="Open as owner card on the business page" />

## Open a business as its owner

1. Open the business with **Manage**.
2. The **Open as owner** card shows the owner you will be signed in as, with their name and email.
3. Enter a **Reason**, for example a support ticket number. It is required and is saved in the audit log.
4. Click **Open as owner** and confirm. The note under the box reminds you how long the session lasts and what is blocked.

You are sent to the shop and signed in as the oldest active member who holds the Owner role. While you are in, a banner reads "Viewing as (name) ((business))" with an **Exit** button.

When the business is suspended or has no active owner, the card shows "This business has no active owner to open as." and the button is disabled. The card is shown only to admins with `businesses.impersonate`.

## Limits

- The session lasts at most 60 minutes (`impersonation_minutes` in `config/platform.php`). Then you are signed out of the owner view.
- Password and email changes are blocked.
- Sign-out is blocked. Use **Exit** instead, so the end is recorded.
- Inviting team members, resending or cancelling invitations, and switching business are blocked.
- Exporting business data is blocked.
- Everything else works as the owner would. Treat it as editing the real business.

The hand-off uses a one-time link valid for 60 seconds, so it works when the panel and the shop are on different hosts.

## Audit

Two entries are written to the [Audit log](../admins/audit-log.md): "Opened a business as its owner" (with your reason and the owner's email) and "Stopped viewing as the owner" (how long and why it ended, for example expired).

:::warning
Everything you do is done as the real owner. Use impersonation only when needed, and write a reason.
:::

## Related

- [Businesses](businesses.md)
- [Audit log](../admins/audit-log.md)
- [Roles and permissions](../admins/roles-and-permissions.md)
