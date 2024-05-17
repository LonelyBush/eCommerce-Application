import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './registration-page.module.css';
import Button from '../../utils/button/button';
import Tags from '../../utils/tags/tags';
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
  AdressData,
} from '../../types/registration-form/registration-int';
import CredentialsForm from '../../components/credentials-form/credentials-form';
import AdressForm from '../../components/adress-form/address-forms';

function RegistrationPage() {
  const [shippingValues, setShippingInput] = useState<AdressData>({
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  });
  const [billingValues, setBillingInput] = useState<AdressData>({
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
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(e.target.checked);
    if (e.target.checked) {
      setBillingInput(shippingValues);
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
    const data = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(data);
    const baseAdresses = [
      {
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,

        email: dataObj.email,
        city: dataObj.city,
        streetName: dataObj.streetName,
        postalCode: dataObj.postalCode,
        country: dataObj.country,
      },
    ];
    const createCustomerDraftBody = {
      email: dataObj.email,
      firstName: dataObj.firstName,
      lastName: dataObj.lastName,
      dateOfBirth: dataObj.dateOfBirth,
      password: dataObj.password,
      addresses: baseAdresses,
    };
    console.log(createCustomerDraftBody); // this body will go to POST request for sign up
  };
  return (
    <div className={styles.registrationRoot}>
      <form className={styles.registrationForm} onSubmit={(e) => onSubmit(e)}>
        <Tags.H1>Sign Up!</Tags.H1>
        <CredentialsForm
          emailInput={emailInput}
          passwordInput={passwordInput}
          dateInput={dateInput}
          nameInput={nameInput}
          values={credentialsValues}
          onChange={(e) => onCredentialsChange(e)}
        />
        <AdressForm
          checked={useSameAddress}
          onCheckboxChange={(e) => handleCheckboxChange(e)}
          fieldLegend="Shipping Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => handleInputChange('shipping', e)}
          values={shippingValues}
        />
        <AdressForm
          checked={useSameAddress}
          onCheckboxChange={(e) => handleCheckboxChange(e)}
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
