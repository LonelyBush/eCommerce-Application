import { Link } from 'react-router-dom';
import Button from '../../utils/button/button';
import H1 from '../../utils/tags/tags';
import styles from './not-found.module.css';

function NotFoundPage() {
  return (
    <div className={styles.errorBlock}>
      <H1> Ooops... Page not found</H1>
      <section className={styles.errorContainer}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <Link to="/main">
        <Button btnType="button">To main page</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;

// the idea was taken from https://codepen.io/ricardpriet/pen/MOKEam
