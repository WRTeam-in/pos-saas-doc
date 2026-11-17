const { CREDS } = require('../lib');

const meta = {
  slug: 'stock-transfers',
  title: 'Move stock between branches',
  category: 'back-office',
  summary: 'Transfer products from one branch to another and check the stock at both ends.',
  doc: '/docs/shop/stock/stock-transfers',
  order: 23,
};

async function run(t) {
  const { page } = t;
  const NAME = 'Masala Chai Mix 250g';
  t.sql(`UPDATE branch_stock bs JOIN product_variants v ON v.id = bs.product_variant_id JOIN products p ON p.id = v.product_id SET bs.quantity = IF(bs.branch_id = 1, 40, 0) WHERE p.name = '${NAME}' AND bs.branch_id IN (1, 2)`);

  const pick = async (sel, text) => {
    await t.click(sel + ' + .select2 .select2-selection', { settle: false });
    if (await page.locator('.select2-container--open .select2-search__field').isVisible().catch(() => false)) await page.keyboard.type(text, { delay: 60 });
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };

  await t.intro(meta.title, 'Send stock from one branch to another');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Check the source branch');
  await t.say('Say Kothrud has run out of Masala Chai Mix. First check what Camp, your current branch, holds.', async () => {
    await t.openMenu('Inventory', '/inventory');
    await t.type('.search-input', 'Masala Chai');
  });
  await t.highlight('#inventory-table tbody tr:first-child', 2000);

  t.chapter('Start a transfer');
  await t.say('Open Stock Transfers. The list shows every transfer between your branches.', () => t.openMenu('Inventory', '/stock-transfers'));
  await t.say('Click Add Stock Transfer.', () => t.click('a:has-text("Add Stock Transfer")'));
  await t.say('From branch is Camp, the branch you are in. Choose Kothrud as the branch that receives the stock.', () => pick('#to_branch_id', 'Kothrud'));
  await t.say('Notes are optional. They help whoever opens the transfer later.', () => t.type('#notes', 'Kothrud ran out of chai mix'));

  t.chapter('Add the products');
  await t.say('Click Add Item to add a product to the transfer.', () => t.click('[data-st-item-add]'));
  await t.say('Choose the product to move.', () => pick('[data-st-row] select[data-field="product_variant_id"]', NAME));
  await t.say('Enter how many to send. You cannot send more than the source branch has.', () => t.type('[data-st-row] input[data-field="quantity"]', '15'));
  await t.wait(1200);

  t.chapter('Save the transfer');
  await t.say('Click Save. The stock moves straight away: there is nothing to confirm at the other end.', () => t.click(page.locator('button:has-text("Save")').last()));
  await t.wait(1800);
  await t.say('Each transfer gets a TRF code. Open it to see the branches, the products and the quantities.', () => t.click('#stock-transfers-table tbody tr:first-child a'));
  await t.wait(2200);

  t.chapter('Check the receiving branch');
  await t.say('Now switch to Kothrud with the branch menu at the top.', () => pick('select[name="branch_id"]', 'Kothrud'));
  await t.wait(800);
  await t.say('In Stock levels, the 15 units have arrived at Kothrud.', async () => {
    await t.openMenu('Inventory', '/inventory');
    await t.type('.search-input', 'Masala Chai');
  });
  await t.highlight('#inventory-table tbody tr:first-child', 2200);
  await t.say('A transfer cannot be undone. To fix a mistake, send the stock back with a transfer the other way.', () => t.wait(1200));
}

module.exports = { meta, run };
