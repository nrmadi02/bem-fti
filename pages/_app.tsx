import "../styles/globals.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from 'aos';
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);
  return (
    <SessionProvider session={session} >
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;
