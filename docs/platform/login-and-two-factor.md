---
title: Login and two-factor
description: Sign in to the platform panel, set up an authenticator app and manage your password.
---

import Screenshot from '@site/src/components/Screenshot';

# Login and two-factor

Platform admins sign in with an email and password, then a six-digit code from an authenticator app.

**Where to find it:** `/admin/login` (or your `ADMIN_DOMAIN`). Account page: **My account**. No permission needed.

<Screenshot name="platform-login" alt="Platform admin sign in page" />

## Create the first admin

The web installer creates the first admin. To add one from the server:

```bash
php artisan platform:make-admin you@example.com --name="Your Name"
```

The command asks for a password (at least 8 characters) and confirms it. The new admin must change that password and set up two-factor at first sign-in. Once you are in, add more people under [Admins](admins/admins.md).

## Sign in

1. Open the login page and enter your email and password.
2. If two-factor is set up, enter the six-digit code from your app. You can switch to **Use a recovery code instead**.
3. You land on the dashboard, or on the page you were trying to open.

Limits that protect the login:

- After 5 wrong passwords for the same email and address, sign-in is blocked for a short time.
- After 5 wrong authenticator or recovery codes for one admin, that admin is locked for 15 minutes. One address is also limited to 5 wrong codes a minute.
- You have 5 minutes between the password step and the code step.
- You are signed out after 30 minutes without activity. Change this under Settings, Security (**Admin idle timeout (minutes)**, 5 to 240).
- Changing your password signs out your other sessions.

Signing out of the panel does not sign you out of a shop in the same browser.

## Set up two-factor

Two-factor is required by default (Settings, Security, **Require two-factor authentication for admins**). Until you set it up, every page sends you to the setup screen.

1. Install Google Authenticator, Microsoft Authenticator or Authy on your phone.
2. In the app, scan the QR code. If you cannot scan, enter the key by hand: account name, key, type "time based".
3. Enter the six-digit code and click **Turn on two-factor authentication**.
4. Save the 8 recovery codes shown on the next screen. They are shown once, and each works once.

:::tip
If a code is rejected, check that your phone's date and time are set to automatic.
:::

When the setting is turned off, admins who have not set up an authenticator sign in with email and password only. Admins who already have one are still asked for a code. Turning it off lowers the security of the panel.

## My account

| Action | What it does |
|---|---|
| **Change password** | Needs your current password. At least 8 characters. |
| **Get new recovery codes** | Asks for a current authenticator code, then replaces all 8 codes. The old ones stop working. |

If your password is temporary (a new admin, or one made with `platform:make-admin`), you must change it before anything else.

## Lost phone or codes

Ask a Super admin to open [Admins](admins/admins.md) and use **Reset 2FA** on your row. You set up an authenticator again at your next sign-in. You cannot reset your own two-factor there.

## Related

- [Admins](admins/admins.md)
- [Roles and permissions](admins/roles-and-permissions.md)
- [General settings](settings/general-settings.md)
- [First login](../installation/first-login.md)
