const { CREDS } = require('../lib');

const meta = {
  slug: 'reports',
  title: 'Read your reports',
  category: 'back-office',
  summary: 'Use the Sales, Payments, Profit and Inventory reports: filter by date and branch, read the totals and export to CSV.',
  doc: '/docs/shop/reports/overview',
  order: 32,
};

async function run(t) {
  const { page } = t;
  await t.intro('Read your reports', 'Sales, payments, profit and stock');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Sales report');
  await t.say('Open Reports, then Sales Report. It lists every sale in the period you choose.', () => t.openMenu('Reports', '/reports/sales'));
  await t.say('The cards on top give the totals: revenue, number of sales, average sale value, refunds and net revenue.', () => t.highlight('text=Avg Sale Value', 2800));
  await t.say('Below them is each sale with its customer, items, discount, tax and total.', () => t.scroll(450, 1800));
  await t.scroll(-450, 700);

  t.chapter('Filter by date and branch');
  await t.say('Use the shortcuts to pick a period quickly. Last 7 days narrows the report to the past week.', () => t.click('a:has-text("Last 7 days")'));
  await t.wait(1200);
  await t.say('Or enter your own From and To dates, then click Apply.', async () => {
    await t.click('input[name="from"]', { settle: false });
    await page.fill('input[name="from"]', '2026-10-01');
    await t.wait(500);
    await t.click('input[name="to"]', { settle: false });
    await page.fill('input[name="to"]', '2026-10-15');
    await t.wait(800);
    await t.click('button:has-text("Apply")');
  });
  await t.wait(1200);
  await t.say('The Branch filter shows one branch only. Choose Camp and apply to see just that branch.', async () => {
    await t.point('select[name="branch"]', { ring: true });
    await page.selectOption('select[name="branch"]', { label: 'Camp' });
    await t.wait(700);
    await t.click('button:has-text("Apply")');
  });
  await t.wait(1500);

  t.chapter('Payments report');
  await t.say('The Payments Report shows how customers paid: the total collected and a split by method, such as card and cash.', () => t.openMenu('Reports', '/reports/payments'));
  await t.wait(1200);
  await t.say('Use it to check the till and the bank against what you expect to receive.', () => t.highlight('text=Total Collected', 2400));

  t.chapter('Profit report');
  await t.say('The Profit Report compares revenue with the cost of goods sold, so you see gross profit and margin.', () => t.openMenu('Reports', '/reports/profit'));
  await t.say('Last 30 days gives a good picture of how the month is going.', () => t.click('a:has-text("Last 30 days")'));
  await t.say('Revenue minus cost of goods gives gross profit. The table shows the same figures for each sale.', () => t.highlight('text=Gross Profit', 2800));

  t.chapter('Inventory report');
  await t.say('The Inventory Report values your stock: stock value, SKU count, low stock and out of stock items.', () => t.openMenu('Reports', '/reports/inventory'));
  await t.wait(1500);
  await t.say('It lists each product per branch with its quantity, cost price and value.', () => t.scroll(450, 1800));
  await t.scroll(-450, 700);

  t.chapter('Export');
  await t.say('Every report has an Export CSV button. Click it to download the figures and open them in a spreadsheet.', async () => {
    await t.highlight('a:has-text("Export CSV")', 1200);
    await t.click('a:has-text("Export CSV")', { settle: false });
    await t.wait(1500);
  });
  await t.say('That is the reporting set. Pick a period, pick a branch, read the totals, export when you need them elsewhere.', () => t.wait(1200));
}

module.exports = { meta, run };
