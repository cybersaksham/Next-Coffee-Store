import styles from "../styles/Home.module.css";
import Card from "./Card/Card";

const Stores = (props) => {
  return (
    <>
      {props.coffeeStores.length > 0 && (
        <div className={styles.sectionWrapper}>
          <div style={{ marginTop: "80px" }}>
            <h2 className={styles.heading2}>{props.placeName}</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    name={store.name}
                    href={`/coffee-store/${store.id}`}
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
        </div>
      )}
    </>
  );
};

export default Stores;
