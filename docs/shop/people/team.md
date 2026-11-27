---
title: Team
description: Invite staff by email, assign roles and branches, and activate or deactivate team members.
---

import Screenshot from '@site/src/components/Screenshot';

# Team

The Team page lists everyone who can sign in to your business. You invite people by email, give each one a role and the branches they can work in, and deactivate them when they leave.

**Where to find it:** People > Team. Requires `users.manage`.

<Screenshot name="shop-team-list" alt="Team list with member status tabs and pending invitations" />

## The team list

- Tabs show all, **Active** and **Inactive** members with counts.
- Search by name or email ("Search team").
- Each row shows the member's role, branches and status, with **Edit** and activate/deactivate actions. Only an Owner can manage another Owner.
- **Pending invitations** appear below the list with the invited email, role, branches, who invited them and when the invitation was sent and expires. Each can be **Resend** or **Revoke**d.

## Invite a team member

1. Select **Invite team member**. The form opens in a dialog, and so does **Edit**.
2. Enter their **Email**. They choose their own password.
3. Pick a **Role** and one or more **Branches** (the branches they can switch to and work from).
4. Select **Send invitation**.

They receive an email with a link that works for 7 days.

The button is disabled, with a reason on hover, when:

- the business owner's email is not verified yet (when the platform requires verification),
- your own email is not verified ("Verify your own email address before inviting others."), or
- your plan's user limit is reached. Members and pending invitations both count.

### Rules that apply

- You can only give a role whose permissions you hold yourself. Only an Owner can hand out the Owner role.
- You can only give branches you can reach yourself.
- You cannot invite someone who is already a member, or whose invitation is still pending (use **Resend** instead).
- Sending is rate limited per business and per person, and an invitation can be resent a limited number of times a day. Limits are set in `config/invitations.php` and can be raised through environment variables.

### If the email cannot be sent

The page shows **Share this invitation link** once. Copy it and send it to the person privately. It works for 7 days and is not shown again; **Resend** creates a new one.

## Accepting an invitation

The invitee opens the link and sees "Join *business*" with the role they were invited as. A new person enters a **Name**, a password and confirmation, and accepts the Terms of Service and Privacy Policy. Someone who already has an account with that email enters that account's password to join. If they are signed in as a different user they are asked to sign out first.

The link stops working when it is used, revoked, replaced by a resend, or expired. The business must still have a free seat on its plan when it is accepted.

## Edit a member

1. Select **Edit** on a row.
2. Change the **Name**, **Profile photo** (JPG, PNG or WebP, up to 2 MB), **Role** or **Branches**. At least one branch is required. The email is their login and cannot be changed here.
3. Save.

Things to know:

- If someone works for more than one business, only they can change their name and photo, on their Profile.
- You cannot change your own role or widen your own branches.
- Changing a member's role to one without `users.manage` revokes the invitations they sent.

## Activate and deactivate

Deactivating blocks sign-in to your business and revokes invitations the person sent. Reactivating needs a free user seat on your plan.

You cannot deactivate yourself, and the business must always keep at least one active Owner.

## Related

- [Roles & Permissions](roles-and-permissions.md)
- [Branches](../branches/branches.md)
- [Billing & Plans](../account/billing-and-plans.md)
- [Profile](../account/profile.md)
