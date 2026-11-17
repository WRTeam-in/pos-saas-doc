const { CREDS } = require('../lib');

const meta = {
  slug: 'quotations',
  title: 'Create a quotation and turn it into a sale',
  category: 'selling',
  summary: 'Prepare a priced offer for a customer, mark it sent and accepted, then convert it into a sale at the POS.',
  doc: '/docs/shop/selling/quotations',
  order: 15,
};

async function run(t) {
  const { page } = t;
  t.sql("INSERT INTO cashier_sessions (tenant_id,branch_id,user_id,opened_at,opening_cash,status,created_at,updated_at) SELECT 1,1,1,NOW(),500,'open',NOW(),NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM (SELECT id FROM cashier_sessions WHERE tenant_id=1 AND status='open' AND user_id=1 AND branch_id=1) x)");
  t.sql("UPDATE branch_stock b JOIN product_variants v ON v.id=b.product_variant_id JOIN products p ON p.id=v.product_id SET b.quantity=80 WHERE b.tenant_id=1 AND b.branch_id=1 AND (p.name LIKE 'Amul Cheese%' OR p.name LIKE 'Bananas%' OR p.name LIKE 'Amul Butter%')");
  const addProduct = async (text) => {
    await t.type('input[placeholder^="Search product,"]', text);
    await page.waitForSelector('.search-dropdown button:visible');
    await t.wait(700);
    await t.click(page.locator('.search-dropdown button:visible').first());
    await page.locator('input[placeholder^="Search product,"]').fill('');
    await t.wait(500);
  };

  const clearToast = async () => {
    const close = page.locator(".toast-container button").first();
    if (await close.isVisible().catch(() => false)) await t.click(close, { settle: false });
    await t.wait(400);
  };
  await t.intro(meta.title, 'Offers that become sales');

  t.chapter('Quotations list');
  await t.say('Sign in and open Sales, then Quotations. Every offer you have made is listed here by status.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/quotations');
    await t.settle(800);
  });
  await t.say('Select New quotation to prepare an offer.', async () => {
    await t.click('a.btn-primary:has-text("New quotation")');
    await t.settle(800);
  });

  t.chapter('Customer');
  await t.say('Search for an existing customer by name or phone, and select them. Their pricing group applies.', async () => {
    await t.type('#customer_search', 'Aabha');
    await page.waitForSelector('.search-dropdown button:visible');
    await t.wait(800);
    await t.click(page.locator('.search-dropdown button:visible').first());
  });
  await t.say('The issue date and the Valid until date are filled in. The offer is open for seven days by default.', () => t.highlight('#valid_until', 2400));

  t.chapter('Add items');
  await t.say('Search for products by name or SKU in the Items box and select each one to add it.', async () => {
    await t.scroll(450, 900);
    await addProduct('Amul Cheese');
  });
  await t.say('Add as many products as the offer needs. Prices and taxes are filled in for you.', () => addProduct('Bananas'));
  await t.say('Change a quantity and the line total updates.', async () => {
    const qty = page.locator('input[name$="[quantity]"]').first();
    await qty.fill('');
    await t.type('input[name$="[quantity]" ] >> nth=0', '5');
    await page.keyboard.press('Tab');
    await t.wait(1500);
  });

  t.chapter('Save the quotation');
  await t.say('Check the summary at the bottom, then select Save draft.', async () => {
    await t.scroll(500, 1000);
    await t.wait(900);
    await t.scroll(-1500, 900);
    await t.click('button[type="submit"]:has-text("Save draft")');
    await page.waitForURL(/quotations\/\d+$/);
    await t.settle(800);
  });
  await t.say('The quotation has its own number and starts as a Draft. Print gives you a copy for the customer.', () => t.wait(2600));

  t.chapter('Send and accept');
  await t.say('Select Mark as sent once you have given it to the customer. It does not send an email.', async () => {
    await clearToast();
    await t.click('form:has(input[name="to"][value="sent"]) button[type="submit"]');
    await t.settle(800);
  });
  await t.say('When the customer agrees, select Accept.', async () => {
    await clearToast();
    await t.click('form:has(input[name="to"][value="accepted"]) button[type="submit"]');
    await t.settle(800);
  });
  await t.wait(1200);

  t.chapter('Convert to a sale');
  await t.say('An accepted quotation can be converted. Select Convert to sale. This needs an open register.', async () => {
    await clearToast();
    await t.click('form[action$="/convert"] button[type="submit"]');
    await t.settle(1500);
  });
  await t.say('The items land in a sale at the POS, priced as quoted, ready to take payment.', () => t.wait(3200));
  await t.say('That is the quotation from first offer to sale.', () => t.wait(800));
}

module.exports = { meta, run };
