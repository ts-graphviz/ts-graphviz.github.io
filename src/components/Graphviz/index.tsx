// import { type GraphvizOptions, graphviz } from 'd3-graphviz';
import type { Engine } from '@hpcc-js/wasm-graphviz';
import { useGraphviz } from '@site/src/contexts/Graphviz';
import { useEffect, useState } from 'react';

interface GraphvizProps {
  /**
   * A string containing a graph representation using the Graphviz DOT language.
   * @see https://graphviz.org/doc/info/lang.html
   */
  dot: string;
  engine?: Engine;
  /**
   * The classname to attach to this component for styling purposes.
   */
  className?: string;
}

const Graphviz = ({ dot, engine, className }: GraphvizProps) => {
  const graphviz = useGraphviz();
  const [url, setUrl] = useState<string>(null);
  useEffect(() => {
    if (dot && graphviz.status === 'ready') {
      const svg = graphviz.renderToSVG(dot, engine);
      setUrl(URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })));
    }
  }, [graphviz, dot, engine, setUrl]);
  return (
    <div className={className}>
      {url ? <img src={url} alt="Graphviz" /> : null}
    </div>
  );
};

export { Graphviz, type GraphvizProps };
