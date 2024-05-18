import { ITags } from '../../../types/interface';
import styles from './tags.module.css';

function H1({ children }: ITags) {
  return <h1 className={styles.title}>{children}</h1>;
}

function Container({ children }: ITags) {
  return <div className={styles.container}>{children}</div>;
}

const Tags = { H1, Container };

export default Tags;
