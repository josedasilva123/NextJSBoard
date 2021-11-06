import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import FirebaseDatabase from "../../services/firebaseConnect";
import { doc, getDoc } from "firebase/firestore";
import styles from './task.module.scss';
import Head from 'next/head';
import { FiCalendar } from "react-icons/fi";

const Task = ({id}) => {
  const [task, setTask] = React.useState({});

  React.useEffect(() => {
      async function loadTask(){        
        const taskRef = doc(FirebaseDatabase, "tarefas", String(id));
        const taskData = await getDoc(taskRef);        
        setTask(taskData.data());
      }
      loadTask();   
  }, []);
  
  return (
      <>
        <Head>
            <title>Detalhes da sua tarefa</title>
        </Head>
        <article className={styles.container}>
            <div className={styles.actions}>
              <div>
                <FiCalendar size={30} color="#FFF"/>
                <span>Tarefa criada: </span>
                <time>{task.created}</time>
              </div>                
            </div>
            <p>{task.tarefa}</p>
        </article>
      </>
  );
};

export const getServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const {id} = params;
 
  if (!session?.id) {
    //Se o user não estiver logado
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
        id,
    },
  };
};

export default Task;
