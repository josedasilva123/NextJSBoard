import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import {
  collection,  
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import FirebaseDatabase from "../../services/firebaseConnect";

import styles from "./styles.module.scss";
import {
  FiClock,
  FiPlus,
  FiTrash,
  FiCalendar,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import SupportButton from "../../components/SupportButton";
import { format } from "date-fns";

/*
interface BoardProps {
  user: {
    id: string;
    name: string;
  };
}
*/

const Board = ({ user , userData }) => {
  const [input, setInput] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  const [taskEdit, setTaskEdit] = React.useState(null);

  React.useEffect(() => {
   setTaskList(userData);
  }, []);

  async function handleAddTask(event: React.FormEvent) {
    event.preventDefault();
    if (input === "") {
      alert("Precha alguma tarefa!");
      return;
    }
    try {
      const docRef = await addDoc(collection(FirebaseDatabase, "tarefas"), {
        created: format(new Date(), "dd MMMM yyyy"),
        tarefa: input,
        userId: user.id,
        nome: user.name,
      });
      const data = {
        id: docRef.id,
        created: format(new Date(), "dd MMMM yyyy"),
        tarefa: input,
        userId: user.id,
        nome: user.name,
      };
      setTaskList([data, ...taskList]);
      setInput("");
      console.log("Deu certo! Tarefa cadastrada com sucesso! ");
    } catch (e) {
      console.error("Erro ao cadastrar... ", e);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(FirebaseDatabase, "tarefas", id));
      setTaskList(taskList.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditTask(event: React.FormEvent){
    event.preventDefault();
    const selectedTask = doc(FirebaseDatabase, "tarefas", taskEdit.id);

    await updateDoc(selectedTask, {
      tarefa: input
    });   

    const data = taskList;
    const taskIndex = taskList.findIndex(task => task.id === taskEdit.id);
    data[taskIndex].tarefa = input;
    setTaskEdit(null)
    setInput('');    
  }

  function handleEdit(task) {
    setTaskEdit(task);
    setInput(task.tarefa);
  }

  function handleCancelEdit(){
    setTaskEdit(null);
    setInput('');
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas</title>
      </Head>
      <main className={styles.container}>
        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={handleCancelEdit}>
              <FiX size={30} color="#FF3636" />
            </button>
            Você está editando uma tarefa!
          </span>
        )}
        <form onSubmit={taskEdit ? handleEditTask : handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">
            {taskEdit 
            ?
             (<FiEdit2 size={25} color="#17181f" />)
             :
             (<FiPlus size={25} color="#17181f" />)
            }            
          </button>
        </form>
        <h1>
          Você tem {taskList.length}{" "}
          {taskList.length === 1 ? "tarefa" : "tarefas"}
        </h1>

        <section>
          {taskList.map((task) => (
            <article className={styles.taskList} key={task.id}>
              <Link href={`board/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.created}</time>
                  </div>
                  <button onClick={() => handleEdit(task)}>
                    <FiEdit2 size={20} color="#fff" />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto!</h3>
        <div>
          <FiClock size={28} color="#fff" />
          <time>Última doação foi a 3 dias.</time>
        </div>
      </div>

      <SupportButton />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  
  

  if (!session?.id) {
    //Se o user não estiver logado
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    id: session?.id,
    name: session?.user.name,
  };

  const response = await fetch('https://firestore.googleapis.com/v1/projects/boardapp-15d3d/databases/(default)/documents/tarefas/');
  const json = await response.json();

  const data = json.documents.map(user => {
    return{
      id: user.name.replace('projects/boardapp-15d3d/databases/(default)/documents/tarefas/',''),
      created: user.fields.created.stringValue,
      tarefa: user.fields.tarefa.stringValue,
      userId: user.fields.userId.stringValue,
      nome: user.fields.nome.stringValue,
    } 
  });   
  const userData = data.filter(element => element.userId == user.id);   

  return {
    props: {
      userData,
      user,
    },
  };
};

export default Board;
