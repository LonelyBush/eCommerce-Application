import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import toastProps from './toast-props';
import Button from '../ui/button/button';
import styles from './addresses-view-style.module.css';
import UseAddressInfo from './useAddressInfo-hook';
import { columns } from './add-address-cosnt';
import { TableContent, TableHead } from './address-table-components';

function AddressesTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const info = UseAddressInfo();
  const getAddressIds = info.addresses?.map((elem) => {
    return elem.id;
  });
  const isNestedRoute =
    location.pathname.includes('new') ||
    location.pathname.includes('change') ||
    getAddressIds?.some((id) => location.pathname.includes(id!));

  const handleOnClick = () => {
    navigate('new');
  };
  return (
    <>
      {!isNestedRoute && (
        <div className={styles.tableSection}>
          <table className={`${styles.addressTable}`}>
            <TableHead mainColumns={columns} />
            <TableContent
              tableColumns={columns}
              entries={info.addresses!}
              shippingAddressIds={info.shippingAddressIds!}
              billingAddressIds={info.billingAddressIds!}
              defaultBillingAddressId={info.defaultBillingAddressId!}
              defaultShippingAddressId={info.defaultShippingAddressId!}
            />
          </table>
          <div className={`${styles.btnSection}`}>
            <Button onClick={handleOnClick} btnType="button">
              Add address
            </Button>
          </div>
        </div>
      )}
      <ToastContainer {...toastProps} />
      <Outlet />
    </>
  );
}

export default AddressesTable;
