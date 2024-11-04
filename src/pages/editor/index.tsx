import TSGraphvizPreviewEditor from '@site/src/components/TSGraphvizPreviewEditor';
import Layout from '@theme/Layout';

const script = `import { digraph, attribute as _ } from 'ts-graphviz';

digraph('state_machine', { [_.newrank]: true }, (g) => {
  g.node({ shape: 'circle' });

  g.edge(['Model', 'DOT'], { [_.label]: 'toDot', [_.constraint]: false });
  g.edge(['AST', 'DOT'], { [_.label]: 'stringify' });
  g.edge(['DOT', 'AST'], { [_.label]: 'parse' });
  g.edge(['Model', 'AST'], { [_.label]: 'fromModel' });
  g.edge(['AST', 'Model'], { [_.label]: 'toModel' });
  g.edge(['DOT', 'Model'], { [_.label]: 'fromDot', [_.constraint]: false });
});
`;

export default function Editor(): JSX.Element {
  return (
    <Layout title={`Playground of ts-graphviz diagram`}>
      <h1>Editor</h1>
      <TSGraphvizPreviewEditor script={script} height={600} />
    </Layout>
  );
}
