import { Link } from 'react-router-dom';
import styles from './logo.module.css';

function Logo() {
  return (
    <Link to="/main" className={styles.logoLink}>
      <div className={styles.logo} />
    </Link>
  );
}

export default Logo;
