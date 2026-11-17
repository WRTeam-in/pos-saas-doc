const { CREDS } = require('../lib');

const meta = {
  slug: 'expenses',
  title: 'Record business expenses',
  category: 'back-office',
  summary: 'Add an expense with a category, amount and payment method, then find it in the expenses list.',
  doc: '/docs/shop/expenses',
  order: 34,
};

async function run(t) {
  const { page } = t;
  const pick = async (box, option) => {
    await t.click(page.locator(`${box} + .select2-container`).first(), { settle: false });
    await t.wait(400);
    await t.click(page.locator('.select2-results__option', { hasText: option }).first(), { settle: false });
    await t.wait(400);
  };

  await t.sql("DELETE FROM expenses WHERE tenant_id=1 AND payee='Demo Repairs'");
  await t.intro('Record business expenses', 'Keep track of what the business spends');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('The expenses list');
  await t.say('Open Expenses. Every cost you have recorded is listed with its date, branch, category and amount.', () => t.openMenu('Expenses', '/expenses'));
  await t.wait(1800);
  await t.say('Search the list to find an expense by its number or payee.', () => t.highlight('input[placeholder="Number or payee"]', 1800).catch(() => t.wait(1800)));

  t.chapter('Add an expense');
  await t.say('Click Add expense to record a new cost.', () => t.click('a[href$="/expenses/create"]'));
  await t.say('The date is today by default. Enter the amount you paid.', () => t.type('#amount', '2450', { delay: 120 }));
  await t.say('Choose a category so your reports can group the costs. Maintenance suits a repair.', () => pick('#expense_category_id', 'Maintenance'));
  t.chapter('Payment details');
  await t.say('Pick the branch that bears the cost and how you paid. Cash is the default.', async () => {
    await t.highlight('#branch_id + .select2-container', 1400);
    await t.highlight('#payment_method_key + .select2-container', 1400);
  });
  await t.say('Optional: say who you paid and add a note, so you remember what it was for.', async () => {
    await t.type('#payee', 'Demo Repairs', { delay: 80 });
    await t.type('#note', 'Fix the cold-room door', { delay: 70 });
  });
  t.chapter('Save the expense');
  await t.say('You can also attach a photo or PDF of the receipt at the bottom of the form.', () => t.scroll(400, 1400));
  await t.say('Leave Paid from the till on if the cash came out of the register drawer, then click Save expense.', () => t.click('button:has-text("Save expense")'));
  await t.wait(2000);

  t.chapter('See it in the list');
  await t.say('The expense is saved and appears in the list with its own number. Search for the payee to find it.', async () => {
    await t.type('input[placeholder="Number or payee"]', 'Demo Repairs', { delay: 80 }).catch(() => {});
    await t.settle(1200);
  });
  await t.wait(1800);
  await t.say('Expenses also feed the Profit report. That is how you record what the business spends.', () => t.wait(1500));
}

module.exports = { meta, run };
