import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";
import styles from "../styles/Home.module.css";

const Home = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
  }, []);

  return (
    <>
      <br />
      <ul>
        <main className={styles.main}>
          <div className="flex flex-row spacing-x-10 justify-between">
            <div className={styles.description + " w-[10em]"}>
              <p>
                Get started by filling some surveys, that look and feel
                great.&nbsp;
                <code className={styles.code}></code>
              </p>
              <div className="flex flex-row">
                <li>
                  <Link
                    to="/Login"
                    className={styles.card}
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
                  </Link>{" "}
                </li>
              </div>
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
          <div className="flex flex-row justify-center space-x-4">
            <div className={styles.card + " w-[15em]"}>
              <Link to="/questionnaire">
                <h2 className="font-loader">
                  Fill a survey <span>-&gt;</span>
                </h2>
                <p className="font-loader">
                  Help collecting more data by answering some questions.
                </p>
              </Link>
            </div>
            <div className={styles.card + " w-[15em]"}>
              <Link to="/About" target="_blank" rel="noopener noreferrer">
                <h2 className="font-loader">
                  Create your Survey <span>-&gt;</span>
                </h2>
                <p className="font-loader">Create your own questionnaire.</p>
              </Link>
            </div>
            <div className={styles.card + " w-[15em]"}>
              <Link to="/Statistics" target="_blank" rel="noopener noreferrer">
                <h2 className="font-loader">
                  Statistics <span>-&gt;</span>
                </h2>
                <p className="font-loader">
                  Extract and get statistical results.
                </p>
              </Link>
            </div>
            <div className={styles.card + " w-[15em]"}>
              <Link to="/#" target="_blank" rel="noopener noreferrer">
                <h2 className="font-loader">
                  Preview some of the already created surveys <span>-&gt;</span>
                </h2>
                <p className="font-loader">Feel free to go through.</p>
              </Link>
            </div>
          </div>
        </main>
      </ul>
    </>
  );
};

export default Home;
