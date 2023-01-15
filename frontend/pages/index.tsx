import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>IntelliQs</title>
        <meta name="Fill a Survey" content="Help getting more data by answering some questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by filling some surveys, that look and feel great.&nbsp;
            <code className={styles.code}></code>
          </p>
          <div>
            
           <a
             href="/login"
             target="_blank"
             rel="noopener noreferrer"
            >
              <Image
                src="/images/Login.jpg"
                alt="Login Picture Logo"
                className={styles.vercelLogo}
                width={40}
                height={40}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/images/logo-IntelliQ.png"
            alt="IntelliQ Logo"
            width={300}
            height={75}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/images/profile.jpg" //Route of this file image in macbook
              alt="Cool photo for decoration"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="/Create"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Fill a survey <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Help collecting more data by answering some questions.
            </p>
          </a>

          <a
            href="About"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Create a new Survey <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Create your own survey
            </p>
          </a>

          <a
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Results <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Extract and use statistical results.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Watch the already created surveys <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Go through
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
