const { CREDS } = require('../lib');

const meta = {
  slug: 'suppliers-and-purchase-orders',
  title: 'Suppliers and purchase orders',
  category: 'back-office',
  summary: 'Add a supplier, raise a purchase order, receive the goods and watch your stock go up.',
  doc: '/docs/shop/purchasing/purchase-orders',
  order: 31,
};

async function run(t) {
  const { page } = t;
  const pick = async (box, option, search) => {
    await t.click(page.locator(`${box} + .select2-container`).first(), { settle: false });
    await t.wait(400);
    if (search) {
      await page.keyboard.type(search, { delay: 90 });
      await t.wait(500);
    }
    await t.click(page.locator('.select2-results__option', { hasText: option }).first(), { settle: false });
    await t.wait(400);
  };

  for (const q of [
    "DELETE FROM purchase_receipt_items", "DELETE FROM purchase_receipts", "DELETE FROM purchase_payments",
    "DELETE FROM purchase_return_items", "DELETE FROM purchase_returns", "DELETE FROM purchase_order_items", "DELETE FROM purchase_orders",
    "DELETE FROM suppliers WHERE tenant_id=1 AND name='Demo Wholesale Traders'",
    "UPDATE branch_stock SET quantity=0 WHERE tenant_id=1 AND branch_id=1 AND product_variant_id=12",
  ]) await t.sql(q);

  await t.intro('Suppliers and purchase orders', 'Order stock, receive it and see it on the shelf');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Suppliers');
  await t.say('Purchasing starts with suppliers: the people and companies you buy your stock from.', () => t.openMenu('Purchasing', '/suppliers'));
  await t.wait(600);
  await t.say('Click New supplier to add one.', () => t.click('a[href$="/suppliers/create"]'));
  await t.say('Enter the supplier name and a contact person. A name is all that is required.', async () => {
    await t.type('#name', 'Demo Wholesale Traders', { delay: 70 });
    await t.type('#contact_person', 'Sam Demo', { delay: 80 });
  });
  await t.say('Add a phone number and an email so you know how to reach them.', async () => {
    await t.type('input[placeholder="Phone number"]', '9000022222', { delay: 80 });
    await t.type('#email', 'demo.supplier@example.com', { delay: 55 });
  });
  await t.say('The address goes on your purchase orders, so fill in the street, city and country.', async () => {
    await t.type('#address_1', '14 Demo Market Road', { delay: 60 });
    await t.type('#city', 'Pune', { delay: 80 });
    await pick('#country', 'India', 'India');
  });
  await t.say('Click Save supplier. It now appears in your supplier list.', () => t.click('button:has-text("Save supplier")'));
  await t.wait(2000);

  t.chapter('Create a purchase order');
  await t.say('A purchase order is your request to a supplier. Open Purchase Orders and click New Purchase Order.', async () => {
    await t.openMenu('Purchasing', '/purchase-orders');
    await t.wait(1200);
    await t.click('a[href$="/purchase-orders/create"]');
  });
  await t.say('Choose the supplier and the branch the goods are delivered to.', async () => {
    await pick('#supplier_id', 'Demo Wholesale Traders', 'Demo');
    await pick('#branch_id', 'Camp');
  });
  await t.say('Click Add Item, pick a product, then enter the quantity and what the supplier charges per unit.', async () => {
    await t.click('[data-po-item-add]', { settle: false });
    await t.wait(500);
    await pick('[data-po-row] select', 'FRE-0012-1', 'Basmati');
    await t.type('[data-po-row] [data-field="quantity_ordered"]', '40', { delay: 120 });
    await t.type('[data-po-row] [data-field="unit_cost"]', '82', { delay: 120 });
  });
  await t.highlight('[data-po-grand-total]', 1200);
  await t.say('The total is worked out for you. Click Save to create the order as a draft.', () => t.click('button:has-text("Save")'));
  await t.wait(1800);

  t.chapter('Mark it as ordered');
  await t.say('When you are ready to send it, click Mark as Ordered. The supplier is emailed the order.', async () => {
    await page.evaluate(() => document.querySelectorAll('.toast-container .toast').forEach((e) => e.remove()));
    await t.click(page.locator('button:has-text("Mark as Ordered"):visible').first(), { settle: false });
    await t.wait(1200);
  });
  await t.click('.swal2-confirm');
  await t.wait(1500);
  await t.say('The status changes to Ordered and a Receive Stock section appears.', () => t.highlight('text=Receive Stock', 2200));

  t.chapter('Receive the goods');
  await t.say('When the delivery arrives, enter how many units came in. Receive all remaining fills in the full quantity.', () => t.click('[data-receive-all]', { settle: false }));
  await t.wait(1400);
  await t.say('Click Receive Stock. The quantity is added to your inventory for that branch.', () => t.click('button:has-text("Receive Stock")'));
  await t.wait(2000);
  await t.say('The order now shows what was received, and the receiving history records the delivery.', () => t.scroll(500, 1800));
  await t.wait(1000);
  await t.scroll(-500, 600);

  t.chapter('Check your stock');
  await t.say('Open Inventory, then Stock levels, and search for the product.', async () => {
    await t.openMenu('Inventory', '/inventory');
    await t.type('input[placeholder^="Search by product"]', 'FRE-0012-1', { delay: 80 });
    await t.settle(1200);
  });
  await t.say('Basmati Rice 1 kg went from 0 to 40 in stock, and its status is no longer Out.', () => t.highlight('#inventory-table tbody tr, .fixed-table-body tbody tr', 2800));
  await t.say('That is the buying cycle: supplier, purchase order, receive, stock. Reorder Suggestions can start orders for you.', () => t.wait(1500));
}

module.exports = { meta, run };
