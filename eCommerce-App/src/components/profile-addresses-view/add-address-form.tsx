import { useState, ChangeEvent } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import SelectInput from '../select-input/select-input';
import FormInput from '../form-input/form-input';
import Checkbox from '../ui/checkbox/checkbox';
import {
  addAdressFormInputs,
  addAddressFormSelect,
  addressTypeCheckProps,
  defaultAddressCheckProps,
} from './add-address-cosnt';
import styles from './addresses-view-style.module.css';
import Button from '../ui/button/button';

interface AddressTypesCheck {
  billing: boolean;
  shipping: boolean;
}

interface DefaultAddressCheck {
  defaultShipping: boolean;
  defaultBilling: boolean;
}

function AddAddressForm() {
  const [values, setValues] = useState<BaseAddress>({
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  });
  const [addressTypes, setAddressType] = useState<AddressTypesCheck>({
    billing: false,
    shipping: false,
  });
  const [defaultAddress, setDefaultAddresses] = useState<DefaultAddressCheck>({
    defaultShipping: false,
    defaultBilling: false,
  });
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleAddressTypeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.id === 'defaultShipping' ||
      e.currentTarget.id === 'defaultBilling'
    ) {
      setDefaultAddresses({
        ...defaultAddress,
        [e.currentTarget.id]: e.currentTarget.checked,
      });
    } else {
      setAddressType({
        ...addressTypes,
        [e.currentTarget.id]: e.currentTarget.checked,
      });
    }
  };
  return (
    <form>
      <SelectInput
        {...addAddressFormSelect}
        onChangeSelect={(e) => {
          handleOnChange(e);
        }}
        value={values[addAddressFormSelect.name as keyof typeof values]}
      />
      {addAdressFormInputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            onChangeInput={(e) => {
              handleOnChange(e);
            }}
            value={values[input.name as keyof typeof values]}
          />
        );
      })}
      <fieldset className={styles.fieldsetBlock}>
        <legend>Address type</legend>
        {addressTypeCheckProps.map((checkbox) => {
          return (
            <Checkbox
              checked={addressTypes[checkbox.id as keyof AddressTypesCheck]}
              key={checkbox.id}
              {...checkbox}
              onChange={handleAddressTypeCheck}
            />
          );
        })}
      </fieldset>
      <fieldset className={styles.fieldsetBlock}>
        <legend>Default address</legend>
        {defaultAddressCheckProps.map((checkbox) => {
          return (
            <Checkbox
              checked={defaultAddress[checkbox.id as keyof DefaultAddressCheck]}
              key={checkbox.id}
              {...checkbox}
              onChange={handleAddressTypeCheck}
            />
          );
        })}
      </fieldset>
      <Button btnType="submit">Submit</Button>
    </form>
  );
}

export default AddAddressForm;
