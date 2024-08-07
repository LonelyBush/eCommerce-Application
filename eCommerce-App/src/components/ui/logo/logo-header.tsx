import Logo from './logo';
import styles from './logo.module.css';

function LogoHeader() {
  return (
    <header className={styles.logoHeader}>
      <Logo />
    </header>
  );
}

export default LogoHeader;
