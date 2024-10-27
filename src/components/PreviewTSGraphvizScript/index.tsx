import StackBlitz from '@site/src/components/StackBlitz';
import { EmbedOptions, ProjectFiles } from "@stackblitz/sdk";

const files: ProjectFiles = {
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview ts-graphviz diagram</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
    }
    main {
      display: flex;
      flex-direction: row;
      height: 100vh;
    }
    #graph {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
  <main>
    <div id="graph"></div>
  </main>
  <script type="module" src="./main.ts"></script>
</body>
</html>
`,
  'main.ts': `import { Graphviz } from "@hpcc-js/wasm-graphviz";
import { RootGraph, toDot } from 'ts-graphviz';
import useRef from 'react';

const graphElement = document.getElementById("graph")!;

import('./diagram.js').then(async (module) => {
  const graphviz = await Graphviz.load();

  for (const value of Object.values(module)) {
    if (value instanceof RootGraph) {
      const dot = toDot(value);

      const svg = graphviz.dot(dot);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.src = url;
      graphElement.appendChild(img);
      break;
    }
  }

});
`,
  'package.json': `{
  "name": "preview",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev"
  },
  "license": "ISC",
  "dependencies": {
    "@hpcc-js/wasm-graphviz": "^1.6.1",
    "ts-graphviz": "^2.1.4"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "vite": "^5.4.9"
  }
}
`,
  'tsconfig.json': `{
  "include": ["**/*.ts"],
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Bundler",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "esModuleInterop": true
  }
}
`,
};

interface PreviewProps {
  title: string;
  script: string;
  description?: string;
  options?: EmbedOptions;
}


export default function PreviewTSGraphvizScript({title, description, script, options}: PreviewProps): JSX.Element {
  return (
    <StackBlitz
      template="node"
      title={title}
      description={description}
      files={{
        ...files,
        'diagram.ts': script,
      }}
      settings={{
        compile: {
          trigger: 'save',
          // action: 'refresh',
          clearConsole: true,
        },
      }}
      options={{
        openFile: 'diagram.ts',
        view: 'default',
        hideDevTools: true,
        hideExplorer: true,
        hideNavigation: true,
        ...options,
      }}
    />
  );
}
