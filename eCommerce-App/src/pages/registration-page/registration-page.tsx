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

import { InputData } from '../../types/registration-form/registration-int';
import CredentialsForm from '../../components/credentials-form/credentials-form';
import AdressForm from '../../components/adress-form/address-forms';

function isAtLeast13YearsOld(dateString: string) {
  const inputDate = new Date(dateString);

  const today = new Date();

  const ageDiff = today.getFullYear() - inputDate.getFullYear();
  const monthDiff = today.getMonth() - inputDate.getMonth();
  const dayDiff = today.getDate() - inputDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return ageDiff - 1 >= 13;
  }
  return ageDiff >= 13;
}

function RegistrationPage() {
  const [values, setValues] = useState<InputData>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.currentTarget.name === 'country') {
      const getPostalCode = document.getElementsByName('postalCode');
      if (e.currentTarget.value === 'US') {
        getPostalCode[0].setAttribute('pattern', '^\\d{5}(-\\d{4})?$');
      } else if (e.currentTarget.value === 'UK') {
        getPostalCode[0].setAttribute('pattern', '^\\d{5}$');
      } else if (e.currentTarget.value === 'RU') {
        getPostalCode[0].setAttribute('pattern', '^\\d{6}$');
      }
    }
    if (!isAtLeast13YearsOld(e.currentTarget.value)) {
      if (e.currentTarget.name === 'dateOfBirth')
        e.currentTarget.setCustomValidity('User must be at least 13 years old');
    } else if (e.currentTarget.name === 'dateOfBirth')
      e.currentTarget.setCustomValidity('');
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
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
          values={values}
          onChange={(e) => onChange(e)}
        />
        <AdressForm
          fieldLegend="Shipping Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => onChange(e)}
          values={values}
        />
        <AdressForm
          fieldLegend="Billing Address"
          adressInputs={adressInputs}
          selectInput={selectInput}
          onChange={(e) => onChange(e)}
          values={values}
        />
        <Button btnType="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RegistrationPage;
