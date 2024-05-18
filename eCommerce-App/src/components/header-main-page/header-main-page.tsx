import LinkTemplate from '../ui/link/link';

import styles from './header-main-page.module.css';

function HeaderMainPage() {
  return (
    <header className={styles.headerMain}>
      <h1>Online store</h1>
      <nav className={styles.navMain}>
        <LinkTemplate to="/login">Log in</LinkTemplate>
        <LinkTemplate to="/registration">Sign up</LinkTemplate>
      </nav>
    </header>
  );
}

export default HeaderMainPage;
