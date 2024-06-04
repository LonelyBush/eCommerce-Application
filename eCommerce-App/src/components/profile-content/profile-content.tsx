import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UsePersonalInfo from './usePersonalInfo-hook';
import Tags from '../ui/tags/tags';
import styles from './profile-content.module.css';
import PersonalInfoInputs from '../profile-personal-view/personal-info-view';
import AddressesTable from '../profile-addresses-view/addresses-table';
import AddAddressForm from '../profile-addresses-view/add-address-form';
import UseAddressInfo from '../profile-addresses-view/useAddressInfo-hook';
import ConfidentialView from '../confidential-view/confidential-view';

function PersonalInfoView() {
  const [activeTab, setActiveTab] = useState(1);
  const info = UsePersonalInfo();
  const addresInfo = UseAddressInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const handleTabClick = (num: number, path: string) => {
    setActiveTab(num);
    navigate(path);
  };

  useEffect(() => {
    const getAddressIds = addresInfo.addresses?.map((elem) => {
      return elem.id;
    });

    if (location.pathname.startsWith('/profile/personal')) {
      setActiveTab(1);
    } else if (
      location.pathname.startsWith('/profile/addresses') ||
      getAddressIds?.some((id) => location.pathname.includes(id!))
    ) {
      setActiveTab(2);
    } else if (location.pathname.startsWith('/profile/confidential')) {
      setActiveTab(3);
    } else {
      setActiveTab(1);
      navigate('personal');
    }
  }, [location.pathname]);
  const getAddressIds = addresInfo.addresses?.map((elem) => {
    return elem.id;
  });
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
          <div className={styles.profileSection}>
            <Routes>
              <Route path="/personal" element={<PersonalInfoInputs />} />
              <Route path="/addresses" element={<AddressesTable />}>
                <Route path="new" element={<AddAddressForm pathId="" />} />
                {getAddressIds?.map((path) => {
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<AddAddressForm pathId={path!} />}
                    />
                  );
                })}
              </Route>
              <Route path="/confidential" element={<ConfidentialView />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoView;
