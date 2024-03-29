import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import { useRouter } from "next/router";
// import coffeeStores from "../../data/coffee-store.json";
import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useState, useEffect } from "react";
import StoreContext from "../../Context/Store/StoreContext";
import { fetcher, isEmpty } from "../../utils";
import useSWR from "swr";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((store) => {
    return store.id.toString() === params.id;
  });

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  // Used for static rendering of dynamic routes
  // Provide all paths to render statically
  // Provide fallback false to give 404 error on paths not included here
  // If fallback is true then on first request it will be loaded and then on further request it got statically stored

  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: String(store.id),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { id } = router.query;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const { nearbyStores } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (data) => {
    try {
      const { id, name, address, neighbourhood, imgUrl } = data;

      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          address: address || "",
          neighbourhood: neighbourhood || "",
          imgUrl,
        }),
      });

      const json = await response.json();
      if (response.status === 200) setCoffeeStore(json);
    } catch (err) {
      console.error("Error in creating", err);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (nearbyStores) {
        if (nearbyStores.length > 0) {
          const coffeeStoreFromContext = nearbyStores.find((store) => {
            return store.id.toString() === id; //dynamic id
          });

          if (coffeeStoreFromContext) {
            setCoffeeStore(coffeeStoreFromContext);
            handleCreateCoffeeStore(coffeeStoreFromContext);
          }
        }
      } else {
        // CSG
        handleCreateCoffeeStore({ id });
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  const {
    name = "",
    imgUrl = "",
    address = "",
    neighbourhood = "",
  } = coffeeStore;

  const [votes, setVotes] = useState(0);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.name) {
      setCoffeeStore(data);
      setVotes(data.votes);
    }
  }, [data]);

  // If fallback is true then it taked some time to load data and push statically if not present
  // So show loading state till then otherwise will give error
  if (router.isFallback) return <div>Loading...</div>;

  const handleUpvoteButton = async () => {
    setVotes(votes + 1);
    try {
      const response = await fetch("/api/increaseVotes?id=" + id, {
        method: "PUT",
      });

      const json = await response.json();
    } catch (err) {
      console.error("Error increasing votes", err);
    }
  };

  if (error) {
    return <div>Coffee store not found</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`}></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{address || address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="near me icon"
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            {/* <p className={styles.text}>{votingCount}</p> */}
            <p className={styles.text}>{votes}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
