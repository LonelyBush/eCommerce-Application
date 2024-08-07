import { ITags } from '../../../types/interface';
import styles from './tags.module.css';

function H1({ children }: ITags) {
  return <h1 className={styles.title}>{children}</h1>;
}

function H2({ children }: ITags) {
  return <h2 className={styles.smallTitle}>{children}</h2>;
}

function Container({ children }: ITags) {
  return <div className={styles.container}>{children}</div>;
}

const Tags = { H1, H2, Container };

export default Tags;
