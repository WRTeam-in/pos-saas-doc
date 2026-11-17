import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/components/Tutorials/styles.module.css';
import Card from '@site/src/components/Tutorials/Card';
import { CATEGORIES, all, clock, totalMinutes } from '@site/src/components/Tutorials/catalog';

export default function Tutorials() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const featured = all[0];
  const poster = useBaseUrl(`/tutorials/${featured?.slug}/thumb.png`);
  const video = useBaseUrl(`/tutorials/${featured?.slug}/video.webm`);
  const captions = useBaseUrl(`/tutorials/${featured?.slug}/captions.vtt`);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();

    return all.filter((t) => (category === 'all' || t.category === category)
      && (!q || `${t.title} ${t.summary} ${t.chapters.map((c) => c.title).join(' ')}`.toLowerCase().includes(q)));
  }, [query, category]);

  return (
    <Layout title="Video tutorials" description="Short captioned videos that show how every part of POS SaaS works.">
      <main className="container margin-bottom--xl">
        <div className={styles.crumbs}><Link to="/">Home</Link><span>›</span><Link to="/tutorials">All tutorials</Link></div>

        {featured && (
          <section className={styles.hero}>
            <div>
              <div className={styles.eyebrow}>Video tutorials</div>
              <h1>Learn POS SaaS, step by step</h1>
              <p>Short videos that show you exactly how each part works. Every step has clear on-screen captions, so you can follow along without sound.</p>
              <div className={styles.stats}>
                <span className={styles.stat}><b>{all.length}</b> {all.length === 1 ? 'tutorial' : 'tutorials'}</span>
                <span className={styles.stat}><b>{totalMinutes()}</b> min of video</span>
                <span className={styles.stat}>CC Subtitled</span>
              </div>
              <Link to={`/tutorials/${featured.slug}`} className={styles.cta}>▶ Start with the {featured.title.toLowerCase()}</Link>
            </div>
            <div className={styles.featured}>
              <video controls preload="metadata" poster={poster}>
                <source src={video} type="video/webm" />
                <track kind="captions" src={captions} srcLang="en" label="English" default />
              </video>
              <div className={styles.featuredCap}>{featured.title} · {clock(featured.duration)}</div>
            </div>
          </section>
        )}

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span aria-hidden="true">🔍</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tutorials, e.g. refund" aria-label="Search tutorials" />
          </label>
          <div className={styles.chips} role="group" aria-label="Filter by category">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES.filter((c) => all.some((t) => t.category === c.id))].map((c) => (
              <button key={c.id} type="button" aria-pressed={category === c.id} className={`${styles.chip} ${category === c.id ? styles.chipOn : ''}`} onClick={() => setCategory(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>

        {shown.length === 0 && <p className={styles.empty}>No tutorials match "{query}". Try another word.</p>}
        {CATEGORIES.map((c) => {
          const items = shown.filter((t) => t.category === c.id);
          if (items.length === 0) return null;

          return (
            <section key={c.id} className={styles.section}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionIcon} aria-hidden="true">{c.icon}</span>
                <div><h2>{c.label}</h2><p>{c.blurb}</p></div>
              </div>
              <div className={styles.grid}>{items.map((t) => <Card key={t.slug} tutorial={t} />)}</div>
            </section>
          );
        })}
      </main>
    </Layout>
  );
}
