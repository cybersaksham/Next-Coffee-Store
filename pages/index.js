import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import Stores from "../components/Stores";
import StoreContext from "../Context/Store/StoreContext";
import useTrackLocation from "../Hooks/UseTrackLocation";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import { StoreActions } from "../Reducers";
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
  const { locationErrorMsg, handleTrackLocation } = useTrackLocation();
  // const [nearbyStores, setNearbyStores] = useState(null);
  const { latLong, nearbyStores, dispatch } = useContext(StoreContext);

  useEffect(async () => {
    if (latLong) {
      try {
        dispatch({
          type: StoreActions.SET_IS_FINDING,
          payload: { isFinding: true },
        });
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 25);
        // setNearbyStores(fetchedCoffeeStores);
        dispatch({
          type: StoreActions.SET_NEARBY_STORES,
          payload: { nearbyStores: fetchedCoffeeStores },
        });
        dispatch({
          type: StoreActions.SET_IS_FINDING,
          payload: { isFinding: false },
        });
      } catch {}
    }
  }, [latLong]);

  const nearbySearch = () => {
    dispatch({
      type: StoreActions.SET_IS_FINDING,
      payload: { isFinding: true },
    });
    handleTrackLocation();
    dispatch({
      type: StoreActions.SET_IS_FINDING,
      payload: { isFinding: false },
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner buttonText="Search Nearby" buttonHandler={nearbySearch} />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {nearbyStores && (
          <Stores placeName="Stores near you" coffeeStores={nearbyStores} />
        )}
        <Stores
          placeName="New Delhi Stores"
          coffeeStores={props.coffeeStores}
        />
      </main>
    </div>
  );
}
