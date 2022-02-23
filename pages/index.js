import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import styles from "../styles/Home.module.css";
// import coffeeStores from "../data/coffee-store.json";

export async function getStaticProps(context) {
  // This data will be downloaded on build time for static site rendereing\
  // Used for data which does not change dynamically
  // Store api calls which does not change in it

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const nearbySearch = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>iCoffee - The Future of Coffee</title>
        <meta
          name="description"
          content="A platform for your favourite coffee stores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="Search Nearby" buttonHandler={nearbySearch} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 className={styles.heading2}>New Delhi Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.fsq_id}
                    name={store.name}
                    href={`/coffee-store/${store.fsq_id}`}
                    imgUrl={
                      store.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
