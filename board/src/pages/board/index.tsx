import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { collection, addDoc } from "firebase/firestore";
import FirebaseDatabase from '../../services/firebaseConnect';


import styles from "./styles.module.scss";
import { FiClock, FiPlus, FiTrash } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import SupportButton from "../../components/SupportButton";


interface BoardProps{
  user: {
    id: string;
    name: string;
  },
}

const board = ({user}: BoardProps) => {
  const [input, setInput] = React.useState('');
  console.log(user.name);
  console.log(user.id);

  async function handleAddTask(event: React.FormEvent){
    event.preventDefault();
    if(input === ''){
      alert('Precha alguma tarefa!');
      return;
    }
    try {
      const docRef = await addDoc(collection(FirebaseDatabase, "tarefas"), {
        created: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.name,
      });
      console.log("Deu certo! Tarefa cadastrada com sucesso! ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    console.log(input);
  }
  return (
    <>
      <Head>
          <title>Minhas tarefas</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input 
          type="text" 
          placeholder="Digite sua tarefa..." 
          value={input}
          onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>
        <h1>Você tem 2 tarefas!</h1>

        <section>
            <article className={styles.taskList}>
                <p>Aprender criar projetos usando Next JS e aplicando firebase como back.</p>
                <div className={styles.actions}>
                    <div>
                        <div>
                            <FiCalendar size={20} color="#FFB800"/>
                            <time>17 Junho 2021</time>   
                        </div> 
                        <button>
                            <FiEdit2 size={20} color="#fff" />
                            <span>Editar</span>
                        </button>
                    </div>

                    <button>
                        <FiTrash size={20} color="#FF3636" />
                        <span>Excluir</span>
                    </button>
                </div>
            </article>
        </section>
      </main>

      <div className={styles.vipContainer}>
          <h3>Obrigado por apoiar esse projeto!</h3>
          <div>
              <FiClock size={28} color="#fff" />
              <time>
                Última doação foi a 3 dias. 
              </time>
          </div>
      </div>
      
      <SupportButton />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req});
  
  if(!session?.id){
    //Se o user não estiver logado
    return{
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }
  const user = {    
    id: session?.id,
    name: session?.user.name,
  }

  return{
    props: {
      user
    }
  }
};

export default board;
