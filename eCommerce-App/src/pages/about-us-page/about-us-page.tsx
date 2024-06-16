import { Link } from 'react-router-dom';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import styles from './about-us-page.module.css';

function AboutUsPage() {
  return (
    <>
      <HeaderMainPage />
      <div className={styles.schoolBlock}>
        <Link to="https://rs.school/" className={styles.logoLink}>
          <div className={styles.logoRS} />
          <p />
        </Link>
      </div>
    </>
  );
}

export default AboutUsPage;
