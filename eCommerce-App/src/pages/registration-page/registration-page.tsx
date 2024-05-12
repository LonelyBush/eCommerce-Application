import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import styles from './registration-page.module.css';
import Button from '../../utils/button/button';
import H1 from '../../utils/tags/tags';

interface InputData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  password: string;
}

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
    dateBirth: '',
    password: '',
  });

  const inputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      errorMessage: '*it should be a valid email adress',
      required: true,
    },
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      label: 'First Name',
      errorMessage:
        '*must contain at least one character and no special characters or numbers',
      required: true,
      pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
    },
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name',
      label: 'Last Name',
      errorMessage:
        '*must contain at least one character and no special characters or numbers',
      required: true,
      pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
    },
    {
      id: 'dateBirth',
      name: 'dateBirth',
      type: 'date',
      placeholder: 'Date of Birth',
      label: 'Date Of Birth',
      errorMessage: '',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      errorMessage:
        'Must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      required: true,
      pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$',
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      label: 'Confirm password',
      errorMessage: '*password dont match !',
      required: true,
      pattern: values.password,
    },
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name !== 'confirmPassword') {
      setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAtLeast13YearsOld(values.dateBirth)) {
      console.log('You must be at least 13 years old.');
      return;
    }
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
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
      <Button btnType="submit">Submit</Button>
    </form>
  );
}

export default RegistrationPage;
