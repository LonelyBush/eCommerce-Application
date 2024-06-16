import { Link } from 'react-router-dom';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import Footer from '../../components/footer/footer';

import styles from './about-us-page.module.css';

function AboutUsPage() {
  return (
    <>
      <HeaderMainPage />
      <div className={styles.contentInner}>
      <div className={styles.schoolBlock}>
        <Link to="https://rs.school/" className={styles.logoLink}>
          <div className={styles.logoRS} />
          <p /> RS School, run by the Rolling Scopes community since 2013, offers a unique, free, community-based online education experience. With over 600 developer-volunteers from various countries and companies as mentors, the program connects people, promotes growth, and ensures learning is enjoyable.
        </Link>
      </div>
      </div>
     
      <Footer />
    </>
  );
}

export default AboutUsPage;
