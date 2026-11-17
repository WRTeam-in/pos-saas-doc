import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const cards = [
  {title: 'Installation', tag: 'Start here', to: '/docs/installation/overview', text: 'Server requirements, web installer, cron and first login.'},
  {title: 'Shop Admin Panel', tag: 'For shop owners', to: '/docs/shop/overview', text: 'POS, products, stock, purchasing, reports, settings and billing.'},
  {title: 'Super Admin Panel', tag: 'For the platform owner', to: '/docs/platform/overview', text: 'Businesses, plans, payment gateways, invoices and support.'},
  {title: 'Support & FAQs', tag: 'Need help?', to: '/docs/support', text: 'Contact details and answers to common questions.'},
];

export default function Home() {
  return (
    <Layout title="Documentation" description="Admin panel documentation">
      <header className="home-hero">
        <h1>POS saas Documentation
</h1>
        <p>Everything you need to install, configure and run the point of sale and its admin panels.</p>
        <Link className="button button--primary button--lg" to="/docs/intro">Get Started</Link>
      </header>
      <main>
        <div className="home-cards">
          {cards.map((c) => (
            <Link key={c.title} className="home-card" to={c.to}>
              <span>{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Link>
          ))}
        </div>
        <section className="home-steps">
          <h2>Three steps to go live</h2>
          <ol>
            <li><Link to="/docs/installation/overview">Install the application on your server</Link></li>
            <li><Link to="/docs/platform/overview">Configure plans and payment gateways in the Super Admin panel</Link></li>
            <li><Link to="/docs/shop/overview">Set up your shop and start selling</Link></li>
          </ol>
        </section>
      </main>
    </Layout>
  );
}
