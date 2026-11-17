const { CREDS } = require('../lib');

const meta = {
  slug: 'businesses',
  title: 'Manage businesses',
  category: 'super-admin',
  summary: 'Find a business, read its profile, plan usage and invoices, and see where you change its plan and status or open it as its owner.',
  doc: '/docs/platform/businesses',
  order: 41,
};

async function run(t) {
  const { page } = t;
  const search = '.fixed-table-toolbar .search input, .search-input';
  await t.intro('Manage businesses', 'Super Admin: every business and its subscription');

  t.chapter('The list');
  await t.goto('/login');
  await t.say('Sign in as the platform admin.', () => t.login(CREDS.admin.email, CREDS.admin.password));
  await t.say('Businesses lists every business on the platform with its plan, status, sales and renewal date.', async () => {
    await t.click('.app-sidebar a[href$="/tenants"]');
    await t.wait(1200);
  });
  await t.say('The Health column scores each business from recent sales, subscription and setup.', () => t.highlight('#tenants-table th[data-field="health"], #tenants-table', 2400));

  t.chapter('Search');
  await t.say('Type part of a name in the search box to narrow the list.', async () => {
    await t.type(search, 'Oasis');
    await t.settle(800);
    await t.wait(1200);
  });
  await t.say('Only matching businesses stay. Clear the box to see them all again.', async () => {
    await page.locator(search).first().fill('');
    await t.settle(800);
  });

  t.chapter('Business profile');
  await t.say('View opens the profile of one business. Here is FreshMart Grocers.', async () => {
    await t.click(page.locator('#tenants-table tr', { hasText: 'FreshMart' }).locator('a', { hasText: 'View' }));
    await t.wait(800);
  });
  await t.say('The top cards give its status, plan, sales in the last 30 days and health.', () => t.highlight('.row >> nth=0', 2400));
  await t.say('Below are its details, the owner, and the subscription: plan, billing interval and renewal date.', async () => {
    await t.highlight('#pf-details', 1600);
    await t.highlight('#pf-subscription', 1600);
  });
  await t.say('Plan usage compares what the business uses with its plan limits, such as team members and branches.', async () => {
    await t.highlight('#pf-limits', 2800);
  });
  await t.say('Further down are its branches, its team and its recent invoices.', async () => {
    await t.scroll(700, 1400);
    await t.highlight('#pf-team', 1800);
  });

  t.chapter('Change plan and status');
  await t.say('Manage is where you change a business. Scroll up and click it.', async () => {
    await t.scroll(-2000, 800);
    await t.click(page.locator('main a, .content a, a', { hasText: /^Manage$/ }));
    await t.wait(800);
  });
  await t.say('Set the plan, the status, the billing interval and the renewal date. We will not save anything here.', async () => {
    await t.highlight('#plan_id', 1400);
    await t.highlight('#status', 1800);
  });
  await t.say('Special limits let you give one business more branches, members or features than its plan.', async () => {
    await t.scroll(120, 600);
    await t.highlight('#current_period_end', 1000);
    await t.highlight('.card-body >> text=Special limits for this business', 1800);
  });

  t.chapter('Open as the owner');
  await t.say('Further down you can record a manual payment, for example a bank transfer, and see the invoices.', async () => {
    await t.scroll(650, 1400);
    await t.wait(1400);
  });
  await t.say('For support, Open as owner signs you in as the business owner. Add a reason, and everything you do is logged.', async () => {
    await t.scroll(900, 1400);
    await t.highlight('#impersonate-card', 3200);
  });
  await t.say('That is businesses. Cancel leaves the page without changing anything.', async () => {
    await t.scroll(-3000, 1000);
    await t.click(page.locator('a', { hasText: /^Cancel$/ }).first());
    await t.wait(800);
  });
}

module.exports = { meta, run };
