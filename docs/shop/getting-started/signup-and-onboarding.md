---
title: Sign Up and Onboarding
description: Create a business account, choose a plan or free trial, and enter your business details.
---

import Screenshot from '@site/src/components/Screenshot';

# Sign Up and Onboarding

A new business starts by creating an account on the Register page. After that, a short onboarding flow lets you pick a plan or free trial and enter your business details.

**Where to find it:** `/register` on your site. Sign-up must be open (a platform setting); otherwise the page sends you to Sign in with the message "Sign-up is currently closed."

<Screenshot name="shop-signup-register" alt="Create your account form" />

## Create your account

1. Open the Register page.
2. Enter your **Full name**, **Email** and **Password**, then confirm the password.
3. Accept the Terms of Service and Privacy Policy.
4. Select **Create account**.

The password must meet the minimum length shown under the field. Some email domains can be blocked by the platform; you will see "Email addresses from this domain cannot be used."

You become the business **Owner**. The account starts with:

- A default branch called **Main** (code `MAIN`).
- The built-in roles, default payment methods and expense categories.
- Nine common units (Piece, Pack, Box, Dozen, Kilogram, Gram, Litre, Millilitre, Metre) and a **General** category, so your first product can be saved straight away.
- Five refund reasons: Changed mind, Damaged or faulty, Wrong item, Expired, Other.
- A free trial subscription.
- Your currency and time zone, taken from the platform defaults and your browser.

You can change or remove all of these later.

## The onboarding steps

After registering you land in onboarding. The steps are Create account, Select plan, Business setup and, if you chose a paid plan, Payment.

### Select plan

1. Choose **Start your N-day free trial** (full access, no credit card), or pick one of the paid plans.
2. For paid plans, switch between Monthly and Yearly billing. Prices and limits come from the plans your platform administrator published.
3. Select **Continue**, or **Skip for now** to continue on the trial.

If you came from a pricing page link with a plan in it, that plan is preselected.

### Business setup

| Field | What it does |
|---|---|
| Business name | Required. Names your business everywhere. Defaults to "your name's business". |
| Business type | Required. Pick from the list. |
| Phone | Required. |
| Country | Required. |
| State | Optional. |
| Address | Optional. |

Select **Continue** (or **Skip for now**). You can edit all of this later in [General Settings](../settings/general-settings.md).

### Payment

This step appears only when you chose a paid plan and at least one online payment gateway is available for the plan's currency. You pay on the gateway's secure page. Choose **Pay later, continue with the free trial** to skip it. If the payment is still being confirmed you stay on the free trial until it goes through.

### Done

The final screen says "Welcome to ...!" and offers **Go to Dashboard** plus next steps: **Add your first product**, **Set up your store settings** and **Invite your team**.

:::note
You can change plan any time from **System > Billing**. See [Billing & Plans](../account/billing-and-plans.md).
:::

## Verify your email

If the platform requires email verification, a banner asks you to verify your address. Until the owner verifies, nobody in the business can invite team members or take online gateway payments. Select **Resend link** on the banner if the email did not arrive.

## Sign in later

Use the Sign in page. If you forget your password, use the forgot password link to receive a reset email. People you invite do not register; they accept an invitation. See [Team](../people/team.md).

## Related

- [Setup Wizard](setup-wizard.md)
- [Navigating the Panel](navigating-the-panel.md)
- [Billing & Plans](../account/billing-and-plans.md)
- [First Login](../../installation/first-login.md)
