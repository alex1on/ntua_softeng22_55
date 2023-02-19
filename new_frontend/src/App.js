import { BrowserRouter, Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Questionnaire_render from './pages/questionnaire';
import Question_render from './pages/question';
import WebFont from 'webfontloader';
import styles from './styles/Home.module.css';
// import Head from 'next/head'
// import img from 'next/img'
//import { Inter } from '@next/font/google'


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Inter']
      }
    });
  }, []);

  return (


    <>
      <BrowserRouter>
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
                <img
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
            <img
              className={styles.logo}
              src="/images/logo-IntelliQ.png"
              alt="IntelliQ Logo"
              width={300}
              height={75}
              priority
            />
            <div className={styles.thirteen}>
              <img
                src="/images/profile.jpg" //Route of this file img in macbook
                alt="Cool photo for decoration"
                width={40}
                height={31}
                priority
              />
            </div>
          </div>


          <div className={styles.grid}>

            <a
              href="./questionnaire"
              className={styles.card}
              onClick={Questionnaire_render}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="font-loader">
                Fill a survey <span>-&gt;</span>
              </h2>
              <p className="font-loader">
                Help collecting more data by answering some questions.
              </p>
            </a>



            <a
              href="About"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="font-loader">
                Create your Survey <span>-&gt;</span>
              </h2>
              <p className="font-loader">
                Create your own questionnaire.
              </p>
            </a>

            <a
              href="/statistics"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="font-loader">
                Statistics <span>-&gt;</span>
              </h2>
              <p className="font-loader">
                Extract and get statistical results.
              </p>
            </a>

            <a
              href="/Preview"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="font-loader">
                Preview some of  the already created surveys <span>-&gt;</span>
              </h2>
              <p className="font-loader">
                Feel free to go through.
              </p>
            </a>
          </div>
        </main>
      </BrowserRouter>
    </>
  )
}

function Home() {
  return <h1>Home </h1>;
}


export default App

  // < div >
  // <BrowserRouter>
  //   <nav>
  //     <ul>
  //       <li>
  //         <Link to="/">Home</Link>
  //       </li>
  //       <li>
  //         <Link to="/questionnaire">Questionnaire</Link>
  //       </li>
  //       <li>
  //         <Link to="/question">Question</Link>
  //       </li>
  //     </ul>
  //   </nav>

  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/questionnaire" element={<Questionnaire_render />} />
  //     <Route path="/question" element={<Question_render />} />
  //   </Routes>
  // </BrowserRouter>
  //   </div >
