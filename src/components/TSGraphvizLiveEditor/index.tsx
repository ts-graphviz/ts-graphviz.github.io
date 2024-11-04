// import { useColorMode } from '@docusaurus/theme-common';
import { Editor as Monaco, useMonaco } from '@monaco-editor/react';
import type monaco_editor from 'monaco-editor';
import type { editor } from 'monaco-editor';
import { memo, useEffect } from 'react';

interface Props {
  script: string;
  height?: number | string;
  onMount?: (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof monaco_editor,
  ) => void;
  readOnly?: boolean;
}

function TSGraphvizLiveEditor({
  script,
  height,
  onMount,
  readOnly,
}: Props): JSX.Element {
  const monaco = useMonaco();
  // const { colorMode } = useColorMode();
  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
      });

      fetch('/dts.json')
        .then((res) => res.json())
        .then((libs) => {
          monaco.languages.typescript.typescriptDefaults.setExtraLibs(libs);
        });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });
    }
  }, [monaco]);
  return (
    <>
      {monaco ? (
        <Monaco
          height={height}
          defaultLanguage="typescript"
          defaultValue={script}
          defaultPath="file:///index.ts"
          language="typescript"
          // theme={colorMode === 'dark' ? 'vs-dark' : 'vs'}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'off',
            renderLineHighlight: 'none',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollBeyondLastLine: false,
            lineDecorationsWidth: 0,
            readOnly,
          }}
          onMount={onMount}
        />
      ) : null}
    </>
  );
}

export default memo(TSGraphvizLiveEditor);
