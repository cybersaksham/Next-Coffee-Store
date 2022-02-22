import styles from "./Banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>iCoffee </span>
        <span className={styles.title2}>Stores</span>
      </h1>
      <p className={styles.subTitle}>Discover your hang out point for coffee</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
