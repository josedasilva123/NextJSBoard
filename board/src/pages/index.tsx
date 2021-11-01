import styles from "../../styles/home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <div>
        <h1 className={styles.title}>
          Primeiro projeto <span>NextJS</span>
        </h1>
      </div>      
    </>
  );
}
