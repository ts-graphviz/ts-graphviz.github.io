import Heading from '@theme/Heading';
import styles from './Features.module.css';

// NOTE: Get SVG from https://undraw.co/

const features = [
  {
    title: 'Fully Compatible with TypeScript/JavaScript',
    description: 'Achieve improved development efficiency and type safety.',
    Svg: require('@site/static/img/undraw_code_typing.svg').default,
  },
  {
    title: 'Various Tools and Libraries',
    description: 'Support your development with OSS libraries and GitHub Actions.',
    Svg: require('@site/static/img/undraw_bookshelves.svg').default,
  },
  {
    title: 'Harness the Power of Graphviz',
    description: 'Easily generate and manipulate complex graphs.',
    Svg: require('@site/static/img/undraw_omega.svg').default,
  },
  {
    title: 'Cross-Platform Support',
    description: 'Works in Node.js, Deno, and browser environments.',
    Svg: require('@site/static/img/undraw_progressive_app.svg').default,
  },
  {
    title: 'Customizable and Extensible',
    description: 'Extend the library\'s type system to meet specific needs.',
    Svg: require('@site/static/img/undraw_bibliophile.svg').default,
  },
];

const Features: React.FC = () => (
  <section id="features" className={styles.features}>
    <h2>Why Choose ts-graphviz?</h2>
    <div className={styles.featureList}>
      {features.map(({ title, Svg, description}) => (
        <div key={title} className={styles.featureItem}>
          <div className="text--center">
            <Svg className={styles.featureSvg} role="img" />
          </div>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
