const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { CREDS } = require('../lib');

function tilePng(file, w = 600, h = 600, rgb = [217, 119, 6]) {
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const body = Buffer.concat([Buffer.from(type), data]); const sum = Buffer.alloc(4); sum.writeUInt32BE(crc(body)); return Buffer.concat([len, body, sum]); };
  const head = Buffer.alloc(13); head.writeUInt32BE(w, 0); head.writeUInt32BE(h, 4); head[8] = 8; head[9] = 2;
  const row = Buffer.concat([Buffer.from([0]), Buffer.from(Array.from({ length: w }, () => rgb).flat())]);
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', head), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
}

const meta = {
  slug: 'categories-brands-units',
  title: 'Organise with categories, brands and units',
  category: 'back-office',
  summary: 'Create a category, a brand and a unit, then use them on a new product.',
  doc: '/docs/shop/catalogue/categories-brands-units',
  order: 21,
};

async function run(t) {
  const { page } = t;
  const CAT = 'Ready Mixes';
  const BRAND = 'Chai Corner';
  const UNIT = 'Sachet';
  const PRODUCT = 'Instant Chai Sachets';
  const clean = (q) => { try { t.sql(q); } catch (e) { /* nothing to clean */ } };
  clean(`DELETE pv FROM product_variants pv JOIN products p ON p.id = pv.product_id WHERE p.name='${PRODUCT}'`);
  clean(`DELETE FROM products WHERE name='${PRODUCT}'`);
  clean(`DELETE FROM categories WHERE name='${CAT}'`);
  clean(`DELETE FROM brands WHERE name='${BRAND}'`);
  clean(`DELETE FROM units WHERE name='${UNIT}'`);

  const pick = async (sel, text) => {
    await t.click(sel + ' + .select2 .select2-selection', { settle: false });
    const box = page.locator('.select2-container--open .select2-search__field');
    if (await box.isVisible().catch(() => false)) await page.keyboard.type(text, { delay: 60 });
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };

  await t.intro(meta.title, 'Group your products so they are easy to find and report on');

  t.chapter('Sign in');
  await t.goto('/login');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Categories');
  await t.say('Categories group your products, like Beverages or Dairy. Open Inventory, then Categories.', () => t.openMenu('Inventory', '/categories'));
  await t.say('Each category shows its parent and how many products it holds.', () => t.highlight('#categories-table thead', 2200));
  await t.say('Click New category to add one.', () => t.click('a:has-text("New category")'));
  await t.say('Give the category a name.', () => t.type('#name', CAT));
  await t.say('Leave the parent empty for a top level category, or pick one for a sub category.', () => t.highlight('#parent_id + .select2', 2200));
  await t.say('Add a picture. It is shown on the category card.', async () => {
    const img = path.join(os.tmpdir(), 'ready-mixes.png');
    tilePng(img);
    await t.point('button:has-text("Select image")');
    await page.setInputFiles('#image', img);
    await t.wait(800);
  });
  await t.say('Click Save category.', () => t.click(page.locator('button:has-text("Save category")').first()));
  await t.wait(1200);

  t.chapter('Brands');
  await t.say('Brands tell customers and reports who makes a product. Open Brands and click New brand.', async () => {
    await t.openMenu('Inventory', '/brands');
    await t.click('a:has-text("New brand")');
  });
  await t.say('Type the brand name and save it.', async () => {
    await t.type('#name', BRAND);
    await t.click(page.locator('button:has-text("Save brand")').first());
  });
  await t.wait(1200);

  t.chapter('Units');
  await t.say('Units say how a product is counted or measured. Open Units and click New unit.', async () => {
    await t.openMenu('Inventory', '/units');
    await t.click('a:has-text("New unit")');
  });
  await t.say('Enter a name and a short name. The short name appears next to prices and stock.', async () => {
    await t.type('#name', UNIT);
    await t.type('#short_name', 'sachet');
  });
  await t.say('Count is for things you count one by one. Allow decimals only for weighed goods.', () => t.highlight('#type + .select2, #type', 2400));
  await t.say('Save the unit.', () => t.click(page.locator('button:has-text("Save unit")').first()));
  await t.wait(1200);

  t.chapter('Use them on a product');
  await t.say('Now use all three on a product. Go to Products and click New product.', async () => {
    await t.openMenu('Inventory', '/products');
    await t.click('[data-tour="product-add"]');
  });
  await t.say('Name the product and generate a SKU.', async () => {
    await t.type('#name', PRODUCT);
    await t.click('[data-sku-generate*="sku"]');
  });
  await t.say('Enter a price.', () => t.type('#base_price', '12'));
  await t.say('On the right, the Organization box has your new brand, unit and category.', () => pick('#brand_id', BRAND));
  await t.say('Choose the unit.', () => pick('#unit_id', UNIT));
  await t.say('And the category.', () => pick('#category_id', CAT));
  await t.say('Save the product.', () => t.click(page.locator('button:has-text("Save product")').last()));
  await t.wait(1500);

  t.chapter('See the result');
  await t.say('The product list now shows the new category and the unit next to the price.', () => t.type('.search-input', 'Chai'));
  await t.wait(1000);
  await t.say('You can also filter the list by any category, brand or unit.', () => pick('[data-param="brand"]', BRAND));
  await t.wait(1200);
  await t.say('That is how you keep a catalogue tidy. Next, keep an eye on your stock.', () => t.wait(1200));
}

module.exports = { meta, run };
