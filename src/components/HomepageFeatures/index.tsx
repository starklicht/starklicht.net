import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built by the community',
    Svg: '/img/wireframe-orthogonal.png',
    description: (
      <>
        Starklicht is an open-source project built by a passionate community of developers and enthusiasts. We welcome contributions and ideas to make it even better!
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: '/img/wireframe-top.png',
    description: (
      <>
        Starklicht is fully open source (GPL-3.0), allowing anyone to inspect, modify, and contribute to the codebase. Join us in building a brighter future!
      </>
    ),
  },
  {
    title: 'Cheap and Affordable',
    Svg: '/img/wireframe-left.png',
    description: (
      <>
        Starklicht is designed to be cost-effective, making it accessible to everyone. Enjoy high-quality lighting solutions without breaking the bank! One device costs around 150€.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px'}}>
        <img src={Svg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
