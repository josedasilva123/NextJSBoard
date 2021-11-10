import React from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { addDoc, collection } from "@firebase/firestore";
import FirebaseDatabase from "../../services/firebaseConnect";

interface donateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

const Donate = ({ user }: donateProps) => {
  const [vip, setVip] = React.useState(false);
  async function handleSaveDonate() {
    const docRef = await addDoc(collection(FirebaseDatabase, "user"), {
      donate: true,
      lastDonate: new Date(),
      image: user.image,
    });
    setVip(true);
  }

  return (
    <>
      <Head>
        <title>Ajuda a pltaforma board fica online!</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/Rocket.svg" alt="Seja Apoiador" />

        {vip && (
            <div className={styles.vip}>
            <img src={user.image} alt="Foto de perfil do usuário" />
            <span>Parabéns você é um novo apoiador.</span>
            </div>
        )}
        <h1>Seja um apoiador deste projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$1,00</span>
        </h3>
        <strong>
          Apareça na nossa home, tenha funcionalidades exclusivas!
        </strong>
        <PayPalButtons
          createOrder=
          {(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "2.00",
                  },
                },
              ],
            });
          }}
          onApprove=
          {(data, actions) => {
            return actions.order.capture().then(function (details) {
              console.log("Compra aprovada" + details.payer.name.given_name);
              handleSaveDonate();
            });
          }}>
        </PayPalButtons>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };
  return {
    props: {
      user,
    },
  };
};

export default Donate;
