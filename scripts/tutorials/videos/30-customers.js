const { CREDS } = require('../lib');

const meta = {
  slug: 'customers',
  title: 'Manage your customers',
  category: 'back-office',
  summary: 'Search the customer list, add a new customer and read a customer profile with its history and balance.',
  doc: '/docs/shop/people/customers',
  order: 30,
};

async function run(t) {
  const { page } = t;
  await t.sql("UPDATE sales SET status='open', paid_amount=100, due_amount=167.75 WHERE id=122");
  await t.sql("DELETE FROM customers WHERE tenant_id=1 AND email='asha.demo@example.com'");
  await t.intro('Manage your customers', 'The customer list, new customers and profiles');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('The customer list');
  await t.say('Open People, then Customers. Every customer in your book is listed here with phone, email and balance.', () => t.openMenu('People', '/customers'));
  await t.wait(1200);
  await t.say('The tabs above the table split customers by status: all, active, inactive and archived.', () => t.highlight('#customers-tabs', 2200));

  t.chapter('Search');
  await t.say('Search by name, phone, email or ID. Type part of a name and the list narrows as you type.', async () => {
    await t.type('input[placeholder^="Search by name"]', 'Neela', { delay: 120 });
    await t.settle(1200);
  });
  await t.wait(1500);
  await t.say('Tick "Customers who owe" to see only customers with an unpaid balance.', async () => {
    await page.fill('input[placeholder^="Search by name"]', '');
    await t.click('#customers-owing');
    await t.settle(1000);
  });
  await t.wait(1500);
  await t.click('#customers-owing');

  t.chapter('Add a customer');
  await t.say('To add someone new, click New customer.', () => t.click('a[href$="/customers/create"]'));
  await t.say('Only a name and one way to reach them are required. Start with the first and last name.', async () => {
    await t.type('#first_name', 'Asha', { delay: 90 });
    await t.type('#last_name', 'Demo', { delay: 90 });
  });
  await t.say('Add a phone number and an email. The customer card on the right updates as you type.', async () => {
    await t.type('input[placeholder="Phone number"]', '9000011111', { delay: 80 });
    await t.type('#email', 'asha.demo@example.com', { delay: 60 });
  });
  await t.say('Optional details such as address, customer group and credit limit can be filled in now or later.', async () => {
    await t.scroll(500, 1600);
    await t.scroll(-500, 800);
  });
  await t.say('Click Create customer to save.', () => t.click('button:has-text("Create customer")'));
  await t.wait(1800);

  t.chapter('The customer profile');
  await t.say('The new customer is at the top of the list. Click the name to open their profile.', () => t.click('#customers-table a:has-text("Asha Demo")'));
  await t.say('The profile gathers contact details, purchases, payments, credit and notes in one place.', () => t.wait(2400));

  t.chapter('History and balance');
  await t.say('For a customer who has bought before, the profile shows the balance and everything they spent.', async () => {
    await t.openMenu('People', '/customers');
    await t.click('#customers-owing');
    await t.settle(1000);
    await t.click('#customers-table a:has-text("Neela Sekhon")');
  });
  await t.say('Balance is what the customer still owes you. Collect a payment from here when they pay.', () => t.highlight('text=Balance', 2600));
  await t.say('The Purchase history tab lists every sale to this customer, so you can answer "what did they buy?"', async () => {
    await t.click('.cust-tabs button:has-text("Purchase history")');
    await t.wait(1800);
  });
  await t.wait(1200);
  await t.say('That is the customer book. Add people at the counter or here, and their history builds up with each sale.', () => t.wait(1500));
}

module.exports = { meta, run };
