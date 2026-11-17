import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { categoryOf, clock } from './catalog';

export default function Card({ tutorial }) {
  const thumb = useBaseUrl(`/tutorials/${tutorial.slug}/thumb.png`);

  return (
    <Link to={`/tutorials/${tutorial.slug}`} className={styles.card}>
      <div className={styles.thumb}>
        <img src={thumb} alt="" loading="lazy" />
        <div className={styles.play}><span>▶</span></div>
        <span className={styles.badge}>{clock(tutorial.duration)}</span>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cat}>{categoryOf(tutorial).label}</span>
        <h3>{tutorial.title}</h3>
        <p>{tutorial.summary}</p>
        <div className={styles.meta}>
          <span>{tutorial.chapters.length} chapters</span>
          <span className={styles.watch}>Watch →</span>
        </div>
      </div>
    </Link>
  );
}
