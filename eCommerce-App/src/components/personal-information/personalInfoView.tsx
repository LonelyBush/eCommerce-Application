import UsePersonalInfo from './usePersonalInfo';
import Tags from '../ui/tags/tags';
import styles from './personalView.module.css';

function PersonalInfoView() {
  const info = UsePersonalInfo();
  return (
    <div className={styles.profileContainer}>
      <div className={styles.greetUser}>
        <Tags.H2>{`Hello, ${info.firstName} ${info.lastName} !`}</Tags.H2>
      </div>
      <div className={styles.personalSection} />
    </div>
  );
}

export default PersonalInfoView;
