---
title: Email templates
description: Change the wording of the platform's own emails per language.
---

import Screenshot from '@site/src/components/Screenshot';

# Email templates

The platform sends a few emails of its own. You can change their subject and message for each language.

**Where to find it:** sidebar, **Settings**, **Email templates**. Needs `settings.manage`.

<Screenshot name="platform-mail-templates" alt="Email templates page with placeholders" />

## Templates

| Template | Sent when | Placeholders |
|---|---|---|
| Email verification | A new owner must verify their email | `{name}`, `{app}` |
| Password reset | Someone asks to reset a password | `{name}`, `{app}` |
| Team invitation | A business invites a team member | `{inviter}`, `{business}`, `{app}`, `{role}` |

## Edit a template

1. Open **Email templates**. Each template has a card with a tab per active language.
2. Pick a language.
3. Edit the **Subject** (up to 200 characters) and **Message** (up to 5000).
4. Click **Save**. Each language is saved on its own.

Rules:

- Write plain text. Leave a blank line between paragraphs. HTML is removed.
- Put a placeholder in curly braces where the value should appear.
- Leave a box empty to use the built-in text.

:::note
Emails are sent through the mail server set under System email. See [General settings](general-settings.md#system-email). Other platform emails are not editable here.
:::

## Related

- [General settings](general-settings.md)
- [Languages](languages.md)
