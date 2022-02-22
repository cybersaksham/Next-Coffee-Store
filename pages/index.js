import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import styles from "../styles/Home.module.css";
import coffeeStores from "../data/coffee-store.json";

export async function getStaticProps(context) {
  // This data will be downloaded on build time for static site rendereing\
  // Used for data which does not change dynamically
  // Store api calls which does not change in it
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
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    name={store.name}
                    href={`/coffee-store/${store.id}`}
                    imgUrl={store.imgUrl}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
