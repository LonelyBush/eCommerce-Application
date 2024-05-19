/* eslint-disable import/no-extraneous-dependencies */
import { ChangeEvent, FormEvent, useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import styles from './registration-page.module.css';
import Button from '../../components/ui/button/button';
import Tags from '../../components/ui/tags/tags';
import LinkTemplate from '../../components/ui/link/link';

import {
  nameInput,
  emailInput,
  passwordInput,
  dateInput,
  selectInput,
  adressInputs,
} from './inputs-const';

import {
  CredentialsData,
  PostBody,
} from '../../types/registration-form/registration-int';
import CredentialsForm from '../../components/credentials-form/credentials-form';
import AdressForm from '../../components/adress-form/address-forms';

function RegistrationPage() {
  const [shippingValues, setShippingInput] = useState<BaseAddress>({
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  });
  const [billingValues, setBillingInput] = useState<BaseAddress>({
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  });
  const [credentialsValues, setCredentialsValues] = useState<CredentialsData>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
  });
  const [useSameAddress, setUseSameAddress] = useState<boolean>(false);

  const [useDefaultShipping, setDefaultShipping] = useState<boolean>(false);
  const [useDefaultBilling, setDefaultBilling] = useState<boolean>(false);

  const handleInputChange = (
    addressType: 'billing' | 'shipping',
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (addressType === 'shipping') {
      setShippingInput({
        ...shippingValues,
        [e.currentTarget.name]: e.currentTarget.value,
      });
      if (useSameAddress) {
        setBillingInput({
          ...billingValues,
          [e.currentTarget.name]: e.currentTarget.value,
        });
        const getCurrrentName = document.getElementsByName(
          e.currentTarget.name,
        );
        getCurrrentName.forEach((elem) => {
          elem.setAttribute('data-focused', 'true');
        });
      }
    } else {
      setBillingInput({
        ...billingValues,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };
  const handleSameAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(e.target.checked);
    const getBillingField = document.getElementsByName('billing');
    const getBillingCheck = document.getElementById('default-billing-check');
    if (e.target.checked) {
      setBillingInput(shippingValues);
      getBillingCheck?.parentElement?.setAttribute(
        'style',
        'pointer-events: auto',
      );
      getBillingField.forEach((elem) => {
        elem.setAttribute('style', 'pointer-events: none');
      });
    } else {
      getBillingCheck?.parentElement?.removeAttribute('style');
      getBillingField.forEach((elem) => {
        elem.removeAttribute('style');
      });
    }
  };

  const handleDefaultAddress = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === 'default-shipping-check') {
      setDefaultShipping(e.target.checked);
    } else {
      setDefaultBilling(e.target.checked);
    }
  };

  const onCredentialsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCredentialsValues({
      ...credentialsValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createArrOfAddresses = [
      {
        firstName: credentialsValues.firstName,
        lastName: credentialsValues.lastName,
        email: credentialsValues.email,
        ...shippingValues,
      },
      {
        firstName: credentialsValues.firstName,
        lastName: credentialsValues.lastName,
        email: credentialsValues.email,
        ...billingValues,
      },
    ];
    const postBody = { ...credentialsValues } as PostBody;
    postBody.addresses = createArrOfAddresses;
    if (useDefaultBilling) {
      postBody.defaultBillingAddress = 1;
    }
    if (useDefaultShipping) {
      postBody.defaultShippingAddress = 0;
    }
    console.log(postBody);
  };
  return (
    <div className={styles.registrationRoot}>
      <form className={styles.registrationForm} onSubmit={(e) => onSubmit(e)}>
        <Tags.H2>Sign Up!</Tags.H2>
        <p className={styles.titleRegistration}>
          Already have an account?
          <LinkTemplate to="/login">Sign in!</LinkTemplate>
        </p>
        <CredentialsForm
          emailInput={emailInput}
          passwordInput={passwordInput}
          dateInput={dateInput}
          nameInput={nameInput}
          values={credentialsValues}
          onChange={(e) => onCredentialsChange(e)}
        />
        <AdressForm
          checkedDefault={useDefaultShipping}
          onDefaultCheckboxChange={(e) => handleDefaultAddress(e)}
          fieldName="shipping"
          checked={useSameAddress}
          onCheckboxChange={(e) => handleSameAddress(e)}
          fieldLegend="Shipping Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => handleInputChange('shipping', e)}
          values={shippingValues}
        />
        <AdressForm
          checkedDefault={useDefaultBilling}
          onDefaultCheckboxChange={(e) => handleDefaultAddress(e)}
          fieldName="billing"
          checked={useSameAddress}
          onCheckboxChange={(e) => handleSameAddress(e)}
          fieldLegend="Billing Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => handleInputChange('billing', e)}
          values={billingValues}
        />
        <Button btnType="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RegistrationPage;
