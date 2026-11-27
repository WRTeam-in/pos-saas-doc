---
title: Legal pages
description: Edit the Terms of Service and Privacy Policy shown on your public site.
---

import Screenshot from '@site/src/components/Screenshot';

# Legal pages

The Terms of Service and Privacy Policy are shown on the public site and linked from the sign-up form. You write them here, one text per language.

**Where to find it:** sidebar, **Settings**, **Legal pages**. Needs `settings.manage`.

<Screenshot name="platform-legal-pages" alt="Legal pages editor with a tab for each language" />

## Edit the texts

1. Open **Legal pages**. There is one card for **Terms of Service** and one for **Privacy Policy**. Each card shows its public link, `/terms` and `/privacy`.
2. Pick the language tab. Tabs are the active languages from [Languages](languages.md).
3. Type the text. Use plain text and leave a blank line between paragraphs. Up to 50000 characters.
4. Click **Save**.

Details:

- A blank box falls back to English, then to the built-in placeholder text.
- A blank box clears the saved text for that language.
- The text is stored as typed and escaped when shown, so HTML does not work.
- A language the form did not send keeps its text.

:::warning
The built-in placeholder text is generic. Replace it with text approved for your business before you open sign-ups.
:::

The audit log records that the legal pages changed and which languages, never the text itself.

## Related

- [Website](../website.md)
- [Languages](languages.md)
- [General settings](general-settings.md)
- [Audit log](../admins/audit-log.md)
