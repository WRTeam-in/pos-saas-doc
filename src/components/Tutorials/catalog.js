import tutorials from '@site/src/data/tutorials.json';

export const CATEGORIES = [
  { id: 'getting-started', label: 'Getting started', icon: '🚀', blurb: 'New to POS SaaS? Start with a quick tour of the whole product.' },
  { id: 'selling', label: 'Selling', icon: '🛒', blurb: 'Ring up sales at the counter, take payments, handle refunds and close the day.' },
  { id: 'back-office', label: 'Back office', icon: '📦', blurb: 'Products, stock, purchasing and customers: everything behind the till.' },
  { id: 'super-admin', label: 'Super Admin', icon: '🛡️', blurb: 'For the platform owner: businesses, plans, billing and system settings.' },
];

export const all = [...tutorials].sort((a, b) => a.order - b.order);

export const bySlug = (slug) => all.find((t) => t.slug === slug);
export const categoryOf = (tutorial) => CATEGORIES.find((c) => c.id === tutorial.category) || CATEGORIES[0];

export function clock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(Math.round(seconds % 60)).padStart(2, '0');

  return `${m}:${s}`;
}

export const totalMinutes = () => Math.round(all.reduce((sum, t) => sum + t.duration, 0) / 60);
