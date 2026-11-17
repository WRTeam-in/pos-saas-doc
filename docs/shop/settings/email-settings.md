---
title: Email Settings
description: Send your business emails from your own mail account and edit the wording of every email.
---

import Screenshot from '@site/src/components/Screenshot';

# Email Settings

Email settings choose the mail account your business sends from. Email templates let you edit the wording of every email the system sends.

**Where to find it:** sidebar > **System** > **Settings** > **Messaging** > **Email settings** and **Email templates**. Requires `settings.manage`.

<Screenshot name="shop-email-settings" alt="Email settings form with SMTP server fields and test email box" />

## SMTP server

Leave **SMTP host** empty to use the system's default mail setup. Fill it in to send from your own mail account.

| Field | What it does |
| --- | --- |
| **SMTP host** | Your mail server, for example `smtp.yourdomain.com`. |
| **Port** | Required when a host is set. 1 to 65535. |
| **Username** | Mail account login. |
| **Password** | Stored encrypted. When one is saved, leave the field blank to keep it. |
| **Encryption** | TLS, SSL or None. |
| **From email** | Required when a host is set. The address your emails come from. |
| **From name** | Name shown to the recipient. |

Click **Save**.

## Send a test email

1. Enter an address in the test box.
2. Click **Send test email**.

The test uses the details currently on the form, even before you save, so you can check they work. It needs your own SMTP host: with no host the test is refused. The host must be a public mail server, not this server or a private network address. Test sending is limited to 5 per minute.

## Email templates

Open **Email templates** to see every email the system can send, grouped as **Emails to suppliers**, **Emails to customers** and **Emails to the owner**.

| Email | Sent when |
| --- | --- |
| **Purchase order placed** | A purchase order is marked as ordered (to the supplier). |
| **Purchase items received** | Stock is received against an order (to the supplier). |
| **Purchase return recorded** | Goods are returned to the supplier. |
| **Sale receipt** | After a sale at the POS (to the customer). |
| **Refund confirmation** | A refund is recorded (to the customer). |
| **Payment received** | A payment is collected on an open sale (to the customer). |
| **Loyalty points expiring** | A few days before some of a customer's points expire. |
| **Daily summary** | Each evening, to the owner. See [Owner Summary](owner-summary.md). |

The list shows each email's **Status** (**On** or **Off**), the languages it is **Customized in**, or **Default wording**. Use **Deactivate** / **Activate** to switch an email off or on.

### Edit a template

1. Click **Edit** on an email.
2. Pick the language to edit. Each language has its own wording.
3. Change the **Subject** and **Message**. Add optional **CC** and **BCC** addresses.
4. Insert **Placeholders** from the list where you want real values, for example the customer name or sale number. They are replaced when the email is sent.
5. Click **Save**.

**Reset to default wording** removes your customisation for that language.

## Related

- [SMS Settings](sms-settings.md)
- [Owner Summary](owner-summary.md)
- [General Settings](general-settings.md)
