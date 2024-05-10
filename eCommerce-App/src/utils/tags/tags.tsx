import { ITags } from '../../types/interface';
import styles from './tags.module.css';

function H1({ children }: ITags) {
  return <h1 className={styles.title}>{children}</h1>;
}

export default H1;
