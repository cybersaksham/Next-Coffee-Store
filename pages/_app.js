import Head from "next/head";
import "../styles/globals.css";
import StoreProvider from "../Context/Store/StoreProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Head>
        <title>iCoffee2 - The Future of Coffee</title>
        <meta
          name="description"
          content="A platform for your favourite coffee stores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
