import LinkTemplate from '../link/link';
import styles from './path-comp.module.css';

interface PathElement {
  value: string;
  link: string;
}

function Path({ pathElement }: { pathElement: PathElement[] }) {
  return (
    <ul className={styles.pathContainer}>
      {pathElement.map((elem: PathElement, index) => {
        const getSlash = index !== pathElement.length - 1 ? ' / ' : '';
        return (
          <li className={styles.pathElement} key={elem.value}>
            <LinkTemplate to={elem.link}>{elem.value}</LinkTemplate>
            {getSlash}
          </li>
        );
      })}
    </ul>
  );
}

export default Path;
