import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import logOutClient from '../../utils/logOutClient';
import LinkTemplate from '../ui/link/link';
import Logo from '../ui/logo/logo';

import styles from './header-main-page.module.css';
import Button from '../ui/button/button';

function HeaderMainPage() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutClient();
    navigate('/main');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const authToken = localStorage.getItem('authToken');

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
        <LinkTemplate to="/catalog">Catalog</LinkTemplate>
        <LinkTemplate to="/products">Products</LinkTemplate>
        {authToken ? (
          <>
            <LinkTemplate to="/profile">Profile</LinkTemplate>
            <Button btnType="button" onClick={handleLogOut}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <LinkTemplate to="/login">Log in</LinkTemplate>
            <LinkTemplate to="/registration">Sign up</LinkTemplate>
          </>
        )}
      </nav>
    </header>
  );
}

export default HeaderMainPage;
