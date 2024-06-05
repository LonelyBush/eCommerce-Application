import styles from './loading.module.css';

function Loading() {
  return (
    <section className={styles.dotSpinner}>
      <div className={styles.loadingContainer}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </section>
  );
}

export default Loading;
// main idea was taken from https://codepen.io/timhilton/pen/ZEVzRgG
