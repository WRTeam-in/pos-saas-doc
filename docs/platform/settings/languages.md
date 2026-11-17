---
title: Languages
description: Add languages, translate every text and choose the default.
---

import Screenshot from '@site/src/components/Screenshot';

# Languages

The interface of both the platform panel and the shop panels is translated through language files. You manage them here once, and every business shares them.

**Where to find it:** sidebar, **Settings**, **Languages**. Needs `settings.manage`.

<Screenshot name="platform-languages-list" alt="Languages list with translation progress" />

## The list

Each row shows the language, **Default** badge, how many texts are translated (for example "120 of 800 translated"), whether it is right-to-left, and its status. Actions: **Edit translations**, **Make default**, **Disable** or **Enable**, **Delete**.

Users switch language from the language menu in the top bar. Only enabled languages are offered.

## Add a language

1. Click **Add language** (or **New language**).
2. Fill in the fields, then click **Create language**.

| Field | What it does |
|---|---|
| Name | The name in English, for example Arabic |
| Native name | How speakers write it |
| Code | Short code such as `ar`, `hi` or `pt-BR`. Cannot be changed later |
| Right-to-left | Turn on for Arabic, Hebrew or Urdu. The whole layout flips |

A new language starts as a copy of the English file, so nothing is blank. You land on its translation editor.

## Translate

1. Click **Edit translations**.
2. Search by key or text, and use the filter to show only texts that need translation.
3. Edit the **Translation** column. Leave a box as it is to keep the English wording.
4. Click **Save translations**. A blank box falls back to English.

Only keys that exist in English can be edited. Unsaved changes trigger a warning if you leave the page.

## Default, enable, disable, delete

- **Make default**: only an enabled language can become the default.
- **Disable**: the default language cannot be disabled. Choose another default first.
- **Delete**: English and the default language cannot be deleted. Deleting removes the language file.

Every change is written to the [Audit log](../admins/audit-log.md).

:::note
Texts you add for a new feature in code appear in English until you translate them. Languages also drive the tabs in [Legal pages](legal-pages.md) and [Email templates](mail-templates.md).
:::

## Related

- [Legal pages](legal-pages.md)
- [Email templates](mail-templates.md)
- [Business languages](../../shop/settings/languages.md)
