const { CREDS } = require('../lib');

const meta = {
  slug: 'platform-settings',
  title: 'Platform settings',
  category: 'super-admin',
  summary: 'A tour of Settings: platform name and logos, appearance, new business defaults, sign-up rules, email and security.',
  doc: '/docs/platform/settings/general-settings',
  order: 43,
};

async function run(t) {
  const { page } = t;
  const go = (href) => t.click(`.settings-nav a[href$="${href}"]`);
  await t.intro('Platform settings', 'Super Admin: name, look, sign-up, email and security');

  t.chapter('Open Settings');
  await t.say('Sign in as the platform admin.', () => t.login(CREDS.admin.email, CREDS.admin.password));
  await t.say('Settings has its own menu, grouped into General, Sign-up and billing, Messaging, and Security and system.', async () => {
    await t.click('.app-sidebar a[href$="/admin/settings"]');
    await t.wait(1000);
  });

  t.chapter('Name and logos');
  await t.say('Platform holds the name shown in the panel and in emails, plus your support email and company details.', async () => {
    await t.highlight('text=Platform name >> xpath=..', 2800);
  });
  await t.say('Scroll down to upload the logo for the light and dark themes. A wide PNG with a transparent background works best.', async () => {
    await t.scroll(520, 1400);
    await t.wait(1600);
  });

  t.chapter('Appearance');
  await t.say('Appearance sets the accent colour, the default theme and the font for the whole admin panel.', async () => {
    await go('/settings/appearance');
    await t.wait(1000);
  });
  await t.say('Pick a colour and the panel previews it at once. Nothing changes for others until you press Save.', async () => {
    await t.highlight('.u-swatch-lg >> nth=1', 1800);
    await t.wait(1000);
  });

  t.chapter('New business defaults');
  await t.say('New business defaults are the starting values every new business gets, the currency and the time zone.', async () => {
    await go('/settings/defaults');
    await t.wait(2600);
  });

  t.chapter('Sign-up');
  await t.say('Sign-up decides who can register. You can close sign-ups, or require a verified email address.', async () => {
    await go('/settings/signup');
    await t.highlight('.form-switch >> nth=0', 2400);
  });
  await t.say('Block email domains, and limit how many invitations a business or a person can send per hour and per day.', async () => {
    await t.scroll(260, 1200);
    await t.wait(1600);
  });

  t.chapter('Email');
  await t.say('System email is the mail server used for verification, password reset, invitations and billing emails.', async () => {
    await go('/settings/email');
    await t.wait(2800);
  });
  await t.say('Email templates lets you edit the wording of each message the platform sends.', async () => {
    await go('/settings/email-templates');
    await t.wait(2200);
  });

  t.chapter('Security');
  await t.say('Security sets the admin idle timeout, the shop session lifetime, password length and sign-in lockout.', async () => {
    await go('/settings/security');
    await t.highlight('text=Admin idle timeout (minutes) >> xpath=..', 3000);
  });
  await t.say('You can also require two-factor authentication for every admin. We leave these settings as they are.', async () => {
    await t.highlight('text=Require two-factor authentication for admins', 3000);
  });
  await t.say('That is Settings. Legal pages, languages, backups and updates are in the same menu.', async () => {
    await t.highlight('.settings-nav', 2200);
  });
}

module.exports = { meta, run };
