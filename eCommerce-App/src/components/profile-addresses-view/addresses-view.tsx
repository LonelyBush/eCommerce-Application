import { useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import Button from '../ui/button/button';
import styles from './addresses-view-style.module.css';
import UseAddressInfo from './useAddressInfo-hook';
import AddAddressForm from './add-address-form';

interface ColumnInterface {
  label: string;
  id: string;
}

function TableHead({ mainColumns }: { mainColumns: ColumnInterface[] }) {
  return (
    <thead>
      <tr>
        {mainColumns.map((column) => (
          <th
            key={column.id}
            id={column.id}
            className={styles.userTableHeadCell}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableContent({
  entries,
  columns,
  shippingAddressIds,
  billingAddressIds,
  defaultBillingAddressId,
  defaultShippingAddressId,
}: {
  entries: BaseAddress[];
  columns: ColumnInterface[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}) {
  return (
    <tbody>
      {entries.map((entry, index) => {
        return (
          <tr id={entry.id} key={entry.id} className={styles.tableBodyRow}>
            {columns.map((column) => {
              return column.id === 'addressType' ? (
                <td key={column.id} className={styles.userTableBodyCell}>
                  <div className={styles.addressTypes}>
                    {defaultBillingAddressId === entry.id ? (
                      <div className={styles.defaultType}>Default billing</div>
                    ) : null}
                    {defaultShippingAddressId === entry.id ? (
                      <div className={styles.defaultType}>Default shipping</div>
                    ) : null}
                    {shippingAddressIds?.map((elem) => {
                      return elem === entry.id ? (
                        <div className={styles.addressType} key={elem}>
                          Shipping
                        </div>
                      ) : null;
                    })}
                    {billingAddressIds?.map((elem) => {
                      return elem === entry.id ? (
                        <div className={styles.addressType} key={elem}>
                          Billing
                        </div>
                      ) : null;
                    })}
                  </div>
                </td>
              ) : (
                <td className={styles.userTableBodyCell} key={column.id}>
                  {column.id === 'id'
                    ? index + 1
                    : entry[column.id as keyof BaseAddress]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function AddressesView() {
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const columns = [
    {
      label: 'Num',
      id: 'id',
    },
    {
      label: 'Address',
      id: 'streetName',
    },
    {
      label: 'City',
      id: 'city',
    },
    {
      label: 'Country',
      id: 'country',
    },
    {
      label: 'Postal code',
      id: 'postalCode',
    },

    {
      label: 'Address Type',
      id: 'addressType',
    },
  ];
  const info = UseAddressInfo();

  const handleOnClick = () => {
    setShowAddressForm(true);
  };
  return (
    <div className={styles.tableSection}>
      {!showAddressForm ? (
        <>
          <table className={styles.addressTable}>
            <TableHead mainColumns={columns} />
            <TableContent
              columns={columns}
              entries={info.addresses!}
              shippingAddressIds={info.shippingAddressIds!}
              billingAddressIds={info.billingAddressIds!}
              defaultBillingAddressId={info.defaultBillingAddressId!}
              defaultShippingAddressId={info.defaultShippingAddressId!}
            />
          </table>
          <div className={styles.btnSection}>
            <Button onClick={handleOnClick} btnType="button">
              Add address
            </Button>
          </div>
        </>
      ) : (
        <AddAddressForm />
      )}
    </div>
  );
}

export default AddressesView;
