---
title: Third-party costs
description: Outside services the application can connect to, and which ones cost money.
---

# Third-party costs

The application itself runs on your own hosting. Everything below is optional or depends on how you run the platform. Pricing is set by each provider, so check their sites.

## Hosting and domain

| Item | Notes |
|------|-------|
| Web hosting or VPS | Must meet the [server requirements](installation/server-requirements.md) and allow a cron job. |
| Domain name | Required for a live site. The Super admin panel can use its own host through `ADMIN_DOMAIN`. |
| SSL certificate | Needed for HTTPS. Many hosts provide one for free. |
| MySQL database | Usually included with hosting. |

## Payment gateways

Businesses pay for their subscription through a gateway you connect in the Super admin panel. The supported gateways are:

- Stripe
- Razorpay
- PayPal
- Flutterwave

Each gateway charges its own transaction fees. You can also record payments manually. See [Payment gateways](platform/money/payment-gateways.md).

Shops can also take online payments from their own customers at the POS using their own gateway accounts; fees are billed by the gateway to the shop.

## Email (SMTP)

Verification, password reset, invitation and billing emails need a mail server. Enter your SMTP details in the Super admin panel under Settings > System email. Many email providers have a free tier. Each business can also set its own mail account in its [email settings](shop/settings/email-settings.md).

## SMS

SMS is optional and set up per business in [SMS settings](shop/settings/sms-settings.md). The supported providers are MSG91, 2Factor and Fast2SMS. Each provider bills per message.

## Purchase code validation

The web installer checks your purchase code against the WRTeam validator. This needs your server to reach it over outbound HTTPS (port 443).

## Related

- [Introduction](intro.md)
- [Payment gateways](platform/money/payment-gateways.md)
