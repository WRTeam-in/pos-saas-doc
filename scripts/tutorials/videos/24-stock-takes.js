const { CREDS } = require('../lib');

const meta = {
  slug: 'stock-takes',
  title: 'Count your stock with a stock take',
  category: 'back-office',
  summary: 'Start a count, enter what is on the shelf, review the differences and approve to update your stock.',
  doc: '/docs/shop/stock/stock-takes',
  order: 24,
};

async function run(t) {
  const { page } = t;
  t.sql('DELETE FROM stock_take_lines WHERE tenant_id = 1');
  t.sql('DELETE FROM stock_takes WHERE tenant_id = 1');
  t.sql('UPDATE branch_stock SET quantity = 166 WHERE tenant_id = 1 AND branch_id = 1 AND product_variant_id = 133');
  t.sql('UPDATE branch_stock SET quantity = 107 WHERE tenant_id = 1 AND branch_id = 1 AND product_variant_id = 134');

  const pick = async (sel, text) => {
    await t.click(sel + ' + .select2 .select2-selection', { settle: false });
    if (await page.locator('.select2-container--open .select2-search__field').isVisible().catch(() => false)) await page.keyboard.type(text, { delay: 60 });
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };

  await t.intro(meta.title, 'Check the shelf against the system and fix the differences');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Start a stock take');
  await t.say('A stock take is a guided count of what is really on your shelves. Open Inventory, then Stock Takes.', () => t.openMenu('Inventory', '/stock-takes'));
  await t.say('Click New stock take.', () => t.click('a:has-text("New stock take")'));
  await t.say('Choose the branch you are counting. Camp is already selected.', () => t.highlight('#st-branch + .select2', 1800));
  await t.say('Count the whole branch, or just one category. Choose One category to keep this count short.', () => t.click('label[for="st-scope-category"]'));
  await t.say('Pick the category to count.', () => pick('#st-category', 'Stationery'));
  await t.say('Click Start counting.', () => t.click('button:has-text("Start counting")'));

  t.chapter('Count the stock');
  await t.say('The sheet lists every product to count. The system quantity is hidden, so you count what you really see.', () => t.wait(1800));
  await t.say('Type the quantity you counted for each product.', async () => {
    await t.type('input[name^="counts"] >> nth=0', '160');
    await t.type('input[name^="counts"] >> nth=1', '110');
  });
  await t.say('Click Save counts. You can leave and come back later, saved counts are kept.', () => t.click('button:has-text("Save counts")'));
  await t.wait(1500);

  t.chapter('Review the differences');
  await t.say('When everything is counted, click Review differences.', () => t.click('a:has-text("Review differences")'));
  await t.say('Here you see the shortage and the surplus, and each difference by product.', () => t.wait(1500));
  await t.scroll(300, 1000);
  await t.wait(1200);
  await t.scroll(-300, 600);

  t.chapter('Approve');
  await t.say('If the numbers look right, click Approve and update stock. Your stock now matches the shelf.', () => t.click(page.locator('button:has-text("Approve")').first()));
  await t.wait(2500);

  t.chapter('Check the result');
  await t.say('The stock take is now finished. Open Stock levels to see the corrected quantities.', () => t.openMenu('Inventory', '/inventory'));
  await t.say('Search for the pens.', () => t.type('.search-input', 'Reynolds'));
  await t.wait(2200);
  await t.say('Run a stock take regularly to catch loss, damage and counting mistakes early.', () => t.wait(1200));
}

module.exports = { meta, run };
