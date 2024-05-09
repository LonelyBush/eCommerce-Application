import { Link } from 'react-router-dom';
import Button from '../../utils/button/button';
import styles from './not-found.module.css';

function NotFoundPage() {
  return (
    <div>
      <h1> Ooops... Page not found</h1>
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
