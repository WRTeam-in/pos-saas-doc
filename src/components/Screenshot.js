import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Screenshot placeholder. Drop a PNG named `<name>.png` into static/img/screenshots/ and it replaces the
 * placeholder automatically; nothing in the docs needs editing.
 */
export default function Screenshot({name, alt}) {
  const real = useBaseUrl(`/img/screenshots/${name}.png`);
  const placeholder = useBaseUrl('/img/placeholder.svg');
  const [src, setSrc] = useState(real);
  return (
    <figure className="screenshot">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setSrc(placeholder)}
      />
      <figcaption>{alt}{src === placeholder ? ` (static/img/screenshots/${name}.png)` : ''}</figcaption>
    </figure>
  );
}
