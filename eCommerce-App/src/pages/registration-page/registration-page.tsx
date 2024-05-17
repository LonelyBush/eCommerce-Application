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

  console.log(shippingValues, billingValues);
  const onShippingChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setShippingInput({
      ...shippingValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onBillingChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBillingInput({
      ...billingValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          fieldLegend="Shipping Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => onShippingChange(e)}
          values={shippingValues}
        />
        <AdressForm
          fieldLegend="Billing Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => onBillingChange(e)}
          values={billingValues}
        />
        <Button btnType="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RegistrationPage;
