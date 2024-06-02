import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UsePersonalInfo from './usePersonalInfo-hook';
import Tags from '../ui/tags/tags';
import styles from './profile-content.module.css';
import PersonalInfoInputs from '../profile-personal-view/personal-info-view';
import AddressesTable from '../profile-addresses-view/addresses-table';
import AddAddressForm from '../profile-addresses-view/add-address-form';

function PersonalInfoView() {
  const [activeTab, setActiveTab] = useState(1);
  const info = UsePersonalInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const handleTabClick = (num: number, path: string) => {
    setActiveTab(num);
    navigate(path);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/profile/personal':
        setActiveTab(1);
        break;
      case '/profile/addresses':
      case '/profile/addresses/new':
      case '/profile/addresses/change':
        setActiveTab(2);
        break;
      case '/profile/confidential':
        setActiveTab(3);
        break;
      default:
        setActiveTab(1);
        navigate('personal');
    }
  }, [location.pathname]);
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
              onClick={() => handleTabClick(1, 'personal')}
              className={`${styles.navComponent} ${activeTab === 1 ? styles.active : ''}`}
            >
              Personal information
            </button>
            <button
              type="button"
              onClick={() => handleTabClick(2, 'addresses')}
              className={`${styles.navComponent} ${activeTab === 2 ? styles.active : ''}`}
            >
              Addresses
            </button>
            <button
              type="button"
              onClick={() => handleTabClick(3, 'confidential')}
              className={`${styles.navComponent} ${activeTab === 3 ? styles.active : ''}`}
            >
              Confidential information
            </button>
          </div>
          <div className={styles.personalSection}>
            <Routes>
              <Route path="/personal" element={<PersonalInfoInputs />} />
              <Route path="/addresses" element={<AddressesTable />}>
                <Route path="new" element={<AddAddressForm />} />
                <Route path="change" element={<div>Change Address</div>} />
              </Route>
              <Route path="/confidential" element={<div>Conf info</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoView;
