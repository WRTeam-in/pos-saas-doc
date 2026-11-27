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

## The screen at a glance

- **Header:** the scan box, the customer box, **Cash in/out**, **Close Register**, a full-screen button and your account menu. Full screen hides the browser bars; press it again or `Esc` to leave. It is not offered on iPhones.
- **Bottom bar:** the sale actions (**Hold**, **Held Sales**, **Note**, **Coupon**, **Gift card**, **Return** and **Cancel sale**), whether the browser is online, when the register was opened, the layout buttons, the calculator and a keyboard button that shows or hides the key hints on the buttons.
- **Cart:** the lines, the customer, the totals and **Pay Now**.

## Add products to the cart

- **Scan or type a barcode / SKU** in the box at the top, then **Add to cart**.
- Tap a product tile. Tiles show stock status (in stock, low stock, out of stock), a **New** badge and any percentage discount. Use the **+** and **-** buttons on a tile to change its quantity.
- Products with variants show **Choose options**. Select the variant you need.
- Weighed or measured products ask for the amount first (for example 1.25 kg).
- Filter by category (drag the category row sideways if it does not fit), by **In stock**, **Low stock** or **Out of stock**, and by brand; sort by name or price; and switch between grid and list view.
- A number on **Choose options** shows how many variants the product has.
- Products appear 60 at a time and more load as you scroll. Search always covers the whole catalogue. Sold-out products are hidden while browsing but still found by search.
- Type a count and `*` before a code to add several, for example `3*CODE`.
- A barcode scanner works wherever the cursor is, not only in the scan box. If a window such as payment or a note is open, the till asks you to close it first. Scanning on the **Sale completed!** screen starts the next sale with that item.

The cart shows each line, the **Subtotal**, the discounts (**Item discounts** and **Order discount** are shown separately when they apply), **Tax** and the **Grand Total**. A discounted line shows its unit price struck through. The keyboard icon at the top of the cart lists the keys for working on cart lines. Discounts come from your [discount rules](../pricing/discount-rules.md); prices follow the customer's [price list](../pricing/price-lists.md) when one applies.

:::note
You cannot sell more than the stock on hand unless **Allow stock to go negative** is switched on in Settings. Products tracked by batch never go below zero.
:::

### Batches

For batch-tracked products the cart uses the earliest-expiry batch automatically. If you hold `stock-batches.override`, you can pick a different batch on the line. Expired batches cannot be chosen when **Block sales of expired stock** is on.

## Customer and notes

- Select the **Customer** box (`F3`), type a name or phone number, and choose from the list with the mouse or with the arrow keys and `Enter`. Leave it as **Walk-in customer** for anonymous sales.
- Select **New** to add a customer on the spot: first name, last name (optional), phone, and group. Needs `customers.create`. **Add and use** saves and attaches the customer. **Add with all details** opens the full form in a new tab.
- Attaching a customer applies their group pricing, and enables credit sales and loyalty points.
- **Note** in the bottom bar (`Alt+O`) attaches a note to the sale.

When [loyalty](../people/loyalty.md) is on, the cart shows the customer's points balance and how many points the sale will earn.

### Cart and scrolling

On a computer the cart stays pinned under the header while the products scroll. A long cart scrolls on its own, and the customer, totals and **Pay Now** stay in view. On small screens the cart is below the products, with a bar at the bottom for the total and payment.

### Coupons and gift cards

Select **Coupon** in the bottom bar to apply a [coupon](../pricing/coupons.md) and **Gift card** to sell a [gift card](../pricing/gift-cards.md) with the sale.

## Hold, resume and cancel

| Action | What it does |
|---|---|
| **Hold** | Parks the current cart and starts a fresh one. |
| **Held Sales** | Shows the number of parked carts for this branch and opens the list. Select **Resume** to bring one back. |
| **Clear all** | Removes every item from the cart after you confirm. |
| **Cancel sale** | Discards the cart. Needs `sales.cancel`. A held sale can be cancelled from the list the same way. |

These actions do not reload the page: only the cart, held sales, prices and stock change. Your category, search and scroll position stay, and the cursor returns to the scan box. Something scanned while a sale is being held goes to the next sale.

## Take payment

1. Select **Pay Now**. The **Take Payment** window opens, showing the items and total.
2. For one payment method, choose it and enter the **Received Amount**, or tap **Exact** or one of the suggested round amounts under the box. **Change Due** is calculated for you.
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

The window shows **Sale completed!** with the sale number and change due. From here you can **Print** the receipt, **Send Receipt (SMS/Email)** or start a **New Sale**, which opens at once with fresh stock. The receipt is also available later from [Sales](sales.md).

## Returns from the till

You can take a return without leaving the POS. Your current cart stays as it is. Needs `sales.return`.

1. Select **Return** in the bottom bar (`Alt+T`).
2. Scan the barcode or QR code on the customer's receipt, or search by sale number, customer name or phone. With an empty box, recent sales are listed. Select the sale.
3. Choose the items, quantities, condition, reason and payout, the same as on the [Refunds](refunds.md) page, and select **Process return**.
4. The window shows the amount and refund number. **Print receipt** prints the updated receipt, and **Back to sale** returns you to the cart.

Resellable items go back into stock and the product tiles update at once.

## Cash in/out and closing the register

- **Cash in/out** records money added to or taken from the drawer. Choose **Cash in** or **Cash out**, an amount, a reason (Float top-up for cash in; Supplier payment, Safe drop or Expense for cash out; Other for either) and a note, which is required for cash out. The dialog closes when it is saved and the till stays as it was. Cash out cannot exceed the cash expected in the drawer.
- **Close Register** asks for the **Counted cash** and an optional note, then ends your shift and opens its report. See [Shifts and Cash](shifts-and-cash.md).

## Keyboard shortcuts

| Key | Action |
|---|---|
| `F2` | Product search |
| `F3` | Customer list |
| `F4` | Hold Sale |
| `F6` | Pay. In the payment window, complete the sale (also `Ctrl+Enter`). On the success screen, New Sale |
| `F8` or `Alt+C` | Calculator |
| `F9` | Held Sales. On the success screen, print (also `Alt+P`) |
| `Alt+N` | New customer |
| `Alt+O` | Add note |
| `Alt+K` | Coupon code |
| `Alt+G` | Sell gift card |
| `Alt+T` | Return |
| `Alt+X` | Cancel sale |
| `Alt+I` | Cash in/out |
| `Alt+R` | Close Register |
| `Alt+1`, `Alt+2`, ... | Choose a payment method |
| `Alt+Up`, `Alt+Down` | Select a cart line |
| `Alt+Plus`, `Alt+Minus` | Change the selected line's quantity |
| `Alt+Q` | Type the selected line's quantity |
| `Alt+Backspace` | Remove the selected line |

On a Mac, `Alt` is the Option key. The keys are shown on the buttons; the keyboard button in the bottom bar hides or shows them, and the till remembers your choice. The layout buttons in the bottom bar switch between cart on the right, cart on the left, or a category list on the left, for this visit only.

## Settings that change the terminal

Under Settings > Cashier (POS): cart position (right or left), tile size (Compact, Comfortable, Spacious), default category, "New" badge duration, show the tax line in the cart, show "from $X" on tiles with several prices, and play a sound when an item is added.

## Related

- [Sales](sales.md)
- [Coupons](../pricing/coupons.md)
- [Gift cards](../pricing/gift-cards.md)
- [Refunds](refunds.md)
- [Shifts and Cash](shifts-and-cash.md)
- [Customers](../people/customers.md)
- [General Settings](../settings/general-settings.md)
