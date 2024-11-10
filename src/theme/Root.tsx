import { GraphvizProvider } from '@site/src/contexts/Graphviz';
import { ContainerProvider } from '@site/src/contexts/WebContainer';

const Root = ({ children }) => {
  return (
    <ContainerProvider>
      <GraphvizProvider>{children}</GraphvizProvider>
    </ContainerProvider>
  );
};

export default Root;
