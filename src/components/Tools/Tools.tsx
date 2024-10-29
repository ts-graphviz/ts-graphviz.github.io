import styles from './Tools.module.css';

// NOTE: Get icons from https://simpleicons.org/

const tools = [
  {
    name: 'ts-graphviz Library',
    description: 'Use Graphviz features with TypeScript.',
    Svg: require('@site/static/img/npm.svg').default,
    fill: '#CB3837',
    link: 'https://github.com/ts-graphviz/ts-graphviz',
  },
  {
    name: 'setup-graphviz',
    description: 'Simplify Graphviz setup in CI environments.',
    Svg: require('@site/static/img/githubactions.svg').default,
    fill: '#2088FF',
    link: 'https://github.com/ts-graphviz/setup-graphviz',
  },
];

const Tools: React.FC = () => (
  <section id="tools" className={styles.tools}>
    <h2>Our Tools and Libraries</h2>
    <div className={styles.toolList}>
      {tools.map((tool) => (
        <div key={tool.name} className={styles.toolItem}>
          <div className={styles.toolItemHeader}>
            <h3>{tool.name}</h3>
            <tool.Svg fill={tool.fill} className={styles.toolSvg} role="img" />
          </div>
          <p>{tool.description}</p>
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Tools;
