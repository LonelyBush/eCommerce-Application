import React, { useState } from 'react';
import { emailValidationMessages } from '../login-form/login-const';
import { LoginFormType } from '../../types/types';
import styles from '../login-form/login-form.module.css';

function LoginEmail({
  loginData,
  setLoginData,
}: {
  loginData: LoginFormType;
  setLoginData: React.Dispatch<React.SetStateAction<LoginFormType>>;
}) {
  const [emailError, setEmailError] = useState<string[]>([]);

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const { name, value } = event.target;

    setEmailError((prevErrors) => {
      if (name === 'email') {
        const newErrors = [];
        for (let i = 0; i < emailValidationMessages.length; i += 1) {
          const validationRule = emailValidationMessages[i];
          let isValid = false;

          switch (i) {
            case 0:
              isValid = /\S+@\S+\.\S+/.test(value);
              break;
            case 1:
              isValid = !/\s/.test(value);
              break;
            case 2:
              isValid = /\.\S+$/.test(value);
              break;
            case 3:
              isValid = /@/.test(value);
              break;
            default:
              break;
          }
          if (!isValid) {
            newErrors.push(validationRule);
          }
        }

        return newErrors;
      }

      return prevErrors;
    });

    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.label} htmlFor="email">
        Enter email:
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        placeholder="email"
        name="email"
        defaultValue={loginData.email}
        onChange={handleEmailInputChange}
      />
      {emailError && (
        <div className={styles.error}>
          {emailError.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
}

export default LoginEmail;
