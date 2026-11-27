---
title: Website
description: Edit the public home page - sections, design, text, pictures, screenshots, questions, contact details and search settings.
---

import Screenshot from '@site/src/components/Screenshot';

# Website

The Website page controls everything visitors see on your public home page. You can change text, pictures, colours and the order of the sections without touching any code.

**Where to find it:** sidebar, **Website** (below **Plans**). Needs `settings.manage`; Super admins always have it.

<Screenshot name="platform-website-sections" alt="Website editor with the list of sections" />

## How it works

1. Open **Website** and choose a tab at the top.
2. With more than one active language, pick the language you are writing in under **Editing language**. Text is saved separately for each language.
3. Make your changes and click **Save**. They appear on the home page at once.
4. Click **View site** to see the result in a new tab.

- **You start from the built-in page.** Boxes already show the text in use. Text you do not change keeps the built-in wording, so wording fixes and translations in later updates still reach it.
- **To go back, clear the box.** Emptying a box and saving restores the built-in text for that language.
- One **Save** stores every tab. If something is wrong, the page opens on the tab with the problem and lists it. Pictures chosen before the error must be chosen again.

## Sections

Eight sections make up the home page: **Hero**, **Product showcase**, **Screenshot tour**, **Fast checkout**, **Pricing**, **FAQ**, **Contact** and **Closing call to action**. The **Hero** also holds the feature cards and the **How it works** steps.

| Control | What it does |
|---|---|
| Grip (dots) | Drag a section up or down. With the keyboard, focus the grip and use the arrow keys |
| Background | **As designed**, **Plain**, **Soft tint**, **Accent tint** or **Dark brand**. Each section has its own choice |
| Switch | Shows or hides the section |

The page header shows your logo, menu links (**Features**, **Screenshots**, **FAQ** and **Pricing**), a language menu when more than one language is active, **Log in** and, while sign-up is open, **Get started**. On a phone the links move into a menu button.

Some sections hide themselves when they have nothing to show: **Pricing** without a public plan, **Contact** without a phone or WhatsApp number, **Screenshot tour** without slides and **FAQ** without questions. The menu links to hidden sections disappear too.

The older **Languages** section ("Your shop, in your language") has been removed. Visitors still change the language from the globe menu in the page header. If you saved a section order before, **Fast checkout** is placed after **Screenshot tour**; drag it elsewhere if you like.

## Design

The preview on the right changes as you choose.

<Screenshot name="platform-website-design" alt="Design tab with colours, headings, shapes and a live preview" />

| Option | Choices |
|---|---|
| Brand colour | Buttons, icons and highlights. Empty uses the panel's accent colour |
| Accent colour | Dots, underlines and markers |
| Heading colour | Empty follows the light and dark theme |
| Heading font | Any font of the panel, or the same as the rest of the site |
| Highlighted words in headings | Colour, Underline, Marker, Gradient or None. It applies to the last words of a heading |
| Button shape | Pill, Rounded or Square |
| Card corners | Round, Soft or Sharp |
| Space between sections | Normal, Compact or Airy |
| Page width | Normal, Narrow or Wide |
| Hero picture side | Right or Left |
| Page background | Gradient, Plain or Tinted |
| Animations | On or Off |
| Custom CSS | For anything else. Up to 20,000 characters, used on the home page only. Landing page classes start with `.lp-` |

Colours are hex codes such as `#8a1538`. The reset button beside a colour goes back to automatic.

## Content tabs

| Tab | What you edit |
|---|---|
| Hero | Label, main heading, text, note, hero picture, **How it works** heading, and the lists **Feature cards** (up to 9), **How it works steps** (5) and **Benefits strip** (8) |
| Product showcase | Heading and text, the light and dark screen pictures, the banner text and **Highlights** (6) |
| Screenshot tour | Heading and text, and up to 8 slides |
| Fast checkout | Small label, heading, text, **Checkout screenshot** and **Checkout points** (6). Two or four points look best |
| Pricing | Heading and text. Plans, prices and the comparison table come from [Plans](money/plans.md) |
| FAQ | Heading, text and up to 30 questions |
| Closing call to action | Label, heading, text and picture |
| Buttons & badges | Button labels, the trial line, and the badges under the plans (6) and in the closing banner (4) |

### Lists

Feature cards, steps, benefits, highlights, checkout points, questions and badges work the same way:

- **Add** creates an item. Choose an icon, then write a title and a short text.
- Drag the grip to reorder, and use the bin to remove an item.
- An item you add needs a title in at least one language. A question needs a title and an answer.
- If an item you added has no text in a language, the English text is shown there.
- An empty list hides that block.

### Screenshot slides

Each slide has a picture, an icon, a tab label, a title, a short text and key points (one per line). A new slide must have a picture; the recommended size is 1800 × 880 px. On a built-in slide, **Use the built-in picture** removes your upload.

### Trial length in text

Write `:days` in the trial line or in a badge to show the length of the trial. A badge that uses `:days` is hidden when there is no trial.

## Pictures

PNG, JPG or WebP, up to 4 MB. Each box shows the recommended size, for example 1800 × 1200 px for the checkout screenshot. Tick **remove** on an uploaded picture to go back to the built-in one. Files are kept in the place set under [File storage](settings/file-storage.md).

## Contact & demo

| Field | What it does |
|---|---|
| WhatsApp number | With the country code. Adds a WhatsApp button and a floating chat button |
| Phone number | Adds a call button |
| Contact name | Shown above the buttons, for example "Sales team" |
| Live demo link | Where the **Live demo** button goes. Empty hides the button |

Until you save this page, the demo link comes from `LANDING_DEMO_URL` in `.env`. The contact box heading and text are on this tab too.

## Search & sharing

| Field | What it does |
|---|---|
| Page title | The title in the browser tab and in search results |
| Description | The short text under the title in search results |
| Share picture | Shown when the link is shared on social media. Recommended 1200 × 630 px |

## What is edited somewhere else

| On the home page | Edit it under |
|---|---|
| Logo, favicon and platform name | [General settings](settings/general-settings.md#platform) |
| Plans and prices | [Plans](money/plans.md) |
| Start trial buttons (hidden while sign-up is closed) | [General settings](settings/general-settings.md), Sign-up |
| Terms and Privacy | [Legal pages](settings/legal-pages.md) |
| Languages in the header language menu | [Languages](settings/languages.md) |
| Menu and footer labels | [Languages](settings/languages.md), translations |

## Good to know

- A fresh install needs no setup: the home page shows the built-in content until you change it.
- Saving writes "Website updated" to the [Audit log](admins/audit-log.md), with which parts changed.
- The page content is cached for up to 5 minutes; saving clears it.

## Website is missing from the sidebar

1. Make sure your role has `settings.manage`, or is Super admin.
2. Run `php artisan optimize:clear` on the server. Old cached config or routes hide new menu items.

## Related

- [General settings](settings/general-settings.md)
- [Languages](settings/languages.md)
- [Plans](money/plans.md)
