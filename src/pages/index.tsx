import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Features from '@site/src/components/Features/Features';
import HeroSection from '@site/src/components/HeroSection';
import Tools from '@site/src/components/Tools/Tools';

export default function LandingPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <HeroSection />
      <main>
        <Features />
        <Tools />
      </main>
    </Layout>
  );
}
