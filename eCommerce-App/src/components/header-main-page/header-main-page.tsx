import logOutClient from '../../utils/logOutClient';
import LinkTemplate from '../ui/link/link';
import { useNavigate } from 'react-router-dom';
import styles from './header-main-page.module.css';
import Button from '../ui/button/button';

function HeaderMainPage() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutClient();
    navigate('/main');
  };

  const authToken = localStorage.getItem('authToken');
  return (
    <header className={styles.headerMain}>
      <h1>Online store</h1>
      <nav className={styles.navMain}>
        {authToken ? (
          <Button btnType="button" onClick={handleLogOut}>
            Log out
          </Button>
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
