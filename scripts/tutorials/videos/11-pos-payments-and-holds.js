const { CREDS } = require('../lib');

const meta = {
  slug: 'pos-payments-and-holds',
  title: 'Coupons, split payments and held sales',
  category: 'selling',
  summary: 'Apply a coupon, pay with card, UPI or a split of methods, and park a sale to finish it later.',
  doc: '/docs/shop/selling/pos-terminal',
  order: 11,
};

async function run(t) {
  const { page } = t;
  t.sql("INSERT INTO discount_rules (tenant_id,name,code,type,value,scope,status,can_combine,created_at,updated_at) SELECT 1,'Welcome 10%','WELCOME10','percentage',10,'sale','active',1,NOW(),NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM (SELECT id FROM discount_rules WHERE tenant_id=1 AND code='WELCOME10') x)");
  t.sql("UPDATE branch_stock b JOIN product_variants v ON v.id=b.product_variant_id JOIN products p ON p.id=v.product_id SET b.quantity=80 WHERE b.tenant_id=1 AND b.branch_id=1 AND (p.name LIKE 'Amul Cheese%' OR p.name LIKE 'Bananas%' OR p.name LIKE 'Amul Butter%')");
  t.sql("UPDATE sales SET status='cancelled' WHERE tenant_id=1 AND status IN ('draft','held')");
  const add = (name) => page.locator('.pos-catalogue .category-card', { hasText: name }).locator('button.pos-add-btn:not([disabled])').first();

  await t.intro(meta.title, 'Discounts, payment methods and parked sales');

  t.chapter('Start a sale');
  await t.say('Sign in and open the POS Terminal with your register already open.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/pos');
    if (await page.locator('input[name="opening_cash"]').count()) {
      await page.locator('input[name="opening_cash"]').fill('500');
      await t.click('form[action$="/pos/cashier-sessions"] button[type="submit"]');
    }
    await page.waitForSelector('.pos-catalogue');
    await t.settle(800);
  });
  await t.say('Add the products the customer is buying.', async () => {
    await t.click(add('Amul Cheese Slices'));
    await t.click(add('Bananas'));
    await t.click(add('Amul Butter'));
  });

  t.chapter('Apply a coupon');
  await t.say('If the customer has a coupon, type the code in the Coupon Code box under the cart.', async () => {
    await t.type('input[aria-label="Coupon code"]', 'welcome10');
  });
  await t.say('Select Apply. The discount comes off the total and the code shows as a chip.', async () => {
    await t.click('[data-coupon] button[type="submit"]');
    await page.waitForSelector('[data-coupon-chip]');
    await t.wait(800);
  });
  await t.highlight('.pos-checkout-card .pos-checkout-total', 2200);

  t.chapter('Card and UPI');
  await t.say('Select Pay Now. Besides Cash you can take Card or UPI.', () => t.click('button.pos-pay-btn[x-ref="payBtn"]'));
  await t.say('Choose Card. The received amount is filled in for you, so there is no change to give.', () => t.click('[data-payment-tile="card"]'));
  await t.say('UPI works the same way. Some methods also ask for a reference, such as a slip or transaction number.', async () => {
    await t.click('[data-payment-tile="upi"]');
    await t.wait(1200);
  });

  t.chapter('Split payment');
  await t.say('When the customer wants to pay with more than one method, choose Split.', () => t.click('.pos-method-tile:has(.pos-method-name:text("Split"))'));
  await t.say('Each row is one method. Set the first to Cash and enter the part they pay in cash.', async () => {
        await page.locator('.pos-split-amount').first().fill('');
    await t.type('.pos-split-amount >> nth=0', '200');
    await page.locator('.pos-split-amount').first().blur();
    await t.wait(800);
  });
  await t.say('The second row picks up what is still to pay. Set it to UPI and add the UPI reference. It shows Fully covered.', async () => {
    await t.click(page.locator('.pos-split-row .select2-selection').nth(1));
    await t.click(page.locator('.select2-results__option', { hasText: 'UPI' }).first());
    await t.type('.pos-split-row input[placeholder*="eference"] >> visible=true', 'UPI-48213');
    await t.wait(1400);
  });
  await t.say('Select Pay & Complete Sale to record both payments on one sale.', async () => {
    await t.click('button.pos-pay-btn.flex-grow-1');
    await page.waitForSelector('[data-sale-complete]');
    await t.wait(1500);
  });
  await t.say('The confirmation lists the payment methods that were used.', () => t.wait(2000));
  await t.click('[data-sale-complete] .btn-primary.btn-lg');

  t.chapter('Hold a sale');
  await t.say('A customer forgot their wallet? Add their items as normal.', async () => {
    await page.waitForSelector('.pos-catalogue');
    await t.settle(600);
    await t.click(add('Amul Cheese Slices'));
    await t.click(add('Bananas'));
  });
  await t.say('Select Hold Sale. The cart is parked and the till is free for the next customer.', async () => {
    await t.click('button[x-ref="holdBtn"]');
    await page.waitForSelector('.pos-catalogue');
    await t.settle(800);
  });

  t.chapter('Resume it');
  await t.say('Parked sales appear in the Held Sales list. The cart is empty again.', () => t.highlight(page.locator('.card', { has: page.locator('.card-header', { hasText: 'Held Sales' }) }).last(), 2400));
  await t.say('When the customer is back, select Resume to bring the cart back as it was.', async () => {
    await t.click(page.locator('button', { hasText: 'Resume' }).first());
    await page.waitForSelector('.pos-cart-item');
    await t.settle(800);
  });
  await t.highlight('.pos-cart-card', 2200);
  await t.say('From here you can take payment as usual. That is coupons, split payments and held sales.', () => t.wait(1500));
}

module.exports = { meta, run };
