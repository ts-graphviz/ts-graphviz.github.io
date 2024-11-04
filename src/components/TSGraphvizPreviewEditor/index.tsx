import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { WebContainer } from '@webcontainer/api';
import { Graphviz } from 'graphviz-react';
import type monaco_editor from 'monaco-editor';
import type { editor } from 'monaco-editor';
import { memo, useState } from 'react';

import TSGraphvizLiveEditor from '../TSGraphvizLiveEditor';
import styles from './styles.module.css';

const SCRIPT = `const { Script, createContext } = require('node:vm');
const fs = require('node:fs/promises');
const { RootGraph, toDot } = require('ts-graphviz');
const ts = require('typescript');

async function runTSGraphvizScript(tsCode) {
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.CommonJS,
    },
  }).outputText;
  console.log('jsCode', jsCode);
  const script = new Script(jsCode);

  const result = script.runInContext(createContext({
    require,
    exports,
  }));

  if (result instanceof RootGraph) {
    return toDot(result);
  }
  if (typeof result === 'string') {
    return result;
  }
  throw new Error('Invalid result');
}

(async () => {
  const script = await fs.readFile('./diagram.ts', 'utf8');
  const dot = await runTSGraphvizScript(script);
  await fs.writeFile('./diagram.dot', dot);
})();
`;

type Status = 'idle' | 'processing';

interface Props {
  script: string;
  height?: number | string;
}

function PreRenderInfomation() {
  return (
    <div>
      <Admonition type="info">
        <p>
          <code>Ctrl + S</code> to Run Script.
        </p>
      </Admonition>
    </div>
  );
}

function TSGraphvizPreviewEditor({ script, height }: Props): JSX.Element {
  const [dot, setDot] = useState<string>(null);
  const [status, setStatus] = useState<Status>('processing');
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.actionMenu}>
          <button
            type="button"
            onClick={() => {
              // monaco.editor
            }}
          >
            Run
          </button>
        </div>
        <TSGraphvizLiveEditor
          script={script}
          height={height}
          onMount={onMount}
        />
      </div>
      <div>
        <Tabs>
          <TabItem value="image" label="Image" default>
            {status === 'processing' ? (
              'Processing...'
            ) : dot ? (
              <Graphviz dot={dot} />
            ) : (
              <PreRenderInfomation />
            )}
          </TabItem>
          <TabItem value="dot" label="DOT">
            {status === 'processing' ? (
              'Processing...'
            ) : dot ? (
              <CodeBlock language="dot">{dot}</CodeBlock>
            ) : (
              <PreRenderInfomation />
            )}
          </TabItem>
        </Tabs>
      </div>
    </div>
  );

  async function onMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof monaco_editor,
  ) {
    const instance = await WebContainer.boot({
      coep: 'none',
    });
    await instance.mount({
      'package.json': {
        file: {
          contents: JSON.stringify(
            {
              scripts: {
                main: 'node main.js',
              },
              dependencies: {
                'ts-graphviz': 'latest',
                // '@ts-graphviz/react': 'latest',
              },
              devDependencies: {
                tsx: 'latest',
                typescript: 'latest',
              },
            },
            null,
            2,
          ),
        },
      },
      'main.js': {
        file: {
          contents: SCRIPT,
        },
      },
    });
    const install = await instance.spawn('npm', ['install']);
    if ((await install.exit) === 0) {
      // console.log('npm install success');
      setStatus('idle');
    }

    editor.onKeyDown(async (e: any) => {
      if (e.keyCode === monaco.KeyCode.KeyS && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setStatus('processing');
        setDot(null);
        const code = editor.getValue();
        console.log(code);
        await instance.fs.writeFile('./diagram.ts', code);
        const exec = await instance.spawn('npm', ['run', 'main']);
        console.log('exit', await exec.exit);
        const dot = await instance.fs.readFile('./diagram.dot', 'utf8');
        setDot(dot);
        await instance.fs.rm('./diagram.ts');
        await instance.fs.rm('./diagram.dot');
        setStatus('idle');
      }
    });
  }
}

export default memo(TSGraphvizPreviewEditor);
