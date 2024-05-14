import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import styles from './registration-page.module.css';
import Button from '../../utils/button/button';
import H1 from '../../utils/tags/tags';
import { inputs, selectInput, adressInputs } from './inputs-const';

import { InputData } from '../../types/registration-form/registration-int';
import SelectInput from '../../components/select-input/select-input';

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
    if (!isAtLeast13YearsOld(e.currentTarget.value)) {
      if (e.currentTarget.name === 'dateBirth')
        e.currentTarget.setCustomValidity('User must be at least 13 years old');
    } else if (e.currentTarget.name === 'dateBirth')
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
    console.log(createCustomerDraftBody);
  };
  return (
    <form className={styles.registrationForm} onSubmit={(e) => onSubmit(e)}>
      <H1>Sign Up!</H1>
      {inputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            onChange={(e) => {
              onChange(e);
            }}
            value={values[input.name as keyof typeof values]}
          />
        );
      })}
      <SelectInput {...selectInput} onChange={(e) => onChange(e)} />
      {adressInputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            onChange={(e) => {
              onChange(e);
            }}
            value={values[input.name as keyof typeof values]}
          />
        );
      })}
      <Button btnType="submit">Submit</Button>
    </form>
  );
}

export default RegistrationPage;
