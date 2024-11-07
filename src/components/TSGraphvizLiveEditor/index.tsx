import { type ColorMode, useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Editor as Monaco, useMonaco } from '@monaco-editor/react';
import type monaco_editor from 'monaco-editor';
import type { editor } from 'monaco-editor';
import { memo, useCallback, useEffect, useMemo } from 'react';

interface Props {
  script: string;
  onMount?: (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof monaco_editor,
  ) => void;
  readOnly?: boolean;
}

const MONACO_THEMES: Record<ColorMode, string> = {
  dark: 'vs-dark',
  light: 'vs',
} as const;

function TSGraphvizLiveEditor({
  script,
  // Auto resize the editor to fit the content height
  onMount,
  readOnly,
}: Props): JSX.Element {
  const monaco = useMonaco();
  const { colorMode } = useColorMode();
  // Memoize theme to prevent unnecessary re-renders
  const editorTheme = useMemo(
    () => (colorMode === 'dark' ? MONACO_THEMES.dark : MONACO_THEMES.light),
    [colorMode],
  );
  const onMountCallback = useCallback(
    onMount ??
      ((editor: editor.IStandaloneCodeEditor) => {
        const lineHeight = editor.getOption(
          monaco.editor.EditorOption.lineHeight,
        );
        const currentLayout = editor.getLayoutInfo();
        const MIN_HEIGHT = 100;
        const MAX_HEIGHT = 500;
        const PADDING = 10;
        resize();

        // Auto-resize on content changes
        if (!readOnly) {
          editor.getModel().onDidChangeContent(() => {
            resize();
          });
        }
        function resize() {
          const newHeight = Math.min(
            Math.max(
              editor.getModel().getLineCount() * lineHeight + PADDING,
              MIN_HEIGHT,
            ),
            MAX_HEIGHT,
          );
          editor.layout({
            height: newHeight,
            width: currentLayout.contentWidth,
          });
        }
      }),
    [monaco, readOnly],
  );
  const dtsUrl = useBaseUrl('/dts.json');
  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
      });
      fetch(dtsUrl)
        .then((res) => res.json())
        .then((libs) => {
          monaco.languages.typescript.typescriptDefaults.setExtraLibs(libs);
        });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    }
  }, [monaco]);
  return (
    <>
      {monaco ? (
        <Monaco
          defaultLanguage="typescript"
          defaultValue={script}
          defaultPath="file:///index.ts"
          language="typescript"
          theme={editorTheme}
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
          onMount={onMountCallback}
        />
      ) : null}
    </>
  );
}

export default memo(TSGraphvizLiveEditor);
