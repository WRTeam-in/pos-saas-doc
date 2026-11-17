const { CREDS } = require('../lib');

const meta = {
  slug: 'stock-levels-and-adjustments',
  title: 'Check and adjust stock',
  category: 'back-office',
  summary: 'Read the stock levels page, find low and out of stock items, and correct a count with a reason.',
  doc: '/docs/shop/stock/stock-levels',
  order: 22,
};

async function run(t) {
  const { page } = t;
  t.sql("UPDATE branch_stock SET quantity = 1 WHERE tenant_id = 1 AND branch_id = 1 AND product_variant_id = 22");

  const pick = async (sel, text) => {
    await t.click(sel + ' + .select2 .select2-selection', { settle: false });
    if (await page.locator('.select2-container--open .select2-search__field').isVisible().catch(() => false)) await page.keyboard.type(text, { delay: 60 });
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };
  const tab = (label) => page.locator('#inventory-tabs [data-filter-value]', { hasText: label }).first();

  await t.intro(meta.title, 'See what is on the shelf and fix the numbers');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Stock levels');
  await t.say('Open Inventory, then Stock levels. It lists every product and how many you have in the current branch.', () => t.openMenu('Inventory', '/inventory'));
  await t.say('The branch is shown at the top of the screen. Switch it to see another branch.', () => t.highlight('select[name="branch_id"], header button:has-text("Camp")', 2200));
  await t.say('Each row has a status: Healthy, Low or Out of stock.', () => t.highlight('#inventory-table thead th:nth-child(4)', 2000));

  t.chapter('Low and out of stock');
  await t.say('The Low tab lists items that are running short, so you know what to reorder.', () => t.click(tab('Low')));
  await t.wait(1800);
  await t.say('The Out tab shows items that have run out completely.', () => t.click(tab('Out')));
  await t.wait(1800);
  await t.say('Go back to All stock to see everything.', () => t.click(tab('All stock')));

  t.chapter('Filter and search');
  await t.say('Narrow the list by category, brand or unit.', () => pick('[data-param="category"]', 'Snacks'));
  await t.wait(1800);
  await t.click('button:has-text("Clear filters")');
  await t.say('Or search by product name or SKU.', () => t.type('.search-input', 'Aloo'));
  await t.wait(1500);

  t.chapter('Adjust stock');
  await t.say('This product shows Low. Say a new delivery just arrived. Click Adjust on its row.', () => t.click('#inventory-table tbody tr:first-child button:has-text("Adjust")'));
  await t.wait(800);
  await t.say('Add stock is selected. Enter how many to add, not the new total.', () => t.type('.modal.show input[type="number"]', '30'));
  await t.say('Every change needs a reason. It is saved in the stock history.', () => t.type('.modal.show input[name="reason"]', 'Restock from supplier'));
  await t.wait(800);
  await t.say('Click Adjust stock to apply the change.', () => t.click('.modal.show button[type="submit"]'));
  await t.wait(2200);

  t.chapter('See the result');
  await t.say('The stock now shows 31 and the status has changed from Low to Healthy.', () => t.type('.search-input', 'Aloo'));
  await t.wait(1800);
  await t.say('Open Stock Adjustments for the full history of every change, with who made it and why.', () => t.openMenu('Inventory', '/stock-adjustments'));
  await t.wait(2600);
  await t.say('Use Stock levels to watch your shelves, and adjustments to keep the numbers true.', () => t.wait(1200));
}

module.exports = { meta, run };
