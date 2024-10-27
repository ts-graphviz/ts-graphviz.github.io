import sdk, { type EmbedOptions, type Project } from '@stackblitz/sdk';
import React, { useEffect, useRef } from 'react';

interface Props extends Project {
  options?: EmbedOptions;
}

function StackBlitz({ options, ...project }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        await sdk.embedProject(ref.current, project, options);
      })();
    }
    return () => {};
  }, [ref, project, options]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
      }}
      ref={ref}
    />
  );
}

export default React.memo(StackBlitz);
