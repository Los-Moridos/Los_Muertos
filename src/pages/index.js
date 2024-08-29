import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/liga/2024/">
            Botón Para hacer cosa
          </Link>
        </div>
      </div>
    </header>
  );
}

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Bienvenido a ${siteConfig.title}`}
//       description="Comunidad Hispanohablante Dedicada a Overwatch 2.">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }
export default function Home() {
  return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '2rem',
          userSelect: 'none',
        }}
      >
        <a 
          href="docs/liga/2024"
          style={{
            fontSize: '2rem',
            userSelect: 'none',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}>
          TRABAJO EN PROCESO 😉</a>
      </div>
  );
}