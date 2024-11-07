import type { Code, Literal } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';


// biome-ignore lint/complexity/noBannedTypes: Preliminary implementation for future plugin extensibility.
type PluginOptions = {};

type CodeBlockOptions = {
  readOnly: boolean;
};

const transformNode = (code: Code) => {
  const script = code.value;
  const options = getTSGraphvizOptions(code);
  return [
    {
      type: 'mdxJsxFlowElement',
      name: 'TSGraphvizLiveEditor',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'script',
          value: script,
        },
        {
          type: 'mdxJsxAttribute',
          name: 'readOnly',
          value: options.readOnly ? 'true' : 'false',
        },
      ],
      children: [],
    },
  ] as any[];
};

const isMdxEsmLiteral = (node: Node): node is Literal =>
  node.type === 'mdxjsEsm';

const isTSGraphvizLiveEditorImport = (node: Node): boolean =>
  isMdxEsmLiteral(node) &&
  node.value.includes('@site/src/components/TSGraphvizLiveEditor');

const isParent = (node: Node): node is Parent =>
  Array.isArray((node as Parent).children);
const isTSGraphvizScript = (node: Node): node is Code =>
  node.type === 'code' && (node as Code).meta?.startsWith('ts-graphviz');

const getTSGraphvizOptions = (code: Code): CodeBlockOptions => {
  const options = code.meta ? code.meta.split(':').slice(1) : [];
  return {
    readOnly: options.includes('read-only'),
  };
};

function createImportNode() {
  return {
    type: 'mdxjsEsm',
    value:
      "import TSGraphvizLiveEditor from '@site/src/components/TSGraphvizLiveEditor'",
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: { type: 'Identifier', name: 'TSGraphvizLiveEditor' },
              },
            ],
            source: {
              type: 'Literal',
              value: '@site/src/components/TSGraphvizLiveEditor',
              raw: "'@site/src/components/TSGraphvizLiveEditor'",
            },
          },
        ],
        sourceType: 'module',
      },
    },
  };
}

const plugin: Plugin<[PluginOptions?]> = (options = {}): Transformer => {
  return async (root) => {
    const { visit } = await import('unist-util-visit');

    let transformed = false;
    let alreadyImported = false;

    visit(root, (node: Node) => {
      if (isTSGraphvizLiveEditorImport(node)) {
        alreadyImported = true;
      }

      if (isParent(node)) {
        let index = 0;
        while (index < node.children.length) {
          const child = node.children[index]!;
          if (isTSGraphvizScript(child)) {
            const result = transformNode(child);
            node.children.splice(index, 1, ...result);
            index += result.length;
            transformed = true;
          } else {
            index += 1;
          }
        }
      }
    });

    if (transformed && !alreadyImported) {
      (root as Parent).children.unshift(createImportNode());
    }
  };
};

export default plugin;
