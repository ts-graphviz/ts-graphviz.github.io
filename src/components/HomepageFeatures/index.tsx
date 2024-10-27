import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'TypeScript-friendly API',
    Svg: require('@site/static/img/undraw_code_typing.svg').default,
    description: (
      <>
        It provides models in the DOT language. TypeScript type definitions are
        also provided for attributes and even attribute types.
      </>
    ),
  },
  {
    title: 'Freedom from programming paradigms',
    Svg: require('@site/static/img/undraw_omega.svg').default,
    description: (
      <>
        Designed to be object-oriented, it provides APIs that can be adapted to
        both imperative and declarative APIs. You can choose the paradigm that
        best fits your project.
      </>
    ),
  },
  {
    title: 'Modular and Extensible',
    Svg: require('@site/static/img/undraw_bookshelves.svg').default,
    description: (
      <>
        The library is split into multiple packages, each serving a specific
        purpose. This modular design allows users to pick and choose the
        functionality they need, resulting in improved maintainability and
        flexibility.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
