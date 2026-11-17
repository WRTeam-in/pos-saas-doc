---
title: POS Terminal
description: Open a register, build a cart, hold sales, take split payments and print receipts at the point of sale.
---

import Screenshot from '@site/src/components/Screenshot';

# POS Terminal

The POS Terminal is the till. You open a register with starting cash, add products to a cart, take payment and print or send a receipt.

**Where to find it:** Sales > POS Terminal. Requires `sales.create`.

<Screenshot name="shop-pos-terminal" alt="POS terminal with product tiles on the left and the cart on the right" />

## Open the register

Each cashier opens their own register (shift) in the branch they are working in. Until you do, the terminal shows **Open Register**.

1. Enter the **Starting cash amount**. This is the opening balance for your sales session.
2. Select **Open Register**.

Each cashier can have one open register per branch, so several cashiers can sell at the same time. Check the branch in the header first if you work in several.

## Add products to the cart

- **Scan or type a barcode / SKU** in the box at the top, then **Add to cart**.
- Tap a product tile. Tiles show stock status (in stock, low stock, out of stock), a **New** badge and any percentage discount. Use the **+** and **-** buttons on a tile to change its quantity.
- Products with variants show **Choose options**. Select the variant you need.
- Weighed or measured products ask for the amount first (for example 1.25 kg).
- Filter by category, **All Products** or **Low stock**, filter by brand, sort by name or price, and switch between grid and list view.

The cart shows each line, the **Subtotal**, **Discount**, **Tax** and the **Grand Total**. Discounts come from your [discount rules](../pricing/discount-rules.md); prices follow the customer's [price list](../pricing/price-lists.md) when one applies.

:::note
You cannot sell more than the stock on hand unless **Allow stock to go negative** is switched on in Settings. Products tracked by batch never go below zero.
:::

### Batches

For batch-tracked products the cart uses the earliest-expiry batch automatically. If you hold `stock-batches.override`, you can pick a different batch on the line. Expired batches cannot be chosen when **Block sales of expired stock** is on.

## Customer and notes

- Search the **Customer** box to attach a customer. Leave it as **Walk-in customer** for anonymous sales.
- Select **New** to add a customer on the spot: first name, last name (optional), phone, and group. Needs `customers.create`. **Add all details** opens the full form.
- Attaching a customer applies their group pricing, and enables credit sales and loyalty points.
- **Add note** attaches a note to the sale.

When [loyalty](../people/loyalty.md) is on, the cart shows the customer's points balance and how many points the sale will earn.

## Hold, resume and cancel

| Action | What it does |
|---|---|
| **Hold Sale** | Parks the current cart and starts a fresh one. |
| **Held Sales** | Lists parked carts for this branch. Select **Resume** to bring one back. |
| **Clear all** | Removes every item from the cart after you confirm. |
| **Cancel sale** | Discards the cart. Needs `sales.cancel`. A held sale can be cancelled from the list the same way. |

## Take payment

1. Select **Pay Now**. The **Take Payment** window opens, showing the items and total.
2. For one payment method, choose it and enter the **Received Amount**. **Change Due** is calculated for you.
3. For several methods, select **Split**, then **Add payment** for each one. The last row can fill in whatever is **Still to pay**. The window shows when the sale is **Fully covered** or **Overpaid by** an amount.
4. If a method is set to require a reference (a slip or UPI number), enter it in the **Reference** field.
5. Select **Pay & Complete Sale**.

Payment methods come from [Payment Methods](../settings/payment-methods.md). Online gateways that are switched on (Stripe, Razorpay, Flutterwave, PayPal) also appear. Choosing one sends the customer to the gateway's page, and the sale completes when the payment is confirmed. Online payments wait until the owner's email is verified.

### Credit sales

If the received amount is less than the total, the remainder can go on the customer's account. This needs both:

- **Allow credit sales (checkout with a balance due)** switched on in Settings > Cashier (POS), and
- a customer attached to the sale.

A customer's credit limit is enforced. If a sale would go over it, the till offers **Increase limit** to raise the limit and continue. Collect the balance later from the customer's page. See [Customers](../people/customers.md).

### Loyalty points

With a customer who has spendable points, the payment window shows **Use loyalty points**. Enter **Points to use** or select **Use max**. The points are worth an amount off the sale, limited by your loyalty rules.

## After the sale

The window shows **Sale completed!** with the sale number and change due. From here you can **Print** the receipt, **Send Receipt (SMS/Email)** or start a **New Sale**. The receipt is also available later from [Sales](sales.md).

## Cash in/out and closing the register

- **Cash in/out** records money added to or taken from the drawer. Choose **Cash in** or **Cash out**, an amount, a reason (Float top-up for cash in; Supplier payment, Safe drop or Expense for cash out; Other for either) and an optional note. Cash out cannot exceed the cash expected in the drawer.
- **Close Register** asks for the **Counted cash** and an optional note, then ends your shift and opens its report. See [Shifts and Cash](shifts-and-cash.md).

## Keyboard shortcuts

| Key | Action |
|---|---|
| `F2` | Focus product search |
| `F3` | Focus customer |
| `F4` | Hold Sale |
| `F6` | Pay |

A status bar at the bottom shows the shortcuts and whether the browser is online or offline.

## Settings that change the terminal

Under Settings > Cashier (POS): cart position (right or left), tile size (Compact, Comfortable, Spacious), default category, "New" badge duration, show the tax line in the cart, show "from $X" on tiles with several prices, and play a sound when an item is added.

## Related

- [Sales](sales.md)
- [Refunds](refunds.md)
- [Shifts and Cash](shifts-and-cash.md)
- [Customers](../people/customers.md)
- [General Settings](../settings/general-settings.md)
