---
title: Roles and Permissions
description: The built-in roles, every permission in the system, and how to create custom roles.
---

import Screenshot from '@site/src/components/Screenshot';

# Roles and Permissions

Access in the panel is controlled by permissions. A role is a named set of permissions, and each team member has exactly one role. What a person sees in the menu and what buttons they get follows their role.

**Where to find it:** People > Roles & Permissions. Requires `users.manage`.

<Screenshot name="shop-roles-form" alt="Role form with permissions grouped by module" />

## Built-in roles

Every business gets six roles. Their names cannot be changed or deleted, but you can adjust the permissions of all except Owner.

| Role | Access |
|---|---|
| Owner | Everything, including billing and data export. Always has full access and cannot be edited. A business must keep at least one active Owner. |
| Admin | Everything except the two Owner-only permissions (`data.export`, `billing.manage`). |
| Manager | Everything except settings, team and audit log (`settings.manage`, `users.manage`, `audit.view`) and the Owner-only permissions. |
| Cashier | Sell and return: products, categories, brands and units (view), sales (view, create, return), customers (view, create), inventory (view) and quotations (view, create, update). |
| Inventory Manager | Products, categories, brands, units, attributes and inventory, without delete rights. |
| Purchase Manager | Products, suppliers, purchase orders, tax rates and tax groups, and inventory. |

## All permissions

Owner has every permission. "Yes" means the role has it by default; blank means it does not. These defaults are given to each new business and can be changed per role.

| Permission | Allows | Admin, Manager | Cashier | Inventory Manager | Purchase Manager |
|---|---|---|---|---|---|
| `products.view` | See products and print labels | Yes | Yes | Yes | Yes |
| `products.create` | Add products | Yes |  | Yes | Yes |
| `products.update` | Edit products | Yes |  | Yes | Yes |
| `products.delete` | Delete products | Yes |  |  | Yes |
| `categories.view` | See categories | Yes | Yes | Yes |  |
| `categories.create` | Add categories | Yes |  | Yes |  |
| `categories.update` | Edit categories | Yes |  | Yes |  |
| `categories.delete` | Delete categories | Yes |  |  |  |
| `brands.view` | See brands | Yes | Yes | Yes |  |
| `brands.create` | Add brands | Yes |  | Yes |  |
| `brands.update` | Edit brands | Yes |  | Yes |  |
| `brands.delete` | Delete brands | Yes |  |  |  |
| `units.view` | See units | Yes | Yes | Yes |  |
| `units.create` | Add units | Yes |  | Yes |  |
| `units.update` | Edit units | Yes |  | Yes |  |
| `units.delete` | Delete units | Yes |  |  |  |
| `suppliers.view` | See suppliers | Yes |  |  | Yes |
| `suppliers.create` | Add suppliers | Yes |  |  | Yes |
| `suppliers.update` | Edit suppliers | Yes |  |  | Yes |
| `suppliers.delete` | Delete suppliers | Yes |  |  | Yes |
| `attributes.view` | See attributes | Yes |  | Yes |  |
| `attributes.create` | Add attributes | Yes |  | Yes |  |
| `attributes.update` | Edit attributes | Yes |  | Yes |  |
| `tax-rates.view` | See tax rates | Yes |  |  | Yes |
| `tax-rates.create` | Add tax rates | Yes |  |  | Yes |
| `tax-rates.update` | Edit tax rates | Yes |  |  | Yes |
| `tax-groups.view` | See tax groups | Yes |  |  | Yes |
| `tax-groups.create` | Add tax groups | Yes |  |  | Yes |
| `tax-groups.update` | Edit tax groups | Yes |  |  | Yes |
| `customer-groups.view` | See customer groups | Yes |  |  |  |
| `customer-groups.create` | Add customer groups | Yes |  |  |  |
| `customer-groups.update` | Edit customer groups | Yes |  |  |  |
| `price-lists.view` | See price lists | Yes |  |  |  |
| `price-lists.create` | Add price lists | Yes |  |  |  |
| `price-lists.update` | Edit price lists | Yes |  |  |  |
| `price-lists.delete` | Delete price lists | Yes |  |  |  |
| `discount-rules.view` | See discount rules | Yes |  |  |  |
| `discount-rules.create` | Add discount rules | Yes |  |  |  |
| `discount-rules.update` | Edit discount rules | Yes |  |  |  |
| `coupons.view` | See coupons | Yes |  |  |  |
| `coupons.create` | Add coupons | Yes |  |  |  |
| `coupons.update` | Edit coupons and switch them on or off | Yes |  |  |  |
| `coupons.delete` | Delete unused coupons | Yes |  |  |  |
| `gift-cards.view` | See gift cards | Yes | Yes |  |  |
| `gift-cards.sell` | Sell gift cards and check balances at the POS | Yes | Yes |  |  |
| `gift-cards.manage` | Adjust, extend and disable gift cards, and gift card settings | Yes |  |  |  |
| `purchase-orders.view` | See purchase orders, purchase returns | Yes |  |  | Yes |
| `purchase-orders.create` | Create purchase orders and use reorder suggestions | Yes |  |  | Yes |
| `purchase-orders.update` | Edit purchase orders | Yes |  |  | Yes |
| `inventory.view` | See stock levels, adjustments, transfers, stock takes | Yes | Yes | Yes | Yes |
| `inventory.adjust` | Make stock adjustments | Yes |  | Yes | Yes |
| `inventory.transfer` | Transfer stock between branches | Yes |  | Yes | Yes |
| `sales.view` | See sales and receipts | Yes | Yes |  |  |
| `sales.create` | Use the POS terminal, open registers, collect balances | Yes | Yes |  |  |
| `sales.cancel` | Cancel sales and held carts | Yes |  |  |  |
| `sales.return` | Process refunds and manage refund reasons | Yes | Yes |  |  |
| `refunds.approve` | Refund above the refund limit | Yes |  |  |  |
| `customers.view` | See customers | Yes | Yes |  |  |
| `customers.create` | Add customers | Yes | Yes |  |  |
| `customers.update` | Edit customers, notes and credit limits | Yes |  |  |  |
| `customers.collect` | Collect customer payments | Yes |  |  |  |
| `reports.sales` | Sales and Payments reports, dashboard takings | Yes |  |  |  |
| `reports.inventory` | Inventory and Expiry reports | Yes |  |  |  |
| `reports.financial` | Purchases and Profit reports, gross profit | Yes |  |  |  |
| `shifts.view` | See all shifts | Yes |  |  |  |
| `expenses.view` | See expenses and categories | Yes |  |  |  |
| `expenses.create` | Add expenses | Yes |  |  |  |
| `expenses.update` | Edit expenses | Yes |  |  |  |
| `expenses.delete` | Delete expenses | Yes |  |  |  |
| `quotations.view` | See quotations | Yes | Yes |  |  |
| `quotations.create` | Create quotations | Yes | Yes |  |  |
| `quotations.update` | Edit quotations, change status, convert | Yes | Yes |  |  |
| `quotations.delete` | Delete draft quotations | Yes |  |  |  |
| `loyalty.manage` | Loyalty settings and manual point adjustments | Yes |  |  |  |
| `stock-batches.override` | Choose a batch by hand at the till | Yes |  |  |  |
| `stock-batches.edit` | Correct batch expiry dates | Yes |  |  |  |
| `settings.manage` | Settings, branches, setup wizard, payment methods | Admin only |  |  |  |
| `users.manage` | Team, invitations, roles | Admin only |  |  |  |
| `audit.view` | See the audit log | Admin only |  |  |  |
| `data.export` | Export business data | Owner only |  |  |  |
| `billing.manage` | Billing and plans | Owner only |  |  |  |

:::note
Pages for features your plan does not include stay hidden even if the role has the permission: Quotations, Stock Takes, expiry, loyalty, owner summary and SMS. See the [Overview](../overview.md).
:::

## Create a role

1. Select **Add role**.
2. Enter the **Role name**, which is shown when assigning the role.
3. Optionally **Start from a preset** (Cashier, Manager, Inventory Manager or Purchase Manager) or use **Copy permissions from a role** to begin from an existing role.
4. Tick permissions, module by module. Each module card has **Select all**. Standalone permissions (**Manage settings**, **Manage team**, **View audit log**, **Manage billing**, **Export business data**) are under **Other permissions**.
5. Select **Create role**.

Action names on the form map to permissions: View, Create, Update, Delete, Adjust, Transfer, Cancel, Return, Collect payment, Sales Report, Inventory Report, Financial Report, Choose batch manually (`stock-batches.override`) and Correct batch expiry dates (`stock-batches.edit`).

## Edit or delete a role

- Open a role from the list to edit its permissions. Built-in role names are fixed.
- Custom roles can be renamed and deleted. A role that is assigned to a team member cannot be deleted.
- The Owner role is shown read-only.
- Changes are written to the audit log.

## Limits on who can grant what

- You can only give a role permissions you hold yourself. Only an Owner can give any permission.
- `data.export` and `billing.manage` are Owner-only; nobody else can hand them out.
- If you hold a role, you cannot add permissions to it. Ask an Owner.
- Only an Owner can assign the Owner role.

## Related

- [Team](team.md)
- [Audit Log](../account/audit-log.md)
- [Navigating the Panel](../getting-started/navigating-the-panel.md)
