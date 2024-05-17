import { CredentialsProps } from '../../types/registration-form/registration-int';
import FormInput from '../form-input/form-input';
import styles from './credentials-form.module.css';

function CredentialsForm({
  emailInput,
  nameInput,
  dateInput,
  passwordInput,
  values,
  onChange,
}: CredentialsProps) {
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
