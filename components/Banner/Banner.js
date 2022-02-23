import { useContext } from "react";
import StoreContext from "../../Context/Store/StoreContext";
import styles from "./Banner.module.css";

const Banner = (props) => {
  const { isFinding } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>iCoffee </span>
        <span className={styles.title2}>Stores</span>
      </h1>
      <p className={styles.subTitle}>Discover your hang out point for coffee</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.buttonHandler}>
          {isFinding ? "Locating..." : props.buttonText}
        </button>
      </div>
    </div>
  );
  ``;
};

export default Banner;
