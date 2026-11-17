const { execFileSync } = require('child_process');
const { CREDS } = require('../lib');

const meta = {
  slug: 'refunds',
  title: 'Refund a sale',
  category: 'selling',
  summary: 'Find a completed sale, choose what comes back and why, pay the customer out and check the refund history.',
  doc: '/docs/shop/selling/refunds',
  order: 13,
};

function query(statement) {
  const mysql = process.env.TUTORIAL_MYSQL || '/Applications/XAMPP/xamppfiles/bin/mysql';
  return execFileSync(mysql, ['-uroot', '-N', process.env.TUTORIAL_DB || 'pos_tutorials', '-e', statement]).toString().trim();
}

async function run(t) {
  const { page } = t;
  t.sql("INSERT INTO cashier_sessions (tenant_id,branch_id,user_id,opened_at,opening_cash,status,created_at,updated_at) SELECT 1,1,1,NOW(),500,'open',NOW(),NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM (SELECT id FROM cashier_sessions WHERE tenant_id=1 AND status='open' AND user_id=1 AND branch_id=1) x)");
  t.sql("INSERT INTO refund_reasons (tenant_id,name,status,created_at,updated_at) SELECT 1,n,'active',NOW(),NOW() FROM (SELECT 'Changed mind' n UNION SELECT 'Damaged or faulty' UNION SELECT 'Wrong item' UNION SELECT 'Expired' UNION SELECT 'Other') x WHERE NOT EXISTS (SELECT 1 FROM (SELECT id FROM refund_reasons WHERE tenant_id=1) y)");
  const number = query("SELECT sale_number FROM sales s WHERE tenant_id=1 AND status='completed' AND branch_id=1 AND customer_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM refunds r WHERE r.sale_id=s.id) AND (SELECT COUNT(*) FROM sale_items i WHERE i.sale_id=s.id)>=2 ORDER BY id DESC LIMIT 1");

  await t.intro(meta.title, 'Returns, reasons and refund history');

  t.chapter('Start a return');
  await t.say('Sign in and open Sales, then Refunds. The page lists every return made so far.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/refund-history');
    await t.settle(800);
  });
  await t.say('Select New return. You need an open register, because the refund money leaves your till.', async () => {
    await t.click('a.btn-primary:has-text("New return")');
    await t.settle(600);
  });

  t.chapter('Find the sale');
  await t.say('Type the sale number from the customer\'s receipt. Matching sales appear as you type.', async () => {
    await t.type('#q', number);
    await t.wait(1600);
  });
  await t.say('Select Find sale to open the return form for it.', async () => {
    await t.click('#refund-find-submit');
    await page.waitForSelector('[data-refund-builder]');
    await t.settle(800);
  });

  t.chapter('Choose what comes back');
  await t.say('Each line shows what was sold and how many can still be returned.', () => t.highlight(page.locator('.card', { hasText: 'Sale items' }).last(), 2400));
  await t.say('Use plus on a line to set the Return qty. Here one unit comes back, a partial refund.', async () => {
    await t.click('.refund-qty-increment >> nth=0');
    await t.wait(1000);
  });
  await t.say('Set the condition. Resellable puts the item back in stock, Damaged does not.', () => t.highlight('select[name$="[condition]"] >> nth=0', 2200));

  t.chapter('Give a reason');
  await t.say('Pick a reason so your reports show why items come back.', async () => {
    await t.click('#reason-select + .select2 .select2-selection');
    await t.wait(900);
    await t.click(page.locator('.select2-results__option', { hasText: 'Damaged' }).first());
  });
  await t.say('The running total shows exactly how much will be refunded.', () => t.highlight('#refund-running-total', 2200));

  t.chapter('Pay the customer back');
  await t.say('Under Refund payout choose how to pay out. Cash comes from the open register.', async () => {
    await page.locator('.payout-chip', { hasText: 'Cash' }).first().scrollIntoViewIfNeeded();
    await t.click(page.locator('.payout-chip', { hasText: 'Cash' }).first());
    await t.wait(1200);
  });
  await t.say('Select Process return. To return a whole sale, raise every line to its full quantity first.', async () => {
    await t.click('#refund-submit');
    await t.settle(1000);
  });
  await t.say('The receipt now shows the refund against the sale.', () => t.scroll(450, 2200));

  t.chapter('Refund history');
  await t.say('Back in Sales, Refunds, every return is listed with its refund number, sale and amount.', async () => {
    await t.openMenu('Sales', '/refund-history');
    await t.settle(1000);
  });
  await t.wait(1800);
  await t.say('Search by refund or sale number to find one again.', async () => {
    await t.type('input[type="search"]:not([aria-label="Search"]) >> visible=true', number.slice(-6));
    await t.settle(1000);
  });
  await t.wait(1500);
}

module.exports = { meta, run };
