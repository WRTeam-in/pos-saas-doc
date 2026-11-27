import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const icon = (d) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const cards = [
  {title: 'Installation', tag: 'Start here', to: '/docs/installation/overview', text: 'Server requirements, web installer, cron, demo mode and first login.',
    icon: icon(<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>)},
  {title: 'Shop Admin Panel', tag: 'For shop owners', to: '/docs/shop/overview', text: 'POS, products, stock, purchasing, reports, settings and billing.',
    icon: icon(<><path d="M3 9l1.5-5h15L21 9" /><path d="M4 9v11h16V9" /><path d="M9 20v-6h6v6" /></>)},
  {title: 'Super Admin Panel', tag: 'For the platform owner', to: '/docs/platform/overview', text: 'Businesses, plans, payment gateways, website, invoices and support.',
    icon: icon(<><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="M9 12l2 2 4-4" /></>)},
  {title: 'Support & FAQs', tag: 'Need help?', to: '/docs/support', text: 'Contact details, answers to common questions and the changelog.',
    icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" /></>)},
];

const steps = [
  {to: '/docs/installation/overview', title: 'Install the application', text: 'Upload, run the web installer and set up cron and the queue worker.'},
  {to: '/docs/platform/overview', title: 'Configure the platform', text: 'Create plans, connect payment gateways and set up your website.'},
  {to: '/docs/shop/getting-started/signup-and-onboarding', title: 'Open a shop and sell', text: 'Sign up a business, finish the setup wizard and ring up the first sale.'},
];

export default function Home() {
  return (
    <Layout title="Documentation" description="Install, configure and run the POS SaaS: shop panel, POS terminal and super admin panel.">
      <header className="home-hero">
        <div className="home-hero__inner">
          <div>
            <span className="home-hero__eyebrow">POS SaaS documentation</span>
            <h1>Everything you need to run your POS platform</h1>
            <p>Install it, set up plans and payments, and guide every shop from first login to daily selling.</p>
            <div className="home-hero__cta">
              <Link className="button button--primary button--lg" to="/docs/intro">Get started</Link>
              <Link className="button button--secondary button--lg" to="/docs/shop/selling/pos-terminal">POS terminal guide</Link>
            </div>
          </div>
        </div>
      </header>
      <main className="home-bottom">
        <section className="home-section">
          <h2>Pick your guide</h2>
          <div className="home-cards">
            {cards.map((c) => (
              <Link key={c.title} className="home-card" to={c.to}>
                <span className="home-card__icon">{c.icon}</span>
                <span className="home-card__tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="home-section">
          <h2>Three steps to go live</h2>
          <ol className="home-steps">
            {steps.map((s) => (
              <li key={s.to}><Link to={s.to}>{s.title}</Link><p>{s.text}</p></li>
            ))}
          </ol>
        </section>
      </main>
    </Layout>
  );
}
