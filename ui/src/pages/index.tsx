import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import GradientBG from "../components/GradientBG.js";
import styles from "../styles/Home.module.css";
import heroMinaLogo from "../../public/assets/hero-mina-logo.svg";
import arrowRightSmall from "../../public/assets/arrow-right-small.svg";

export default function Home() {
  if (typeof window !== "undefined") {
    if (window.crossOriginIsolated) {
      console.log("Host Cross-origin isolation is enabled!");
    } else {
      console.log("Host Cross-origin isolation is NOT enabled!");
    }
  }
  useEffect(() => {
    // Event listener for messages from the parent window
    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:5173") {
        // Security check
        console.log("Received message from parent:", event.data);

        // Send a response back to the parent
        window.parent.postMessage(event.data + 1, "http://localhost:5173");
      }
    });
    (async () => {
      const { Field } = await import("o1js");
      const { Main } = await import("../../../contracts/build/src/");

      console.log("generating keypair...");
      console.time("generating keypair...");
      const kp = await Main.generateKeypair();
      console.timeEnd("generating keypair...");

      console.log("prove...");
      console.time("prove...");
      const x = Field(8);
      const y = Field(2);
      const proof = await Main.prove([y], [x], kp);
      console.timeEnd("prove...");

      console.log("verify...");
      console.time("verify...");
      let vk = kp.verificationKey();
      let ok = await Main.verify([x], vk, proof);
      console.timeEnd("verify...");

      console.log("ok?", ok);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>
        <main className={styles.main}>
          <div className={styles.center}>
            <a
              href="https://minaprotocol.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src={heroMinaLogo}
                alt="Mina Logo"
                width="191"
                height="174"
                priority
              />
            </a>
            <p className={styles.tagline}>
              built with
              <code className={styles.code}> o1js</code>
            </p>
          </div>
          <p className={styles.start}>
            Get started by editing
            <code className={styles.code}> src/pages/index.js</code> or{" "}
            <code className={styles.code}> src/pages/index.tsx</code>
          </p>
          <div className={styles.grid}>
            <a
              href="https://docs.minaprotocol.com/zkapps"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                <span>DOCS</span>
                <div>
                  <Image
                    src={arrowRightSmall}
                    alt="Mina Logo"
                    width={16}
                    height={16}
                    priority
                  />
                </div>
              </h2>
              <p>Explore zkApps, how to build one, and in-depth references</p>
            </a>
            <a
              href="https://docs.minaprotocol.com/zkapps/tutorials/hello-world"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                <span>TUTORIALS</span>
                <div>
                  <Image
                    src={arrowRightSmall}
                    alt="Mina Logo"
                    width={16}
                    height={16}
                    priority
                  />
                </div>
              </h2>
              <p>Learn with step-by-step o1js tutorials</p>
            </a>
            <a
              href="https://discord.gg/minaprotocol"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                <span>QUESTIONS</span>
                <div>
                  <Image
                    src={arrowRightSmall}
                    alt="Mina Logo"
                    width={16}
                    height={16}
                    priority
                  />
                </div>
              </h2>
              <p>Ask questions on our Discord server</p>
            </a>
            <a
              href="https://docs.minaprotocol.com/zkapps/how-to-deploy-a-zkapp"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                <span>DEPLOY</span>
                <div>
                  <Image
                    src={arrowRightSmall}
                    alt="Mina Logo"
                    width={16}
                    height={16}
                    priority
                  />
                </div>
              </h2>
              <p>Deploy a zkApp to Berkeley Testnet</p>
            </a>
          </div>
        </main>
      </GradientBG>
    </>
  );
}
