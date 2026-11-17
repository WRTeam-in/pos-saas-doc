const { CREDS } = require('../lib');

const meta = {
  slug: 'product-overview',
  title: 'Product overview',
  category: 'getting-started',
  summary: 'A quick tour of the whole product: sign in, the dashboard, selling, stock, customers and reports.',
  doc: '/docs/shop/overview',
  order: 1,
};

async function run(t) {
  const { page } = t;
  await t.intro('Product overview', 'A quick tour of POS SaaS');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Open the sign-in page and enter your email and password.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Dashboard');
  if (process.env.TUTORIAL_DASH_30) await t.goto('/dashboard?range=30d');
  await t.say('After signing in you land on the dashboard: today\'s sales, stock alerts and recent activity at a glance.', () => t.wait(2200));
  await t.say('Scroll down for charts, best sellers and the latest sales.', () => t.scroll(700, 2200));
  await t.scroll(-700, 900);

  t.chapter('The menu');
  const openFrom = (name, href) => t.openMenu(name, href);
  await t.say('Everything you need is in the menu on the left, grouped by what you do.', async () => {
    await t.highlight('.app-sidebar nav', 2600);
  });

  t.chapter('Selling');
  await t.say('Sales has the POS terminal where your cashiers ring up customers, plus sales history, refunds and shifts.', () => openFrom('Sales', '/pos'));
  await t.wait(1800);

  t.chapter('Inventory');
  await t.say('Inventory is your catalogue and stock: products, categories, brands and live stock levels for every branch.', () => openFrom('Inventory', '/products'));
  await t.wait(1200);
  await t.say('Stock levels show what is on every shelf and what is running low.', () => openFrom('Inventory', '/inventory'));
  await t.wait(1200);

  t.chapter('People');
  await t.say('People holds your customers, your team and the roles that decide who can do what.', () => openFrom('People', '/customers'));
  await t.wait(1400);

  t.chapter('Reports');
  await t.say('Reports turn your sales into answers: takings, payments, profit and what to reorder.', () => openFrom('Reports', '/reports/sales'));
  await t.wait(1800);

  t.chapter('Settings');
  await t.say('Settings is where you set your business name, currency, tax, receipts and everything else.', () => t.openMenu('System', '/settings'));
  await t.wait(2000);
  await t.say('That is the whole product. The next tutorials go through each area step by step.', () => t.wait(1500));
}

module.exports = { meta, run };
