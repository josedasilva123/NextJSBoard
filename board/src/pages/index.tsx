import React from 'react';
import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Home({data}) {
  const [donaters, setDonaters] = React.useState([]);

  React.useEffect(() => { 
    setDonaters(data); 
  }, [])

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
          {donaters.map(donator => (
            <img key={donator.id} src={donator.image} alt={donator.nome} title={donator.nome} />
          ))}
        </div>
      </main>      
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {  
  const response = await fetch('https://firestore.googleapis.com/v1/projects/boardapp-15d3d/databases/(default)/documents/usuarios/');
  const json = await response.json();

  const data = json.documents.map(user => {
    return{
      id: user.fields.id.stringValue,
      nome: user.fields.nome.stringValue,
      image: user.fields.image.stringValue,
    } 
  });    
  
  return{
    props: {
      data,
    },
    revalidate: 60 * 60,
  }
}
