import "../styles/globals.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from 'aos';
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
