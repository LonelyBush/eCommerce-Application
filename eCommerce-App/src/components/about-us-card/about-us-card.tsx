import { Link } from 'react-router-dom';
import { IAboutUs } from './about-us-info';
import styles from './about-us-card.module.css';

interface AboutUsCardProps {
  us: IAboutUs;
}

function AboutUsCard({ us }: AboutUsCardProps) {
  return (
    <article className={styles.cardBlock}>
      <div className={`${styles.imgBlock} ${styles[us.img]}`} />
      <div className={styles.cardInfoBlock}>
        <h3 className={styles.cardName}>{us.name}</h3>
        <div className={styles.cardStatusInner}>
          <p className={styles.cardStatus}>{us.status}</p>
          <Link to={us.githubUrl} className={styles.linkBlock}>
            <div className={styles.iconGitHub} />
          </Link>
        </div>
        <p className={styles.info}>&quot;{us.info}&quot;</p>
        <details>
          <summary className={styles.summary}>
            Contribution to the creation of the project
          </summary>
          <ul>
            {us.contribution.map((item) => (
              <li className={styles.contributionItem} key={us.name}>
                {item}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}

export default AboutUsCard;
