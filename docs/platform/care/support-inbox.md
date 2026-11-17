---
title: Support inbox
description: Answer support requests that businesses send from their panel.
---

import Screenshot from '@site/src/components/Screenshot';

# Support inbox

Businesses send questions and problems from their own panel. All requests from all businesses arrive in one inbox.

**Where to find it:** sidebar, **Support**. Needs `support.manage`.

<Screenshot name="platform-support-inbox" alt="Support inbox with status tabs" />

## Find a request

Tabs show how many requests are in each state:

| Tab | Meaning |
|---|---|
| Needs reply | The business wrote last |
| Answered | You replied last |
| Closed | Finished |
| All | Everything |

Search matches the subject, the business name, the text of any message, the opener's email, or the request number (for example `#12`). Columns: number, subject and opener, business, type, status, time of the last message.

Request types a business can choose: Question, Billing, Something is broken, Feature request.

## Reply

1. Click a subject to open the conversation.
2. Type in the reply box. Enter sends; Shift+Enter starts a new line.
3. Send. The status becomes **Answered** and the person who opened the request gets an email with your message and a link to it.

Replies are 2 to 5000 characters.

### Internal notes

Tick **Internal note** before sending to leave a note only admins can see. The business is not emailed and the status does not change.

## Close and reopen

- **Close request** marks it Closed. The opener is emailed. A closed request cannot take new messages.
- **Reopen** brings it back. The status returns to Answered if your reply was the last visible message, otherwise Needs reply. The opener is emailed.

Status changes are written to the [Audit log](../admins/audit-log.md).

## Email notices

- When a business opens or answers a request, the **Support email** (Settings, Platform) is emailed. If none is set, every platform admin is emailed.
- Emails need a working system email. See [General settings](../settings/general-settings.md#system-email).
- A mail problem never stops a reply from being saved.

Open requests also appear on the [Dashboard](../dashboard.md) under Needs attention.

## Related

- [Business support](../../shop/account/support.md)
- [Dashboard](../dashboard.md)
- [Businesses](../businesses/businesses.md)
