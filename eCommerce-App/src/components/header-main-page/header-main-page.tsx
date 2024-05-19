import { useState } from 'react';
import LinkTemplate from '../ui/link/link';
import Logo from '../ui/logo/logo';

import styles from './header-main-page.module.css';

function HeaderMainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.headerMain}>
      <Logo />
      <button className={styles.burgerMenu} onClick={toggleMenu} type="button">
        <div
          className={
            isMenuOpen
              ? `${styles.burgerIcon} ${styles.open}`
              : styles.burgerIcon
          }
        >
          <span className={styles.spanBurger} />
          <span className={styles.spanBurger} />
          <span className={styles.spanBurger} />
        </div>
      </button>
      <nav
        className={
          isMenuOpen ? `${styles.navMain} ${styles.open}` : styles.navMain
        }
      >
        <LinkTemplate to="/login">Log in</LinkTemplate>
        <LinkTemplate to="/registration">Sign up</LinkTemplate>
      </nav>
    </header>
  );
}

export default HeaderMainPage;
