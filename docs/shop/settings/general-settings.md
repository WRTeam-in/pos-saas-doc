---
title: General Settings
description: Every section of the Settings screen, from business details to receipts and POS behaviour.
---

import Screenshot from '@site/src/components/Screenshot';

# General Settings

Settings is where you describe your business and tune how the panel and the POS behave. One page holds most sections as tabs, and a few other pages (payment methods, email, SMS, daily summary) open from the same menu.

**Where to find it:** sidebar > **System** > **Settings**. Requires `settings.manage`.

<Screenshot name="shop-settings-overview" alt="Settings page with the section list on the left" />

## How the page works

- The section list on the left is grouped: **General** (Appearance, Business, Brand, Money & tax), **Sales** (Receipt template, Cashier (POS), Payments, Payment Methods, Loyalty), **Messaging** (Email settings, Email templates, SMS settings, SMS templates) and **Alerts & backups** (Daily summary).
- The tabs on this page share one form. Click **Save settings** to save every tab at once. A bar shows **Unsaved changes** and nothing is applied until you save.
- A red `!` badge on a section marks a field that needs attention after a failed save.
- **Loyalty** only shows if you hold `loyalty.manage`. See [Loyalty](../people/loyalty.md).
- Sections your plan does not include (for example Loyalty, Gift cards, SMS settings, SMS templates or Daily summary) are hidden from the list. See [Billing and plans](../account/billing-and-plans.md).

## Appearance

Choose how the admin looks. Changes apply to everyone in the business once you save, and you can preview them first.

| Field | What it does |
| --- | --- |
| **Accent color** | Colour of buttons, links, toggles and charts. Pick a suggested swatch, choose **Custom**, or type a 6-digit hex value. **Reset** returns to the built-in palette. |
| **Text on accent** | Colour of labels on accent-filled buttons: **Auto**, **White** or **Dark**. A badge warns when the contrast is **Hard to read**. |
| **Default theme** | What people see until they choose their own: **Light**, **Dark** or **System**. |
| **Font** | One of the curated fonts, used across the whole admin. |
| **Guided tour** | Switch for showing the system tour to users. |
| **Setup guide** | **Reopen** brings back the setup checklist. See [Setup Wizard](../getting-started/setup-wizard.md). |

## Business

Identity and contact details printed on receipts and reports.

| Field | What it does |
| --- | --- |
| **Business name** | Required. |
| **Legal name** | Fill in if it differs from the trading name. |
| **Tax registration no.** | Your tax or VAT number. |
| **Phone**, **Email**, **Website** | Contact details. |
| **Street**, **Unit / suite**, **City**, **State / region**, **Postal code** | Your address. |
| **Country** | Required. United States, United Kingdom, India, Canada, Australia, Germany, France, United Arab Emirates, Singapore or Other. |

## Brand

Your name and logos. PNG, JPG or WebP up to 1 MB each (the favicon also accepts ICO, up to 512 KB).

| Field | What it does |
| --- | --- |
| **App name** | Shown in the sidebar and browser tab. Blank uses the default. |
| **Logo** | Main logo. |
| **Logo for dark mode** | Logo used on the dark theme. |
| **Icon** | Compact icon. |
| **Favicon** | Browser tab icon. |

## Money & tax

How prices are written and the tax added at checkout.

| Field | What it does |
| --- | --- |
| **Regional presets** | One click fills the currency format for **US**, **Euro**, **UK** or **India**. You can adjust anything afterwards. |
| **Currency** | USD, EUR, GBP or INR. |
| **Symbol** | The currency symbol shown with amounts (up to 6 characters). |
| **Thousands separator** | Comma (1,234), Dot (1.234), Space (1 234) or None (1234). |
| **Decimal separator** | Dot (12.50) or Comma (12,50). |
| **Put the symbol before the amount** | Places the symbol before or after the number. |
| **Default tax rate (%)** | Charged on taxable products at checkout. 0 to 100. |
| **Price type** | **Exclusive (tax added on top)** or **Inclusive (tax included in the price)**. |
| **Date format** | 2026-10-07 (year-month-day), 07/10/2026 (day/month/year), 10/07/2026 (month/day/year) or 07 Oct 2026. |
| **Time format** | 24-hour (22:20) or 12-hour (10:20 PM). |

:::warning
Changing the currency does not convert existing product prices. A notice appears after saving with a **Review product prices** link. Past sales and refunds keep the currency they were made in.
:::

For tax rates and groups beyond the default rate, see [Tax Rates & Groups](../pricing/tax-rates-and-groups.md).

## Receipt template

Controls what prints on the customer receipt.

| Field | What it does |
| --- | --- |
| **Paper size** | **58 mm thermal roll**, **80 mm thermal roll** or **A4 sheet**. Sets width and column layout. On a roll the print page is exactly as long as the receipt, so nothing is cut off and no blank paper is fed. **A4 sheet** prints an invoice layout with a **Billed to** box and a list of payments. |
| **Text size** | **Small**, **Normal** (default), **Large** or **Extra large**. A sample below the field shows the result. |
| **Text thickness** | **Normal** or **Bold (darker)**. Choose Bold if the printed text looks too light, which is common on thermal printers. |
| **Print logo at the top** | Includes your logo. |
| **Print customer name + phone** | Includes the customer. |
| **Print cashier name** | Includes the cashier. |
| **Print SKU under each item** | Adds the SKU line. |
| **Print tax breakdown** | Shows tax per rate. |
| **Print sale barcode** | Adds a barcode of the sale number. |
| **Print QR code** | Adds a QR code of the sale number. Scanning it into a search box, for example when taking a return, finds the sale. |
| **Print batch and expiry under tracked items** | For batch-tracked products. |
| **Header text** | Up to 500 characters, printed above the items. Usually shop name, address and tax number. |
| **Footer text** | Up to 200 characters, printed below the totals. A thank-you note or social handle. |
| **Return policy** | Up to 500 characters, printed at the very bottom in fine print. |

## Cashier (POS)

Tunes the checkout screen. See [POS Terminal](../selling/pos-terminal.md).

| Field | What it does |
| --- | --- |
| **Cart position** | **Beam** puts the cart on the right (default). **Lane** puts it on the left. |
| **Tile size** | **Compact** fits more per row, **Comfortable** is balanced (default), **Spacious** is easier to tap. |
| **Default category** | The category tab selected when the screen opens. **All categories** by default. |
| **"New" badge duration (days)** | Products added within this many days show a "New" badge. 0 turns it off. |
| **Show the tax line in the cart** | Toggle. |
| **Show "from $X" on tiles with multiple prices** | Toggle. |
| **Play a sound when an item is added to the cart** | Toggle. |

### Inventory

| Field | What it does |
| --- | --- |
| **Default low stock threshold** | Used for products with no alert quantity of their own. Products at or below it in the current branch show a Low badge. |
| **Allow stock to go negative** | Lets sales continue at zero stock. Batch-tracked products never go below zero. |
| **Block sales of expired stock** | Expired batches are skipped at the till and in transfers. Write-offs and supplier returns can still take them. |
| **Expiry warning (days)** | Batches expiring within this many days are flagged in the cart and in the Expiry Report. 0 to 365. |

### Sales

| Field | What it does |
| --- | --- |
| **Allow credit sales (checkout with a balance due)** | Lets a customer leave with an unpaid balance. |
| **Refund limit** | The most a user without refund approval can refund in total on one sale. Empty or 0 means no limit. |

## Payments

Lets customers pay by card or UPI at checkout through an online gateway. Choose **Stripe**, **Razorpay**, **Flutterwave** or **PayPal** from the **Gateways** list. A coloured dot shows whether it is off, configured, or missing credentials.

<Screenshot name="shop-settings-payments" alt="Payments tab with gateway list and Test/Live switch" />

| Field | What it does |
| --- | --- |
| **Enabled** | Turns the gateway on. It is active only when the credentials for the selected mode are saved. |
| **Mode** | **Live** uses live credentials and takes real payments. **Test** uses the separate test credentials and moves no real money. |
| Credentials | Stripe: **Publishable key**, **Secret key**, **Signing secret**. Razorpay: **Key ID**, **Key Secret**, **Webhook secret**. Flutterwave: **Public key**, **Secret key**, **Secret hash**. PayPal: **Client ID**, **Client secret**, **Webhook ID**. |
| **Webhook URL** | Copy it into the gateway's dashboard so payments confirm even if the customer's browser never returns. |

- Secret values are stored encrypted and shown as **Saved**. Click **Replace** to change one; leave it blank to keep it.
- Live and test credentials are kept separately, so you can switch modes without retyping.
- PayPal only appears at checkout when it supports your currency.
- A gateway in Test mode is labelled **Test mode** at checkout.

For cash, card terminal, UPI and other manual methods, see [Payment Methods](payment-methods.md).

## Your data

Owners also see a **Your data** card at the bottom of Settings. See [Data Export](data-export.md).

## Related

- [Payment Methods](payment-methods.md)
- [Email Settings](email-settings.md)
- [Owner Summary](owner-summary.md)
- [Data Export](data-export.md)
- [Setup Wizard](../getting-started/setup-wizard.md)
