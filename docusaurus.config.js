// @ts-check
const config = {
  title: 'POS saas Documentation',
  tagline: 'Multi-tenant point of sale and back office',
  favicon: 'img/favicon.svg',
  url: 'https://docs.example.com',
  baseUrl: '/',
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
  themeConfig: {
    navbar: {
      title: 'POS saas Documentation',
      logo: { alt: 'POS', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'intro', label: 'Introduction', position: 'left' },
        { type: 'docSidebar', sidebarId: 'installation', label: 'Installation', position: 'left' },
        { type: 'docSidebar', sidebarId: 'shop', label: 'Shop Admin Panel', position: 'left' },
        { type: 'docSidebar', sidebarId: 'platform', label: 'Super Admin Panel', position: 'left' },
        { to: '/tutorials', label: 'Tutorials', position: 'left', activeBaseRegex: '/tutorials' },
        { type: 'docSidebar', sidebarId: 'help', label: 'Support & FAQs', position: 'left' },
      ],
    },
    footer: { style: 'dark', copyright: `Copyright © ${new Date().getFullYear()} POS saas Documentation
.` },
    colorMode: { respectPrefersColorScheme: true },
    prism: { additionalLanguages: ['bash', 'php', 'ini', 'nginx', 'apacheconf'] },
  },
};
module.exports = config;
