import { Graphviz } from '@hpcc-js/wasm-graphviz';
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-dot';
import 'prismjs/themes/prism-okaidia.css';
import { RootGraph, toDot } from 'ts-graphviz';

const graphElement = document.getElementById('graph')!;
const codeElement = document.getElementById('code')!;

import('./diagram.js').then(async (module) => {
  const graphviz = await Graphviz.load();

  for (const value of Object.values(module)) {
    if (value instanceof RootGraph) {
      const dot = toDot(value);
      codeElement.setHTMLUnsafe(dot);
      highlightElement(codeElement);

      const svg = graphviz.dot(dot);
      // console.log(svg);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.src = url;
      graphElement.appendChild(img);
      break;
    }
  }
});
