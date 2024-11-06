import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { WebContainer } from '@webcontainer/api';
import { clsx } from 'clsx';
import { Graphviz } from 'graphviz-react';
import type monaco_editor from 'monaco-editor';
import type { editor } from 'monaco-editor';
import { memo, useState } from 'react';
import { OrbitProgress, Riple } from 'react-loading-indicators';

import TSGraphvizLiveEditor from '../TSGraphvizLiveEditor';
import styles from './styles.module.css';

const SCRIPT = `
const { Script, createContext } = require('node:vm');
const fs = require('node:fs/promises');
const { RootGraph, toDot } = require('ts-graphviz');
const ts = require('typescript');

async function runTSGraphvizScript(tsCode) {
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.CommonJS,
      removeComments: true,
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

type Status = 'installing' | 'idle' | 'processing';

interface Props {
  script: string;
  className?: string;
}

function TSGraphvizPreviewEditor({ script, className }: Props): JSX.Element {
  const [dot, setDot] = useState<string>(null);
  const [status, setStatus] = useState<Status>('installing');
  return (
    <div>
      <div className={clsx([styles.container, className])}>
        <div>
          <TSGraphvizLiveEditor script={script} onMount={onMount} />
        </div>
        <div
          className={styles.result}
          style={
            status === 'installing'
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : null
          }
        >
          {status === 'installing' ? (
            <OrbitProgress
              color="#3478c6"
              size="medium"
              text="Installing ts-graphviz"
              textColor="white"
              easing="ease-in-out"
            />
          ) : (
            <Tabs className={styles.tabs}>
              <TabItem value="image" label="Image" default>
                {status === 'processing' ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Riple color="#3478c6" size="medium" />
                  </div>
                ) : (
                  <Graphviz className={styles.graphviz} dot={dot} />
                )}
              </TabItem>
              <TabItem value="dot" label="DOT">
                <div className={styles.dot}>
                  {status === 'processing' ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Riple color="#3478c6" size="medium" />
                    </div>
                  ) : (
                    <CodeBlock language="dot">{dot}</CodeBlock>
                  )}
                </div>
              </TabItem>
            </Tabs>
          )}
        </div>
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
      await runTSGraphvizScript();
      setStatus('idle');
    }

    editor.onKeyDown(async (e: any) => {
      if (e.keyCode === monaco.KeyCode.KeyS && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setStatus('processing');
        setDot(null);
        await runTSGraphvizScript();
      }
    });

    async function runTSGraphvizScript() {
      const tsCode = editor.getValue();

      await instance.fs.writeFile('./diagram.ts', tsCode);
      const exec = await instance.spawn('node', ['./main.js']);
      console.log('exit', await exec.exit);
      const dot = await instance.fs.readFile('./diagram.dot', 'utf8');
      setDot(dot);
      await instance.fs.rm('./diagram.ts');
      await instance.fs.rm('./diagram.dot');
      setStatus('idle');
    }
  }
}

export default memo(TSGraphvizPreviewEditor);
