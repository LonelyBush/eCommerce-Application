import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import styles from './registration-page.module.css';
import Button from '../../utils/button/button';
import H1 from '../../utils/tags/tags';
import inputs from './text-inputs-const';
import { InputData } from '../../types/registration-form/registration-int';

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
