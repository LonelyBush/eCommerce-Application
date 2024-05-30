import { useState } from 'react';
import UsePersonalInfo from './usePersonalInfo-hook';
import Tags from '../ui/tags/tags';
import styles from './profile-content.module.css';
import PersonalInfoInputs from '../personal-view/personal-info-view';

function PersonalInfoView() {
  const [activeTab, setActiveTab] = useState(1);
  const info = UsePersonalInfo();
  const handleTabClick = (num: number) => {
    setActiveTab(num);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <PersonalInfoInputs />;
      case 2:
        return <div>Addresses info</div>;
      case 3:
        return <div>Conf info</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.profileRoot}>
      <div className={styles.profileContainer}>
        <div className={styles.greetUser}>
          <Tags.H2>{`Hello, ${info.firstName} ${info.lastName} !`}</Tags.H2>
        </div>
        <div className={styles.profileWrapper}>
          <div className={styles.profileNavigation}>
            <button
              type="button"
              onClick={() => handleTabClick(1)}
              className={`${styles.navComponent} ${activeTab === 1 ? styles.active : ''}`}
            >
              Personal information
            </button>
            <button
              type="button"
              onClick={() => handleTabClick(2)}
              className={`${styles.navComponent} ${activeTab === 2 ? styles.active : ''}`}
            >
              Addresses
            </button>
            <button
              type="button"
              onClick={() => handleTabClick(3)}
              className={`${styles.navComponent} ${activeTab === 3 ? styles.active : ''}`}
            >
              Confidential information
            </button>
          </div>
          <div className={styles.personalSection}>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoView;
