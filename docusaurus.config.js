// @ts-check
// Live at https://marketplace.wrteam.in/docs/pos-saas-doc/ : the marketplace site proxies that path to GitHub Pages.
// BASE_URL is set in .github/workflows/deploy.yml; local and offline builds use /.
const baseUrl = process.env.BASE_URL || '/';

const config = {
  title: 'POS SaaS Documentation',
  tagline: 'Multi-tenant point of sale and back office',
  favicon: 'img/favicon.svg',
  url: 'https://marketplace.wrteam.in',
  baseUrl,
  organizationName: 'WRTeam-in',
  projectName: 'pos-saas-doc',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  plugins: ['./plugins/tutorials-routes'],
  presets: [
    [
      'classic',
      {
        docs: { path: 'docs', routeBasePath: 'docs', sidebarPath: './sidebars.js' },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],
  scripts: ['lightbox', 'search', 'theme'].map((name) => ({ src: `${baseUrl}js/${name}.js`, defer: true })),
  themeConfig: {
    navbar: {
      title: 'POS SaaS Documentation',
      logo: { alt: 'POS', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'intro', label: 'Introduction', position: 'left' },
        { type: 'docSidebar', sidebarId: 'installation', label: 'Installation', position: 'left' },
        { type: 'docSidebar', sidebarId: 'shop', label: 'Shop Admin Panel', position: 'left' },
        { type: 'docSidebar', sidebarId: 'platform', label: 'Super Admin Panel', position: 'left' },
        { type: 'docSidebar', sidebarId: 'help', label: 'Support & FAQs', position: 'left' },
        { to: '/tutorials', label: 'Tutorials', position: 'left', activeBaseRegex: '/tutorials' },
        {
          type: 'html',
          position: 'right',
          value: '<button type="button" class="doc-search-btn" aria-label="Search the documentation"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span>Search</span><kbd>Ctrl K</kbd></button>',
        },
        {
          type: 'html',
          position: 'right',
          value: '<button type="button" class="doc-theme-btn" aria-label="Switch between light and dark mode" title="Light / dark mode"><svg class="doc-theme-btn__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg><svg class="doc-theme-btn__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        { title: 'Get started', items: [{ label: 'Introduction', to: '/docs/intro' }, { label: 'Installation', to: '/docs/installation/overview' }, { label: 'Demo mode and demo logins', to: '/docs/installation/demo-mode' }] },
        { title: 'Guides', items: [{ label: 'Shop Admin Panel', to: '/docs/shop/overview' }, { label: 'POS Terminal', to: '/docs/shop/selling/pos-terminal' }, { label: 'Super Admin Panel', to: '/docs/platform/overview' }, { label: 'Video tutorials', to: '/tutorials' }] },
        { title: 'Help', items: [{ label: 'Support', to: '/docs/support' }, { label: 'FAQs', to: '/docs/faqs' }, { label: 'Changelog', to: '/docs/changelog' }] },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} POS SaaS Documentation.`,
    },
    colorMode: { respectPrefersColorScheme: true, disableSwitch: true },
    prism: { additionalLanguages: ['bash', 'php', 'ini', 'nginx', 'apacheconf'] },
  },
};
module.exports = config;
