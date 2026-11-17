const { CREDS } = require('../lib');

const meta = {
  slug: 'sales-history',
  title: 'Find and review past sales',
  category: 'selling',
  summary: 'Search and filter the Sales list, open a sale to see its items and payments, and view the receipt.',
  doc: '/docs/shop/selling/sales',
  order: 12,
};

async function run(t) {
  const { page } = t;
  const pick = async (param, text) => {
    await t.click(`select[data-param="${param}"] + .select2 .select2-selection`);
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
    await t.settle(600);
  };

  await t.intro(meta.title, 'Search, filter and open any sale');

  t.chapter('The Sales list');
  await t.say('Sign in and open Sales. Every sale your shop has made is listed here, newest first.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/sales');
    await t.settle(800);
  });
  await t.say('Each row shows the sale number, customer, branch, cashier, totals and its status.', () => t.scroll(260, 1800));
  await t.scroll(-260, 600);

  t.chapter('Status tabs');
  await t.say('The tabs split the list by status. Select Completed to see only finished sales.', () => t.click('#sales-tabs >> text=Completed'));
  await t.wait(1200);
  await t.say('Cancelled shows sales that were voided, and Open shows sales still waiting for payment.', async () => {
    await t.click('#sales-tabs >> text=Cancelled');
    await t.wait(1400);
    await t.click('#sales-tabs >> text=Completed');
  });

  t.chapter('Search and filter');
  await t.say('Type a sale number, a customer name or a phone number in the search box.', async () => {
    await t.type('input[placeholder="Search by sale number, customer or phone"]', 'Aabha');
    await t.settle(1500);
    await t.wait(2600);
  });
  await page.locator('input[placeholder="Search by sale number, customer or phone"]').fill('');
  await t.settle(1000);
  await t.say('Filters narrow the list by payment status, branch, cashier, payment method or date range.', async () => {
    await pick('method', 'UPI');
    await t.wait(1600);
  });
  await t.say('Choose All payment methods to clear a filter again.', async () => {
    await pick('method', 'All payment methods');
    await t.wait(800);
  });

  t.chapter('Open a sale');
  await t.say('Select View on a row to open the sale.', async () => {
    await t.click(page.locator('#sales-table a', { hasText: 'View' }).first());
    await t.settle(800);
  });
  await t.say('The sale page shows the items, the totals and who sold it.', () => t.wait(2200));
  await t.say('Scroll down for the payments that were taken and any refunds against the sale.', () => t.scroll(520, 2400));
  await t.scroll(-520, 700);

  t.chapter('The receipt');
  await t.say('Select Receipt to see the printable receipt for this sale.', () => t.click('a.btn-primary:has-text("Receipt")'));
  await t.say('Select Print for a paper copy whenever a customer asks for one again.', () => t.wait(3200));
  await t.say('That is how you find any past sale and its receipt.', () => t.wait(1000));
}

module.exports = { meta, run };
