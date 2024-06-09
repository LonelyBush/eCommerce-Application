/* eslint-disable @typescript-eslint/no-unused-vars */
import { CredentialsProps } from '../../types/registration-form/registration-int';
import LoginEmail from '../login-email/login-email';
import LoginPassword from '../login-password/login-password';
import FormInput from '../form-input/form-input';
import styles from './credentials-form.module.css';

function CredentialsForm({
  nameInput,
  dateInput,
  values,
  onChange,
  setLoginData,
  loginData,
}: CredentialsProps) {
  return (
    <div className={styles.inputsBlock}>
      <div className={styles.emailSection}>
        <LoginEmail loginData={loginData} setLoginData={setLoginData} />
      </div>
      <div className={styles.nameSection}>
        {nameInput.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              onChangeInput={(e) => {
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
              onChangeInput={(e) => {
                onChange(e);
              }}
              value={values[input.name as keyof typeof values]}
            />
          );
        })}
      </div>
      <div className={styles.passwordSection}>
        <LoginPassword
          eyeDisplay={false}
          loginData={loginData}
          setLoginData={setLoginData}
        />
      </div>
    </div>
  );
}

export default CredentialsForm;
