import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="images/NotebookTasks.svg" alt="Ferramenta board" />
        <section className={styles.callToAction}>
          <h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..</h1>
          <p>
            <span>100% Gratuita</span> e online
          </p>
        </section>
        <div className={styles.donators}>
          <img src="/images/Girl.jfif" alt="Usuário 1" />
          <img src="/images/Girl.jfif" alt="Usuário 1" />
          <img src="/images/Girl.jfif" alt="Usuário 1" />
        </div>
      </main>      
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return{
    props: {

    },
    revalidate: 60 * 60,
  }
}
