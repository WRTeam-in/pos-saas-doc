const { CREDS } = require('../lib');

const meta = {
  slug: 'support-and-announcements',
  title: 'Support, announcements and the audit log',
  category: 'super-admin',
  summary: 'Answer a support ticket from a business, publish an announcement to every business, and review what admins did in the audit log.',
  doc: '/docs/platform/care/support-inbox',
  order: 44,
};

const SUBJECT = 'Receipts do not print at the Camp counter';
const TITLE = 'Scheduled maintenance on Sunday';

async function run(t) {
  const { page } = t;
  t.sql(`DELETE FROM support_tickets WHERE subject = '${SUBJECT}'; DELETE FROM platform_announcements WHERE title = '${TITLE}'; DELETE FROM platform_audit_logs WHERE event LIKE 'announcement%';`);
  t.sql(`INSERT INTO support_tickets (tenant_id, created_by, subject, category, status, last_message_at, created_at, updated_at) VALUES (1, 1, '${SUBJECT}', 'question', 'open', NOW(), NOW(), NOW());
    INSERT INTO support_messages (tenant_id, support_ticket_id, user_id, is_internal, body, created_at, updated_at)
    SELECT 1, id, 1, 0, 'Since this morning the receipt printer at the Camp counter prints nothing after a sale. The sale is saved, but no receipt comes out. Can you help?', NOW(), NOW() FROM support_tickets WHERE subject = '${SUBJECT}';`);

  await t.intro('Support, announcements and the audit log', 'Super Admin: look after your businesses');

  t.chapter('Support inbox');
  await t.say('Sign in as the platform admin.', () => t.login(CREDS.admin.email, CREDS.admin.password));
  await t.say('Support collects the questions and problems that businesses send you. Needs reply shows what is waiting.', async () => {
    await t.click('.app-sidebar a[href$="/support"]');
    await t.wait(1200);
  });

  t.chapter('Reply to a ticket');
  await t.say('Open a ticket to read the conversation. This one comes from FreshMart Grocers.', async () => {
    await t.click(page.locator('a', { hasText: SUBJECT }).first());
    await t.wait(1000);
  });
  await t.say('Type your answer at the bottom. The Internal note option keeps a note for admins only.', async () => {
    await t.highlight('#sup-internal', 1800);
    await t.type('#sup-reply', 'Thanks for telling us. Please open Settings, then Receipts, and check that the printer is selected for the Camp branch.', { delay: 28 });
  });
  await t.say('Send the reply. The business sees it right away, and the ticket moves to Answered.', async () => {
    await t.click('button.chat-send');
    await t.wait(1200);
  });
  t.chapter('Close a ticket');
  await t.say('Click Close request when the problem is solved. The business can reopen it later.', async () => {
    await t.highlight('#support-status-btn', 2200);
  });

  t.chapter('Announcements');
  await t.say('Announcements are notices shown to businesses at the top of their app. Click New announcement.', async () => {
    await t.click('.app-sidebar a[href$="/announcements"]');
    await t.click('a[href$="/announcements/create"]');
  });
  await t.say('Write a title and a message, and choose a style, such as info or warning.', async () => {
    await t.type('#an-title', TITLE, { delay: 40 });
    await t.type('#an-body', 'The platform will be offline for about 15 minutes at 2 am. Please finish your sales before then.', { delay: 22 });
  });
  t.chapter('Audience and publish');
  await t.say('Pick the audience, everyone or the businesses on one plan, and optional start and end dates. Then save.', async () => {
    await t.highlight('#an-plan', 2400);
    await t.click(page.locator('form button', { hasText: /^Save$/ }));
    await t.wait(1200);
  });
  await t.say('The announcement is live. You can turn it off or edit it from this list at any time.', () => t.wait(1500));

  t.chapter('Audit log');
  await t.say('The Audit log records everything admins do in this panel. Entries cannot be edited or deleted.', async () => {
    await t.click('.app-sidebar a[href$="/audit-log"]');
    await t.wait(1500);
  });
  await t.say('Each row shows when, who, what happened and from which address. Your new announcement is listed.', async () => {
    await t.highlight('tbody tr >> nth=0', 3000);
  });
  await t.say('Filter by admin, by event or by date to find what you need. That is care for your businesses.', async () => {
    await t.highlight('input[data-param="from"]', 2200);
  });
}

module.exports = { meta, run };
