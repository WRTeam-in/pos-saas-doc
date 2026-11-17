const { execFileSync } = require('child_process');
const { CREDS } = require('../lib');

const meta = {
  slug: 'shifts-and-cash',
  title: 'Cash in/out and closing the register',
  category: 'selling',
  summary: 'Record cash added to or taken from the drawer, close the register with a counted amount and review shifts.',
  doc: '/docs/shop/selling/shifts-and-cash',
  order: 14,
};

function query(statement) {
  const mysql = process.env.TUTORIAL_MYSQL || '/Applications/XAMPP/xamppfiles/bin/mysql';
  return execFileSync(mysql, ['-uroot', '-N', process.env.TUTORIAL_DB || 'pos_tutorials', '-e', statement]).toString().trim();
}

async function run(t) {
  const { page } = t;
  t.sql("INSERT INTO cashier_sessions (tenant_id,branch_id,user_id,opened_at,opening_cash,status,created_at,updated_at) SELECT 1,1,1,NOW(),500,'open',NOW(),NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM (SELECT id FROM cashier_sessions WHERE tenant_id=1 AND status='open' AND user_id=1 AND branch_id=1) x)");
  const clearToast = async () => {
    const close = page.locator('.toast-container button').first();
    if (await close.isVisible().catch(() => false)) await t.click(close, { settle: false });
    await t.wait(300);
  };
  const reason = async (text) => {
    await t.click('#cm-reason + .select2 .select2-selection');
    await t.click(page.locator('.select2-results__option', { hasText: text }).first());
  };

  await t.intro(meta.title, 'Shifts, drawer movements and the cash count');

  t.chapter('The open register');
  await t.say('A shift starts when you open the register. Go to Sales, POS Terminal.', async () => {
    await t.login(CREDS.shop.email, CREDS.shop.password);
    await t.openMenu('Sales', '/pos');
    await page.waitForSelector('.pos-catalogue');
    await t.settle(600);
  });
  await t.say('The register bar at the top shows when the shift opened and has the two cash buttons.', () => t.highlight('.btn-soft-primary:has-text("Cash in/out")', 2200));

  t.chapter('Cash in');
  await t.say('Select Cash in/out to record money added to the drawer.', () => t.click('.btn-soft-primary:has-text("Cash in/out")'));
  await t.say('Cash in is selected. Enter the amount, then choose a reason such as Float top-up.', async () => {
    await page.waitForSelector('#cash-movement-modal.show');
    await t.wait(500);
    await t.type('#cm-amount', '100');
    await reason('Float top-up');
  });
  await t.say('Add a note if you like and select Save. The movement is on this shift\'s report.', async () => {
    await t.type('#cm-note', 'Extra change for the morning');
    await t.click('#cm-submit');
    await page.waitForSelector('.pos-catalogue');
    await t.settle(800);
  });

  t.chapter('Cash out');
  await t.say('Use Cash in/out again, this time for money leaving the drawer. Choose Cash out.', async () => {
    await clearToast();
    await t.click('.btn-soft-primary:has-text("Cash in/out")');
    await page.waitForSelector('#cash-movement-modal.show');
    await t.wait(500);
    await t.click('label[for="cm-out"]');
  });
  await t.say('Enter the amount and a reason such as Safe drop. You cannot take out more than the drawer should hold.', async () => {
    await t.type('#cm-amount', '50');
    await reason('Safe drop');
    await t.wait(900);
    await t.click('#cm-submit');
    await page.waitForSelector('.pos-catalogue');
    await t.settle(800);
  });

  t.chapter('Close the register');
  await t.say('At the end of the day select Close Register.', async () => {
    await clearToast();
    await t.click('.btn-soft-warning:has-text("Close Register")');
  });
  await t.say('Count the cash in the drawer and type the Counted cash. Here the count is a little short, so a note helps.', async () => {
    await page.waitForSelector('#close-register-modal.show');
    await t.wait(500);
    const expected = Number(query("SET @s=(SELECT MAX(id) FROM cashier_sessions WHERE tenant_id=1 AND status='open' AND user_id=1 AND branch_id=1); SELECT (SELECT opening_cash FROM cashier_sessions WHERE id=@s) + (SELECT COALESCE(SUM(amount),0) FROM sale_payments WHERE cashier_session_id=@s AND payment_method='cash' AND status='paid') - (SELECT COALESCE(SUM(rp.amount),0) FROM refund_payments rp JOIN refunds r ON r.id=rp.refund_id WHERE r.cashier_session_id=@s AND rp.method='cash') + (SELECT COALESCE(SUM(IF(type='in',amount,-amount)),0) FROM cash_movements WHERE cashier_session_id=@s)"));
    await t.type('#cr-actual', (expected - 25).toFixed(2));
    await t.type('#cr-note', 'End of day count');
  });
  await t.say('Select Close Register. The shift ends and its report opens.', async () => {
    await t.click('#close-register-modal button[type="submit"]');
    await page.waitForURL(/shifts/);
    await t.settle(1000);
  });

  t.chapter('The shift report');
  await t.say('The report compares the cash you counted with the cash the drawer should hold. The Difference is the gap.', () => t.wait(3000));
  await t.say('Scroll down for the cash movements you just made. Payments and sales made in the shift are listed here too.', () => t.scroll(600, 2600));
  await t.scroll(-600, 700);

  t.chapter('All shifts');
  await t.say('Sales, Shifts lists every shift, with its sales total, expected cash, counted cash and difference.', async () => {
    await t.openMenu('Sales', '/shifts');
    await t.settle(1000);
  });
  await t.say('Tick Only shifts with a difference to find drawers that did not balance.', async () => {
    await t.click('#only-diff');
    await t.settle(800);
  });
  await t.wait(1800);
}

module.exports = { meta, run };
