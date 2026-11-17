const { CREDS } = require('../lib');

const meta = {
  slug: 'business-settings',
  title: 'Business settings',
  category: 'back-office',
  summary: 'Tour the Settings page: business details, currency and tax, receipts, and where the other options live.',
  doc: '/docs/shop/settings/general-settings',
  order: 35,
};

async function run(t) {
  const { page } = t;
  const section = (id) => t.click(`[data-settings-id="${id}"]`);

  await t.intro('Business settings', 'Name, currency, tax and receipts in one place');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Open Settings');
  await t.say('Open System, then Settings. The list on the left holds every section, grouped by what it does.', () => t.openMenu('System', '/settings'));
  await t.highlight('.settings-nav', 2200);

  t.chapter('Business details');
  await t.say('Business holds your trading name, legal name, phone, email, website and address.', () => section('business'));
  await t.wait(1200);
  await t.say('These details appear on your receipts and invoices, so keep them current.', () => t.scroll(350, 1600));
  await t.scroll(-350, 600);

  t.chapter('Currency and tax');
  await t.say('Money & tax sets your currency and your default tax rate.', () => section('money'));
  await t.wait(1200);
  await t.say('Tax registration, the default rate and whether prices include tax are all set here.', () => t.scroll(350, 1800));
  await t.scroll(-350, 600);

  t.chapter('Receipts');
  await t.say('Receipt template controls what a printed receipt looks like: paper size, header and footer text.', () => section('receipt'));
  await t.wait(1000);
  await t.say('Switches choose what to print, such as the logo, customer, cashier, tax breakdown or a barcode.', () => t.scroll(400, 1800));
  await t.wait(1200);
  await t.scroll(-400, 600);

  t.chapter('Everything else');
  await t.say('Cashier (POS) and Payments hold the checkout rules for your registers.', async () => {
    await section('cashier');
    await t.wait(900);
    await section('payments');
  });
  await t.say('Some options open their own pages: Payment Methods, Loyalty points and Gift cards.', async () => {
    await section('payment-methods');
    await t.wait(1400);
  });
  await t.say('Messaging has email and SMS settings and templates. Daily summary sends you a recap of the day.', async () => {
    await section('email-settings');
    await t.wait(1400);
    await section('daily-summary');
    await t.wait(1200);
  });
  await t.say('That is Settings. Change a section, then use Save settings at the top to apply it.', () => t.wait(1500));
}

module.exports = { meta, run };
