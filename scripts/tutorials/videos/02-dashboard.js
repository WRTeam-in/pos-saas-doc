const { CREDS } = require('../lib');

const meta = {
  slug: 'dashboard',
  title: 'Your dashboard',
  category: 'getting-started',
  summary: 'Read the dashboard: sales, profit and orders for any period or branch, trends, best sellers and what needs attention.',
  doc: '/docs/shop/getting-started/dashboard',
  order: 2,
};

async function run(t) {
  const { page } = t;
  const card = (title) => page.locator('.card', { hasText: title }).first();

  await t.intro('Your dashboard', 'Read your shop at a glance');

  t.chapter('Sign in');
  await t.say('Sign in and the dashboard is the first thing you see.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('The numbers');
  await t.say('The top row shows revenue, gross profit, orders, average basket, items sold and refunds.', () => t.highlight(page.locator('.card', { hasText: 'Revenue' }).first(), 2600));
  await t.say('Each card compares with the period before, so you can see if you are up or down.', () => t.highlight(page.locator('.card', { hasText: 'Gross profit' }).first(), 2400));

  t.chapter('Pick a period');
  await t.say('Use these buttons to switch between today, 7, 30 and 90 days.', () => t.click(page.locator('a', { hasText: '30 days' }).first()));
  await t.wait(1400);
  await t.say('Everything on the page follows the period you choose.', () => t.click(page.locator('a', { hasText: '7 days' }).first()));

  t.chapter('Pick a branch');
  await t.say('If you have several branches, filter the whole dashboard to one of them, here Camp.', () => t.choose('#dashBranch', { label: 'Camp' }));
  await t.wait(1200);
  await t.say('Switch back to all branches to see the whole business.', () => t.choose('#dashBranch', { index: 0 }));

  t.chapter('Trends');
  await t.say('Sales trend draws this period against the one before it.', () => t.highlight(card('Sales trend'), 2800));
  await t.say('Sales by category shows where your money comes from.', () => t.highlight(card('Sales by category'), 2400));
  await t.say('Busiest hours tells you when to have more people at the till.', () => t.highlight(card('Busiest hours'), 2600));

  t.chapter('Recent activity');
  await t.say('Recent sales lists the latest sales, with a link to the full history.', () => t.highlight(card('Recent Sales'), 2400));
  await t.say('Top products shows what is selling best.', () => t.highlight(card('Top Products'), 2400));

  t.chapter('Needs attention');
  await t.say('Inventory health and Low stock warn you before you run out.', () => t.highlight(card('Low stock'), 2800));
  await t.say('Open shifts shows which tills are open right now.', () => t.highlight(card('Open shifts'), 2400));

  t.chapter('Customers and branches');
  await t.say('Customer insights, the sales breakdown and the branch comparison round out the picture.', async () => {
    await t.highlight(card('Customer insights'), 2200);
    await t.highlight(card('Branch comparison'), 2200);
  });
  await t.say('Open Reports from here whenever you want to go deeper.', () => t.wait(1500));
}

module.exports = { meta, run };
