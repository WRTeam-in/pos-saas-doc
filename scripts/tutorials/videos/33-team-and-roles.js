const { CREDS } = require('../lib');

const meta = {
  slug: 'team-and-roles',
  title: 'Team and roles',
  category: 'back-office',
  summary: 'Invite a team member, give them a role and branches, and see what each role is allowed to do.',
  doc: '/docs/shop/people/team',
  order: 33,
};

async function run(t) {
  const { page } = t;
  const pick = async (box, option) => {
    await t.click(page.locator(`${box} + .select2-container`).first(), { settle: false });
    await t.wait(400);
    await t.click(page.locator('.select2-results__option', { hasText: option }).first(), { settle: false });
    await t.wait(400);
  };

  await t.sql("DELETE FROM invitations WHERE email='new.cashier.demo@example.com'");
  await t.intro('Team and roles', 'Who works in your shop and what they can do');

  t.chapter('Sign in');
  await t.say('Sign in as the business owner.', () => t.login(CREDS.shop.email, CREDS.shop.password));

  t.chapter('Your team');
  await t.say('Open People, then Team. Everyone who can sign in to your business is listed here with their role.', () => t.openMenu('People', '/team'));
  await t.wait(1800);
  await t.say('Each row shows the member and role. Use Edit to change a person, or Deactivate to stop them signing in.', () => t.scroll(300, 1500));
  await t.scroll(-300, 600);

  t.chapter('Invite a team member');
  await t.say('To add someone, click Invite team member. They get an email with a link to set their own password.', () => t.click('a[href$="/team/invitations/create"]'));
  await t.say('Enter their email address. Use a demo address like this one when you practise.', () => t.type('#email', 'new.cashier.demo@example.com', { delay: 60 }));
  await t.say('Choose a role. The role decides which screens and actions they get.', () => pick('#role', 'Cashier'));
  await t.say('Tick the branches they work at. A cashier at Camp only sees Camp.', async () => {
    await t.highlight('label:has-text("Camp")', 1800);
  });
  await t.say('Click Send invitation. If the email cannot be sent, you get a link to share with them yourself.', () => t.click('button:has-text("Send invitation")'));
  await t.wait(2200);

  t.chapter('Change a role');
  await t.say('To change a role later, open Team and click Edit on the person.', async () => {
    await t.openMenu('People', '/team');
    await t.click('a[href$="/team/4/edit"]');
  });
  await t.say('You can change their name, role and branches here. Email stays fixed because it is their sign-in.', async () => {
    await t.click(page.locator('#role + .select2-container').first(), { settle: false });
    await t.wait(2200);
    await page.keyboard.press('Escape');
  });
  await t.say('Click Cancel if you do not want to change anything.', () => t.click('a:has-text("Cancel")'));

  t.chapter('Roles and permissions');
  await t.say('Roles & Permissions lists every role, how many permissions it has and how many people use it.', () => t.openMenu('People', '/roles'));
  await t.wait(2200);
  await t.say('Owner can do everything. The built-in roles are ready to use, and Add role creates your own.', () => t.highlight('table', 2200));

  t.chapter('What a Cashier can do');
  await t.say('Click Edit on Cashier to see its permissions, grouped by module.', () => t.click('a[href$="/roles/4/edit"]'));
  await t.say('A ticked box means allowed. Cashiers can view products and stock, so they can find items at the counter.', () => t.scroll(250, 1600));
  await t.say('They cannot create, update or delete products: those boxes are empty.', () => t.highlight('main label:has-text("Create")', 2200));
  await t.say('Scroll down to see sales, customers and gift cards. Cashiers can ring up sales and add customers.', () => t.scroll(1500, 3200));
  await t.say('Reports, purchasing, settings and team management are not ticked, so a cashier never sees them.', () => t.scroll(2000, 3200));
  await t.say('Tick or untick boxes and click Save changes to adjust a role. That is team and roles.', () => t.wait(1500));
}

module.exports = { meta, run };
