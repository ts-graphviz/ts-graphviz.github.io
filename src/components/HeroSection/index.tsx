import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

const HeroSection: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.hero}>
      <img src="/img/logo.png" alt="ts-graphviz" />
      <Heading as="h1">
        <Translate id="HeroSection.title">{siteConfig.tagline}</Translate>
      </Heading>
      <p>
        <Translate id="HeroSection.title">
          Simplify graph visualization with a variety of tools.
        </Translate>
      </p>
      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg"
          to="/docs/ts-graphviz/getting-started/Installation"
        >
          <Translate id="index.tutorial">Get Started 🚀</Translate>
        </Link>
        <Link className="button button--secondary button--lg" to="/playground">
          <Translate id="index.tutorial">Playground 🎡</Translate>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
