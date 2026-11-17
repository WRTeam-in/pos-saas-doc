---
title: SMS Settings
description: Connect an SMS gateway and edit the text messages your business sends.
---

import Screenshot from '@site/src/components/Screenshot';

# SMS Settings

SMS settings connect your business to an SMS gateway. SMS templates control the wording of each text message.

**Where to find it:** sidebar > **System** > **Settings** > **Messaging** > **SMS settings** and **SMS templates**. Requires `settings.manage` and the plan feature **SMS**. If your plan does not include it, the pages show "This feature is not included in your plan."

<Screenshot name="shop-sms-settings" alt="SMS settings with gateway selector and test SMS box" />

## Choose a gateway

Supported gateways: **MSG91**, **2Factor** and **Fast2SMS**. Only one is active at a time.

1. Under **Active gateway**, pick the gateway, or **SMS off** to send no texts.
2. Enter that gateway's key (MSG91 calls it **Auth key**, the others **API key**) and **Sender ID**. Keys are stored encrypted; leave blank to keep a saved one.
3. Set **Default country code**, added to phone numbers saved without one (for example `91` for India).
4. Click **Save**. Save the key first, then select the gateway.

Each gateway card has an **Open dashboard** link to the provider's site.

## Send a test SMS

1. Enter a phone number.
2. Add a **Template ID / name (if required)**. MSG91 and 2Factor need one.
3. Click **Send test SMS**.

The test uses the details on the form, even before you save.

## SMS templates

Open **SMS templates** for the list of messages. They mirror the [email types](email-settings.md#email-templates), except the backup-failure message, and use shorter wording without multi-line item lists.

| Field | What it does |
| --- | --- |
| **Message** | The text. Keep it short. For DLT gateways it must match the wording you had approved. |
| **Gateway template IDs** | The approved (DLT) template each gateway needs for this message in this language. Only the active gateway's ID is used. |
| **Placeholders** | Replaced with real values when sent, and passed to the gateway as variables in the order they appear. |

Use **Activate** / **Deactivate** on the list to switch a message off, and **Reset to default wording** to undo your edits. When no gateway is active, a warning says no SMS will be sent.

## Related

- [Email Settings](email-settings.md)
- [Owner Summary](owner-summary.md)
- [Billing & Plans](../account/billing-and-plans.md)
