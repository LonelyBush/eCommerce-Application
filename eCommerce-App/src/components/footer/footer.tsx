import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="https://rs.school/" className={styles.linkBlock}>
        <div className={styles.logoRS} />
      </Link>
      <p className={styles.year}>2024 &copy;</p>
      <Link to='/about-us' className={styles.linkBlock}>
      <div
        className={styles.iconGitHub}
      />
      <span
        className={styles.text}
      >Our team
      </span>
    </Link>
    </footer>
  );
}

export default Footer;
