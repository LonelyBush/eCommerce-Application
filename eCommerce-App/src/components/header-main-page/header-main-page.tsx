import LinkTemplate from '../ui/link/link';
import Logo from '../ui/logo/logo';

import styles from './header-main-page.module.css';

function HeaderMainPage() {
  return (
    <header className={styles.headerMain}>
      <Logo />
      <nav className={styles.navMain}>
        <LinkTemplate to="/login">Log in</LinkTemplate>
        <LinkTemplate to="/registration">Sign up</LinkTemplate>
      </nav>
    </header>
  );
}

export default HeaderMainPage;
