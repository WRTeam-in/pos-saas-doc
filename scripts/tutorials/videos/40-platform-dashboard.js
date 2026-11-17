const { CREDS } = require('../lib');

const meta = {
  slug: 'platform-dashboard',
  title: 'The platform dashboard',
  category: 'super-admin',
  summary: 'Sign in to the Super Admin panel and read the dashboard: businesses, sales, subscriptions, monthly recurring revenue and recent activity.',
  doc: '/docs/platform/dashboard',
  order: 40,
};

async function run(t) {
  const { page } = t;
  await t.intro('The platform dashboard', 'Super Admin: how the whole platform is doing');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('The platform owner signs in on the same page as everyone else, with the admin email and password.', () => t.login(CREDS.admin.email, CREDS.admin.password));
  await t.say('You land in the Super Admin panel. Its menu is short: one entry for each job.', () => t.highlight('.app-sidebar nav', 2600));

  t.chapter('Choose a period');
  await t.say('The dashboard covers every business at once. Pick the period with the buttons at the top right.', async () => {
    await t.highlight('.dash-range', 1800);
    await t.click(page.locator('.dash-range-btn', { hasText: '90 days' }));
  });
  await t.say('The numbers below are compared with the period before, so you see growth or decline.', async () => {
    await t.click(page.locator('.dash-range-btn', { hasText: '30 days' }));
  });

  t.chapter('Key numbers');
  await t.say('The top cards count new and active businesses, plus the sales and sales value rung up by all of them.', async () => {
    await t.highlight('.dash-card >> nth=0', 1200);
    await t.highlight('.dash-card >> nth=2', 1600);
  });

  t.chapter('Needs attention');
  await t.say('Needs attention lists businesses close to a plan limit or with a billing problem, so you can act early.', () => t.highlight('#pd-alerts', 2800));
  await t.say('Health scores each business from recent sales, subscription state and setup: healthy, at risk or critical.', () => t.highlight('#pd-health', 2800));

  t.chapter('Subscriptions and revenue');
  await t.scroll(380, 1000);
  await t.say('Businesses and Subscriptions show how many are trialling, active, past due or expired.', async () => {
    await t.highlight('.dash-card:has-text("Subscriptions")', 2400);
  });
  await t.say('Monthly recurring revenue adds up active paid plans, with yearly plans counted as a twelfth.', async () => {
    await t.highlight('.dash-card:has-text("Monthly recurring revenue")', 2800);
  });

  t.chapter('Charts and rankings');
  await t.say('Scroll down for the sales trend, plan mix and the top businesses by sales.', async () => {
    await t.scroll(560, 1600);
    await t.wait(1200);
  });
  await t.say('Recent sign-ups, quiet businesses, failed payments and trials ending soon each get a card.', async () => {
    await t.scroll(520, 1600);
    await t.wait(1200);
  });

  t.chapter('Recent activity');
  await t.say('Recent activity shows what admins did lately. The Audit log link opens the full history.', async () => {
    await t.scroll(900, 1400);
    await t.highlight('#pd-activity', 2400);
  });
  await t.scroll(-3000, 1200);
  await t.say('That is the dashboard. Next, the Businesses list.', () => t.wait(1500));
}

module.exports = { meta, run };
