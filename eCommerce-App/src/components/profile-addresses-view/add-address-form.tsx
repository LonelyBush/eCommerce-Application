
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
import UseAddressInfo from './useAddressInfo-hook';
import toastProps from './toast-props';

interface AddressTypesCheck {
  billing: boolean;
  shipping: boolean;
}

interface DefaultAddressCheck {
  defaultShipping: boolean;
  defaultBilling: boolean;
}

function AddAddressForm({ pathId }: { pathId: string }) {
  const navigate = useNavigate();
  const addressInfo = UseAddressInfo();
  const getAddressValues = addressInfo.addresses?.filter((elem) =>
    Object.values(elem).includes(pathId),
  )[0];
  const getBilling = addressInfo.billingAddressIds?.includes(pathId!) || false;
  const getShipping =
    addressInfo.shippingAddressIds?.includes(pathId!) || false;
  const getDefaultBilling =
    addressInfo.defaultBillingAddressId === pathId || false;
  const getDefaultShipping =
    addressInfo.defaultShippingAddressId === pathId || false;

  const [postalPattern] = useState({
    UA: '^\\d{5}$',
    US: '^\\d{5}(-\\d{4})?$',
    RU: '^\\d{6}$',
  });
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
  const [defaultAddresses, setDefaultAddresses] = useState<DefaultAddressCheck>(
    {
      defaultShipping: false,
      defaultBilling: false,
    },
  );
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  useEffect(() => {
    const addressType = {
      billing: getBilling,
      shipping: getShipping,
    };
    const defaultAddress = {
      defaultShipping: getDefaultShipping,
      defaultBilling: getDefaultBilling,
    };
    setAddressType(addressType);
    setDefaultAddresses(defaultAddress);
    setValues({ ...getAddressValues! });
  }, [
    getBilling,
    getShipping,
    getDefaultBilling,
    getDefaultShipping,
    getAddressValues,
  ]);
  const handleAddressTypeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.id === 'defaultShipping' ||
      e.currentTarget.id === 'defaultBilling'
    ) {
      setDefaultAddresses({
        ...defaultAddresses,
        [e.currentTarget.id]: e.currentTarget.checked,
      });
    } else {
      setAddressType({
        ...addressTypes,
        [e.currentTarget.id]: e.currentTarget.checked,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('render');
    /*
    if (pathId) {
      const response = updateAction(localStorage.getItem('personal-id')!, {
        version: Number(localStorage.getItem('version')),
        actions,
      });
      toast.promise(response, {
        pending: 'Loading...',
        success: 'Your address has been succesfully updated!',
        error: {
          render({ data }) {
            return `Error: ${data}`;
          },
        },
      });
    }
    */
  };

  return (
    <form
      className={`${styles.addressFormSection}`}
      onSubmit={(e) => onSubmit(e)}
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
            pattern={
              values.country
                ? postalPattern[values.country as keyof typeof postalPattern]
                : null
            }
            {...input}
            onChangeInput={(e) => {
              handleOnChange(e);
            }}
            value={values[input.name as keyof typeof values] || ''}
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
              checked={
                defaultAddresses[checkbox.id as keyof DefaultAddressCheck]
              }
              key={checkbox.id}
              {...checkbox}
              onChange={handleAddressTypeCheck}
            />
          );
        })}
      </fieldset>
      <Button btnType="submit">Submit</Button>
      <Button btnType="button" onClick={handleBack}>
        Back
      </Button>
      <ToastContainer {...toastProps} />
    </form>
  );
}

export default AddAddressForm;
