// @ts-check
module.exports = {
  intro: ['intro', 'third-party-costs'],

  installation: [
    'installation/overview',
    'installation/server-requirements',
    'installation/deployment',
    'installation/web-installer',
    'installation/environment-configuration',
    'installation/php-ini-settings',
    'installation/cron-jobs',
    'installation/queue-worker',
    'installation/first-login',
    'installation/localhost-setup',
    'installation/updating',
  ],

  shop: [
    'shop/overview',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['shop/getting-started/signup-and-onboarding', 'shop/getting-started/setup-wizard', 'shop/getting-started/navigating-the-panel', 'shop/getting-started/dashboard'],
    },
    {
      type: 'category',
      label: 'Selling',
      items: [
        'shop/selling/pos-terminal',
        'shop/selling/sales',
        'shop/selling/refunds',
        'shop/selling/shifts-and-cash',
        'shop/selling/quotations',
      ],
    },
    {
      type: 'category',
      label: 'Catalogue',
      items: [
        'shop/catalogue/products',
        'shop/catalogue/variants-and-attributes',
        'shop/catalogue/categories-brands-units',
        'shop/catalogue/print-labels',
      ],
    },
    {
      type: 'category',
      label: 'Stock',
      items: [
        'shop/stock/stock-levels',
        'shop/stock/batches-and-expiry',
        'shop/stock/stock-adjustments',
        'shop/stock/stock-transfers',
        'shop/stock/stock-takes',
      ],
    },
    {
      type: 'category',
      label: 'Tax & Pricing',
      items: ['shop/pricing/tax-rates-and-groups', 'shop/pricing/price-lists', 'shop/pricing/customer-groups', 'shop/pricing/discount-rules'],
    },
    {
      type: 'category',
      label: 'Purchasing',
      items: [
        'shop/purchasing/suppliers',
        'shop/purchasing/purchase-orders',
        'shop/purchasing/reorder-suggestions',
        'shop/purchasing/purchase-returns',
      ],
    },
    { type: 'category', label: 'Expenses', items: ['shop/expenses/expenses'] },
    { type: 'category', label: 'Branches', items: ['shop/branches/branches'] },
    {
      type: 'category',
      label: 'People',
      items: ['shop/people/customers', 'shop/people/loyalty', 'shop/people/team', 'shop/people/roles-and-permissions'],
    },
    {
      type: 'category',
      label: 'Reports',
      items: ['shop/reports/overview', 'shop/reports/sales-and-payments', 'shop/reports/inventory-and-expiry', 'shop/reports/purchases-and-profit'],
    },
    {
      type: 'category',
      label: 'Settings',
      items: [
        'shop/settings/general-settings',
        'shop/settings/payment-methods',
        'shop/settings/email-settings',
        'shop/settings/sms-settings',
        'shop/settings/owner-summary',
        'shop/settings/backups',
        'shop/settings/languages',
        'shop/settings/data-export',
      ],
    },
    {
      type: 'category',
      label: 'Account & Billing',
      items: ['shop/account/billing-and-plans', 'shop/account/profile', 'shop/account/support', 'shop/account/audit-log', 'shop/account/notifications'],
    },
  ],

  platform: [
    'platform/overview',
    'platform/login-and-two-factor',
    'platform/dashboard',
    {
      type: 'category',
      label: 'Businesses',
      items: ['platform/businesses/businesses', 'platform/businesses/impersonation', 'platform/businesses/feature-rollout'],
    },
    {
      type: 'category',
      label: 'Plans & Money',
      items: ['platform/money/plans', 'platform/money/payment-gateways', 'platform/money/invoices', 'platform/money/reports'],
    },
    {
      type: 'category',
      label: 'Customer Care',
      items: ['platform/care/support-inbox', 'platform/care/announcements'],
    },
    {
      type: 'category',
      label: 'Settings',
      items: [
        'platform/settings/general-settings',
        'platform/settings/legal-pages',
        'platform/settings/mail-templates',
        'platform/settings/languages',
        'platform/settings/backups',
      ],
    },
    {
      type: 'category',
      label: 'Admins & Audit',
      items: ['platform/admins/admins', 'platform/admins/roles-and-permissions', 'platform/admins/audit-log'],
    },
  ],

  help: ['support', 'faqs', 'changelog'],
};
