---
title: Shop Panel Overview
description: What the shop admin panel manages, how the menu is organised, who can see what, and the order to set things up.
---

import Screenshot from '@site/src/components/Screenshot';

# Shop Panel Overview

The shop panel is where a business runs its day: selling at the POS terminal, managing products and stock, buying from suppliers, tracking expenses, and reading reports. Each business has its own isolated data, branches, team and settings.

<Screenshot name="shop-overview-dashboard" alt="Shop panel dashboard with the sidebar menu on the left" />

## What the panel manages

- **Selling:** POS terminal, sales history, refunds, cash register shifts and quotations.
- **Catalogue and stock:** products, variants, categories, brands, units, stock levels, adjustments, transfers and stock takes.
- **Tax and pricing:** tax rates and groups, price lists, customer groups and discount rules.
- **Purchasing:** suppliers, purchase orders, reorder suggestions and purchase returns.
- **Expenses, branches and people:** expense records, multiple branches, customers, loyalty points, your team and their roles.
- **Reports and system:** sales, payment, purchase, inventory, expiry and profit reports, plus settings, billing and the audit log.

## The sidebar menu

The menu is built from `config/menu.php`. You only see an item when your role has its permission and your plan includes its feature. The Dashboard sits above the groups.

| Group | Items | Permission needed |
|---|---|---|
| Sales | POS Terminal, Sales, Refunds, Refund Reasons, Shifts, Quotations | `sales.create`, `sales.view`, `sales.return`, `shifts.view`, `quotations.view` |
| Inventory (Catalogue) | Products, Categories, Brands, Units, Attributes, Print Labels | `products.view`, `categories.view`, `brands.view`, `units.view`, `attributes.view` |
| Inventory (Stock) | Stock levels, Stock Adjustments, Stock Transfers, Stock Takes | `inventory.view` |
| Tax | Tax Rates, Tax Groups | `tax-rates.view`, `tax-groups.view` |
| Pricing | Price Lists, Customer Groups, Discount Rules | `price-lists.view`, `customer-groups.view`, `discount-rules.view` |
| Purchasing | Suppliers, Purchase Orders, Reorder Suggestions, Purchase returns | `suppliers.view`, `purchase-orders.view`, `purchase-orders.create` |
| Expenses | Expenses, Expense categories | `expenses.view` |
| Branches | Branches | `settings.manage` |
| People | Customers, Team, Roles & Permissions | `customers.view`, `users.manage` |
| Reports | Sales Report, Payments Report, Purchases Report, Inventory Report, Expiry Report, Profit Report | `reports.sales`, `reports.financial`, `reports.inventory` |
| Help | Support | Open to every member |
| System | Audit log, Billing, Settings | `audit.view`, `billing.manage`, `settings.manage` |

## Access and permissions

Every action is controlled by a permission such as `products.view` or `sales.create`. Permissions are grouped into roles; each team member has one role and a set of branches they can work in. Six roles come built in (Owner, Admin, Manager, Cashier, Inventory Manager, Purchase Manager), and you can create your own. See [Roles & Permissions](people/roles-and-permissions.md) and [Team](people/team.md).

## Plan features

Your plan sets limits on branches, team members and products, and switches some features on or off. Pages for a feature your plan does not include are hidden from the menu and refuse direct access.

| Feature | Gates |
|---|---|
| Quotations | Sales > Quotations |
| Stock take | Inventory > Stock Takes |
| Batch and expiry tracking | Reports > Expiry Report, expiry pages |
| Loyalty points | Settings > Loyalty points, loyalty on customers |
| Daily owner summary | Settings > daily summary |
| SMS | Settings > SMS settings and SMS templates |

Manage your plan under System > Billing. See [Billing & Plans](account/billing-and-plans.md).

:::note
When your subscription is not active the panel becomes read-only: you can view and export your data and contact Support, but you cannot add or change anything. An overdue payment first gets a grace period with full access.
:::

## Recommended setup path

1. [Sign up and finish onboarding](getting-started/signup-and-onboarding.md): plan, business details.
2. Run the [Setup Wizard](getting-started/setup-wizard.md): currency, branch name, first products, team.
3. Review [General Settings](settings/general-settings.md) and [Payment Methods](settings/payment-methods.md).
4. Add [categories, brands and units](catalogue/categories-brands-units.md) and your [products](catalogue/products.md).
5. Put stock on your products with a [stock adjustment](stock/stock-adjustments.md).
6. Set up [tax](pricing/tax-rates-and-groups.md) and, if needed, [price lists](pricing/price-lists.md) and [discount rules](pricing/discount-rules.md).
7. [Invite your team](people/team.md) and assign roles.
8. Open a register and make your first sale on the [POS Terminal](selling/pos-terminal.md).

## Related

- [Navigating the Panel](getting-started/navigating-the-panel.md)
- [Dashboard](getting-started/dashboard.md)
- [Billing & Plans](account/billing-and-plans.md)
