import Logo from './logo';
import styles from './logo.module.css';

function LogoHeader() {
  return (
    <div className={styles.logoHeader}>
      <Logo />
    </div>
  );
}

export default LogoHeader;
