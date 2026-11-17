import React, { useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { categoryOf, clock } from './catalog';

export default function Watch({ data }) {
  const { tutorial, prev, next } = data;
  const ref = useRef(null);
  const [time, setTime] = useState(0);
  const base = `/tutorials/${tutorial.slug}`;
  const video = useBaseUrl(`${base}/video.webm`);
  const captions = useBaseUrl(`${base}/captions.vtt`);
  const poster = useBaseUrl(`${base}/thumb.png`);
  const current = tutorial.chapters.reduce((at, c, i) => (time >= c.t - 0.2 ? i : at), 0);

  const jump = (t) => {
    if (!ref.current) return;
    ref.current.currentTime = t;
    ref.current.play();
  };

  return (
    <Layout title={tutorial.title} description={tutorial.summary}>
      <main className="container margin-bottom--xl">
        <div className={styles.crumbs}><Link to="/">Home</Link><span>›</span><Link to="/tutorials">All tutorials</Link><span>›</span><span>{tutorial.title}</span></div>
        <div className={styles.layout}>
          <div>
            <div className={styles.player}>
              <video ref={ref} controls preload="metadata" poster={poster} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}>
                <source src={video} type="video/webm" />
                <track kind="captions" src={captions} srcLang="en" label="English" default />
              </video>
            </div>
            <h1 className={styles.title}>{tutorial.title}</h1>
            <p className={styles.summary}>{tutorial.summary}</p>
            <div className={styles.facts}>
              <span className={styles.fact}>{categoryOf(tutorial).label}</span>
              <span className={styles.fact}>{clock(tutorial.duration)}</span>
              <span className={styles.fact}>{tutorial.chapters.length} chapters</span>
              <span className={styles.fact}>CC Subtitled</span>
            </div>
            {tutorial.doc && <Link className={styles.guide} to={tutorial.doc}>Read the written guide →</Link>}
          </div>
          <aside className={styles.chapters} aria-label="Chapters">
            <h2>Chapters</h2>
            <ol>
              {tutorial.chapters.map((c, i) => (
                <li key={c.title + c.t}>
                  <button type="button" className={`${styles.chapter} ${i === current ? styles.chapterOn : ''}`} onClick={() => jump(c.t)} aria-current={i === current ? 'true' : undefined}>
                    <time>{clock(c.t)}</time><span>{c.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </div>
        <nav className={styles.pager} aria-label="More tutorials">
          {prev ? <Link to={`/tutorials/${prev.slug}`}><small>← Previous</small><b>{prev.title}</b></Link> : <span />}
          {next && <Link className={styles.pagerNext} to={`/tutorials/${next.slug}`}><small>Next →</small><b>{next.title}</b></Link>}
        </nav>
      </main>
    </Layout>
  );
}
