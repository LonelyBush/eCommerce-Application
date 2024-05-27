import Button from '../../components/ui/button/button';
import Tags from '../../components/ui/tags/tags';
import styles from './not-found.module.css';

function NotFoundPage() {
  return (
    <div className={styles.errorBlock}>
      <Tags.H1> Ooops... Page not found</Tags.H1>
      <section className={styles.errorContainer}>
        <span className={styles.spanError}>
          <span className={styles.digitFirst}>4</span>
        </span>
        <span className={`${styles.spanError} ${styles.digitSecond}`}>0</span>
        <span className={styles.spanError}>
          <span className={styles.digitThird}>4</span>
        </span>
      </section>
      <Button btnType="button" to="/main">
        To main page
      </Button>
    </div>
  );
}

export default NotFoundPage;

// the idea was taken from https://codepen.io/ricardpriet/pen/MOKEam
