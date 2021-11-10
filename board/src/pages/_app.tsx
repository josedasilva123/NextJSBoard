import { AppProps } from 'next/app'
import '../../styles/global.scss'
import Header from '../components/Header'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {Provider as NextAuthProvider} from 'next-auth/client';

const initialOptions = {
  "client-id": "AWcDyU0dyMNCDUIpHQaE8kbRPczZasDr4WOxlHZ0wtauadb4Tt0eqcWjl5qIFXX5ejRv8NWeGVMETK9U",
  currency: "BRL",
  intent: "capture",
}

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <>
    <NextAuthProvider session={pageProps.session} >
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>      
    </NextAuthProvider>      
    </>
  )
}

export default MyApp
