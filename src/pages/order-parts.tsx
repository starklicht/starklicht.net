import Contact from '@site/src/components/Contact';
import Layout from '@theme/Layout';
import { ReactNode } from 'react';

export default function Home(): ReactNode {
   return <Layout
      description="Description will go into a meta tag in <head />">
      <main>
        <h1 style={{textAlign: 'center', margin: '2rem 0 1.5rem 0'}}>Order Parts / Subscribe for Launch</h1>
        <Contact />
      </main>
    </Layout>
}