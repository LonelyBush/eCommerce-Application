import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import styles from './registration-page.module.css';
import Button from '../../utils/button/button';

interface InputData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  password: string;
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
      type: 'text',
      placeholder: 'Email',
      label: 'Email',
    },
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      label: 'First Name',
    },
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name',
      label: 'Last Name',
    },
    {
      id: 'dateBirth',
      name: 'dateBirth',
      type: 'text',
      placeholder: 'Date of Birth',
      label: 'Date Of Birth',
    },
    {
      id: 'password',
      name: 'password',
      type: 'text',
      placeholder: 'Password',
      label: 'Password',
    },
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
  };
  console.log(values);
  return (
    <form className={styles.registrationForm} onSubmit={(e) => onSubmit(e)}>
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
