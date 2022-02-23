import "../styles/globals.css";
import StoreProvider from "../Context/Store/StoreProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
