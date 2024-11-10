import { WebContainer } from '@webcontainer/api';
import {
  type FC,
  type ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Container {
  status: Status;
  init(): Promise<void>;
  run(script: string): Promise<string>;
}

const ContainerContext = createContext<Container | null>(null);

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

type Status = 'booted' | 'installing' | 'ready' | 'processing';

export const ContainerProvider: FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const [instance, setInstance] = useState<WebContainer>();
    const [status, setStatus] = useState<Status>();
    useEffect(() => {
      (async () => {
        const instance = await WebContainer.boot({
          coep: 'none',
        });
        setStatus('booted');
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
        setInstance(instance);
      })();
    }, [setStatus, setInstance]);

    const init = useCallback(async () => {
      if (!instance || status !== 'booted') {
        return;
      }
      setStatus('installing');
      const install = await instance.spawn('npm', ['install']);
      if ((await install.exit) === 0) {
        setStatus('ready');
      }
    }, [instance, status, setStatus]);

    const run = useCallback(
      async (script: string) => {
        console.log('run', script, instance, status);
        if (!instance || status !== 'ready') {
          return;
        }
        setStatus('processing');
        try {
          await instance.fs.writeFile('./diagram.ts', script);
          const exec = await instance.spawn('node', ['./main.js']);
          console.log('exit', await exec.exit);
          return await instance.fs.readFile('./diagram.dot', 'utf8');
        } finally {
          await instance.fs.rm('./diagram.ts', { force: true });
          await instance.fs.rm('./diagram.dot', { force: true });
          setStatus('ready');
        }
      },
      [instance, status, setStatus],
    );

    return (
      <ContainerContext.Provider value={{status, init, run}}>
        {children}
      </ContainerContext.Provider>
    );
  },
);

export const useContainer = (): Container => {
  const {status, init, run } = useContext(ContainerContext);
  useEffect(() => {
    if (status === 'booted') {
      init();
    }
  }, [status, init]);
  return {status, init, run};
};
