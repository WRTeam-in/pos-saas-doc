const { CREDS } = require('../lib');

const meta = {
  slug: 'products',
  title: 'Add and manage products',
  category: 'back-office',
  summary: 'Browse the product list, search and filter, add a simple product with SKU, barcode, price and starting stock, then edit it.',
  doc: '/docs/shop/catalogue/products',
  order: 20,
};

async function run(t) {
  const { page } = t;
  const NAME = 'Masala Chai Mix 250g';
  t.sql(`DELETE FROM products WHERE name='${NAME}'`);

  await t.intro(meta.title, 'Your catalogue, from the list to a new product');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('The product list');
  await t.say('Open Inventory, then Products. Every item you sell is listed here with its price, stock and status.', () => t.openMenu('Inventory', '/products'));
  await t.say('The tabs at the top split the catalogue into All, Active, Draft and Archived products.', () => t.highlight('#products-tabs', 2200));
  await t.say('Switch to Grid to see the products as cards with their pictures.', () => t.click(page.locator('[data-view-toggle="grid"]:visible').first()));
  await t.wait(1800);
  await t.say('Switch back to List for a compact table.', () => t.click(page.locator('[data-view-toggle="list"]:visible').first()));

  t.chapter('Search and filter');
  await t.say('Search by name, SKU or barcode. Type a few letters and the list narrows down.', () => t.type('.search-input', 'milk'));
  await t.wait(1800);
  await page.fill('.search-input', '');
  await page.keyboard.press('Enter');
  await t.settle();
  const pick = async (sel, text) => {
    await t.click(sel + ' + .select2 .select2-selection', { settle: false });
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };
  await t.say('Filters narrow the list by category, brand, unit, product type or stock level.', () => pick('[data-param="stock"]', 'Out of stock'));
  await t.wait(1800);
  await pick('[data-param="stock"]', 'All stock');

  t.chapter('Add a product');
  await t.say('To add a product, click New product.', () => t.click('[data-tour="product-add"]'));
  await t.say('Start with the name. Keep it the way customers and cashiers will recognise it.', () => t.type('#name', NAME));
  await t.say('A simple product has a single price and stock count. Variable products come later.', () => t.highlight('label[for="type_simple"]', 1800));
  await t.say('Click the sparkle button to generate a SKU automatically.', () => t.click('[data-sku-generate*="sku"]'));
  await t.say('Do the same for the barcode, if the product has none printed on its packaging.', () => t.click('[data-sku-generate*="barcode"]'));
  await t.say('Enter what the product costs you and how many you start with.', async () => {
    await t.type('#cost_price', '120');
    await t.type('#starting_quantity', '40');
  });
  await t.say('Set the selling price. This is what customers pay at the till.', () => t.type('#base_price', '165'));
  await t.say('Choose the tax group that applies to this product.', () => pick('#tax_group_id', 'Standard'));
  await t.say('Pick the category the product belongs to.', () => pick('#category_id', 'Beverages'));
  await t.say('Then the sub category, if there is one.', () => pick('#subcategory_id', 'Tea & Coffee'));
  await t.wait(800);

  t.chapter('Save the product');
  await t.say('Click Save product. Use Save as draft instead if it is not ready to sell.', () => t.click(page.locator('button:has-text("Save product")').last()));
  await t.wait(1800);

  t.chapter('Open and edit');
  await t.say('Find your new product in the list by searching for it.', async () => {
    await t.goto('/products');
    await t.type('.search-input', 'Masala');
  });
  await t.wait(1500);
  await t.say('Click the eye icon to open the product and see its details.', () => t.click('#products-table tbody tr:first-child a[title="View"]'));
  await t.wait(2200);
  await t.say('Click Edit to change anything: price, tax, category or stock settings.', () => t.click('a:has-text("Edit")'));
  await t.say('Raise the selling price a little.', async () => {
    await page.fill('#base_price', '');
    await t.type('#base_price', '170');
  });
  await t.say('Save the changes.', () => t.click(page.locator('button:has-text("Save product")').last()));
  await t.wait(2200);
  await t.say('Your product is ready to sell. Next, organise the catalogue with categories, brands and units.', () => t.wait(1500));
}

module.exports = { meta, run };
