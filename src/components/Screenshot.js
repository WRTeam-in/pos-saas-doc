import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Screenshot from static/img/screenshots/<name>.png, framed; a click opens it large on the page (static/js/lightbox.js).
 * When the PNG is missing a placeholder shows instead; nothing in the docs needs editing to swap it.
 */
export default function Screenshot({name, alt}) {
  const real = useBaseUrl(`/img/screenshots/${name}.png`);
  const placeholder = useBaseUrl('/img/placeholder.svg');
  const [src, setSrc] = useState(real);
  const missing = src === placeholder;
  const img = <img src={src} alt={alt} loading="lazy" width="1440" height="900" onError={() => setSrc(placeholder)} />;
  return (
    <figure className="screenshot">
      {missing ? img : <a href={real} title="View larger">{img}</a>}
      <figcaption>{alt}{missing ? ` (static/img/screenshots/${name}.png)` : ''}</figcaption>
    </figure>
  );
}
