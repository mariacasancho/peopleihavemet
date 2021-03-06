import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';

import { Button } from 'antd';
import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>People I have met</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>people I have met</h1>

        {auth.user ?
          (
            <Button href="/dashboard">
              View dashboard
        </Button>
          ) :
          (
            <button onClick={(e) => auth.signin()}> sign in</button>
          )
        }
      </main>

    </div>
  );
}