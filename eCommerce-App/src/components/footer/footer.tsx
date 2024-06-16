import { Link } from 'react-router-dom';
import LinkTemplateIcon from '../ui/link/link-icon';

import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="https://rs.school/" className={styles.logoLink}>
        <div className={styles.logoRS} />
      </Link>
      <p>2024 &copy;</p>
      <nav className={styles.footerNav}>
        {' '}
        <LinkTemplateIcon
          to="https://github.com/rs0048"
          className={styles.iconGitHub}
        >
          Roman Sokolov
        </LinkTemplateIcon>
        <LinkTemplateIcon
          to="https://github.com/Yana-Dyachok"
          className={styles.iconGitHub}
        >
          Yana Dyachok
        </LinkTemplateIcon>
        <LinkTemplateIcon
          to="https://github.com/lonelybush"
          className={styles.iconGitHub}
        >
          Nikita Radevich
        </LinkTemplateIcon>
      </nav>
    </footer>
  );
}

export default Footer;
