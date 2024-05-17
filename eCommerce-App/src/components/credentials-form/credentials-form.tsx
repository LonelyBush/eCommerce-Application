import { ChangeEvent } from 'react';
import { CredentialsProps } from '../../types/registration-form/registration-int';
import FormInput from '../form-input/form-input';
import styles from './credentials-form.module.css';

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

function CredentialsForm({
  emailInput,
  nameInput,
  dateInput,
  passwordInput,
  values,
  onChange,
}: CredentialsProps) {
  const onChangeDate = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!isAtLeast13YearsOld(e.currentTarget.value)) {
      if (e.currentTarget.name === 'dateOfBirth')
        e.currentTarget.setCustomValidity('User must be at least 13 years old');
    } else if (e.currentTarget.name === 'dateOfBirth')
      e.currentTarget.setCustomValidity('');
  };
  return (
    <div className={styles.inputsBlock}>
      <div className={styles.emailSection}>
        {emailInput.map((input) => {
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
      </div>
      <div className={styles.nameSection}>
        {nameInput.map((input) => {
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
      </div>
      <div className={styles.birthSection}>
        {dateInput.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              onChange={(e) => {
                onChangeDate(e);
                onChange(e);
              }}
              value={values[input.name as keyof typeof values]}
            />
          );
        })}
      </div>
      <div className={styles.passwordSection}>
        {passwordInput.map((input) => {
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
      </div>
    </div>
  );
}

export default CredentialsForm;