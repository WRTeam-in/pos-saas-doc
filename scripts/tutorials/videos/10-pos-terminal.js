const { CREDS } = require('../lib');

const meta = {
  slug: 'pos-terminal',
  title: 'Sell at the POS terminal',
  category: 'selling',
  summary: 'Open the register, add products to the cart, pick a customer, take a cash payment and finish the sale.',
  doc: '/docs/shop/selling/pos-terminal',
  order: 10,
};

async function run(t) {
  const { page } = t;
  t.sql("UPDATE cashier_sessions SET status='closed', closed_at=NOW() WHERE status='open' AND tenant_id=1");
  t.sql("UPDATE branch_stock b JOIN product_variants v ON v.id=b.product_variant_id JOIN products p ON p.id=v.product_id SET b.quantity=80 WHERE b.tenant_id=1 AND b.branch_id=1 AND (p.name LIKE 'Amul Cheese%' OR p.name LIKE 'Bananas%' OR p.name LIKE 'Amul Butter%')");
  t.sql("UPDATE sales SET status='cancelled' WHERE tenant_id=1 AND status IN ('draft','held')");
  await t.intro(meta.title, 'Register, cart, customer and payment');

  t.chapter('Open the register');
  await t.say('Sign in as the cashier or owner and open Sales, then POS Terminal.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/pos');
  });
  await t.say('Before selling you open a register. Enter the cash already in the drawer as the starting amount.', async () => {
    await page.locator('input[name="opening_cash"]').fill('');
    await t.type('input[name="opening_cash"]', '500');
  });
  await t.say('Select Open Register. Everything you sell now belongs to this shift.', async () => {
    await t.click('form[action$="/pos/cashier-sessions"] button[type="submit"]');
    await page.waitForSelector('.pos-catalogue');
    await t.settle(800);
  });

  t.chapter('Find products');
  await t.say('Product tiles fill the left side. Each shows the price and how much stock is left.', () => t.highlight('.pos-catalogue .category-card', 2400));
  await t.say('Category pills above the grid narrow the list to one aisle.', async () => {
    await t.click(page.locator('.pos-cat-pill').nth(2));
    await t.wait(1200);
    await t.click(page.locator('.pos-cat-pill').first());
  });
  await t.say('Or type a product name or scan a barcode in the box at the top, then select Add.', async () => {
    await t.type('input[placeholder*="barcode"]', 'Milk');
    await t.wait(1400);
    await page.locator('input[placeholder*="barcode"]').fill('');
    await t.wait(600);
  });

  t.chapter('Build the cart');
  const add = (name) => page.locator(".pos-catalogue .category-card", { hasText: name }).locator("button.pos-add-btn:not([disabled])").first();
  await t.say('Select Add on a tile to put the product in the cart on the right.', () => t.click(add("Amul Cheese Slices")));
  await t.say('Add a couple more products. Each one appears as a line with its price.', async () => {
    await t.click(add("Bananas"));
    await t.click(add("Amul Butter"));
  });
  await t.say('Use plus and minus on a cart line to change the quantity. The total updates at once.', async () => {
    const line = page.locator('.pos-cart-item').first();
    await t.click(line.locator('.pos-select-btn').nth(1));
    await t.click(line.locator('.pos-select-btn').nth(1));
    await t.wait(800);
  });
  await t.highlight('.pos-checkout-total', 1800);

  t.chapter('Choose a customer');
  await t.say('Leave the customer as Walk-in, or search for a regular so the sale is on their record.', async () => {
    await t.click('#customer_id');
    await t.wait(1400);
  });
  await t.say('Pick the customer from the list. Their pricing and loyalty then apply.', async () => {
    await t.click(page.locator('.pos-dropdown-list .list-group-item-action').nth(1));
    await t.wait(1500);
  });

  t.chapter('Take payment');
  await t.say('Select Pay Now to open the Take Payment window.', () => t.click('button.pos-pay-btn[x-ref="payBtn"]'));
  await t.say('Choose how the customer pays. Here it is Cash.', () => t.click('[data-payment-tile="cash"]'));
  await t.say('Type the amount the customer hands over. Change Due is worked out for you.', async () => {
    await page.locator('.pos-amount-input').fill('');
    await t.type('.pos-amount-input', '1000');
    await t.wait(800);
  });
  await t.highlight('.pos-amount-input', 1500);

  t.chapter('Complete the sale');
  await t.say('Select Pay & Complete Sale.', () => t.click('button.pos-pay-btn.flex-grow-1'));
  await page.waitForSelector('[data-sale-complete]');
  await t.say('The sale is recorded. You see the sale number, the amount paid and a receipt preview.', () => t.wait(2500));
  await t.say('Print the receipt if the customer wants one, or select New Sale to serve the next customer.', async () => {
    await t.highlight('[data-sale-complete] .btn-primary.btn-lg', 1800);
  });
  await t.say('That is a complete sale from the till.', () => t.wait(800));
}

module.exports = { meta, run };
