const { CREDS } = require('../lib');

const meta = {
  slug: 'plans-and-billing',
  title: 'Plans, invoices and payments',
  category: 'super-admin',
  summary: 'See what a plan controls, follow invoices across all businesses, and find the payment gateway and billing settings.',
  doc: '/docs/platform/money/plans',
  order: 42,
};

async function run(t) {
  const { page } = t;
  await t.intro('Plans, invoices and payments', 'Super Admin: how the platform earns money');

  t.chapter('Plans');
  await t.say('Sign in as the platform admin.', () => t.login(CREDS.admin.email, CREDS.admin.password));
  await t.say('Plans are what you sell. Each has a monthly and a yearly price. The Trial plan is what new businesses start on.', async () => {
    await t.click('.app-sidebar a[href$="/plans"]');
    await t.wait(1200);
  });

  t.chapter('What a plan controls');
  await t.say('Click Edit on Starter to see what a plan controls.', async () => {
    await t.click('a[href$="/plans/2/edit"]');
    await t.wait(800);
  });
  await t.say('The name, code, currency, prices and the number of trial days.', () => t.highlight('#price_monthly', 2400));
  await t.say('Limits cap branches, team members and products. Leave a limit empty and it is unlimited.', async () => {
    await t.scroll(300, 800);
    await t.highlight('input[type=number][name^="values"] >> nth=0', 2400);
  });
  await t.say('The tick boxes switch features on or off for this plan, such as coupons, gift cards or SMS.', async () => {
    await t.highlight('input[type=checkbox][name^="values"] >> nth=1', 2400);
    await t.wait(800);
  });
  await t.say('We leave without saving. Cancel goes back to the list.', async () => {
    await t.scroll(-800, 600);
    await t.click(page.locator('a', { hasText: /^Cancel$/ }).first());
  });

  t.chapter('Invoices');
  await t.say('Invoices lists every payment from every business, with its plan, amount, status and gateway.', async () => {
    await t.click('.app-sidebar a[href$="/invoices"]');
    await t.wait(1500);
  });
  await t.say('Tabs filter by status: pending, paid, failed or void. Here are the paid ones.', async () => {
    await t.click(page.locator('.nav-tabs a, .nav-link, button', { hasText: /^Paid$/ }).first());
    await t.wait(1200);
      });
  await t.say('You can also filter by gateway, by mode, by date, or search by business name.', async () => {
    await t.click(page.locator('.nav-tabs a, .nav-link, button', { hasText: /^All statuses$/ }).first());
    await t.highlight('select >> nth=0', 1600);
    await t.type('input[placeholder*="business"]', 'Urban');
    await t.settle(800);
  });
  await t.say('Manage opens one invoice. Void cancels it and can take back the days it added, so use it with care.', async () => {
    await page.locator('input[placeholder*="business"]').first().fill('');
    await t.settle(800);
    await t.highlight('text=Manage >> nth=0', 2400);
  });

  t.chapter('Payment gateways');
  await t.say('Payments, under Settings, is where you connect the gateways your businesses pay through.', async () => {
    await t.click('.app-sidebar a[href$="/settings"]');
    await t.click('a[href$="/payments"]');
    await t.wait(1000);
  });
  await t.say('Stripe, Razorpay, Flutterwave and PayPal each have an on or off switch and their own keys.', async () => {
    await t.click(page.locator('a, button', { hasText: 'Razorpay' }).first());
    await t.wait(900);
  });
  await t.say('Each gateway has a Live and a Test mode, and shows the webhook address to paste into its dashboard.', async () => {
    await t.click(page.locator('a, button', { hasText: 'Stripe' }).first());
    await t.highlight('text=Webhook URL >> xpath=..', 2800);
  });

  t.chapter('Billing settings');
  await t.say('Billing sets the grace period after a failed renewal, the reminder days and the invoice number prefix.', async () => {
    await t.click('a[href$="/settings/billing"]');
    await t.highlight('form .card, form', 3200);
  });
  await t.say('That is plans and billing. Plans set what a business gets, invoices record what it paid.', () => t.wait(1500));
}

module.exports = { meta, run };
