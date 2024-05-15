import React, { useState, useEffect } from 'react';
import { passwordValidationMessages } from '../login-form/login-const';
import { LoginFormType } from '../../types/types';
import styles from '../login-form/login-form.module.css';

function LoginPassword({
  loginData,
  setLoginData,
  setPasswordValid,
}: {
  loginData: LoginFormType;
  setLoginData: React.Dispatch<React.SetStateAction<LoginFormType>>;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const { name, value } = event.target;

    setPasswordError((prevErrors) => {
      if (name === 'password') {
        const newErrors = [];

        for (let i = 0; i < passwordValidationMessages.length; i += 1) {
          const validationRule = passwordValidationMessages[i];
          let isValid = false;

          switch (i) {
            case 0:
              isValid = value.length >= 8;
              break;
            case 1:
              isValid = /[A-Z]/.test(value);
              break;
            case 2:
              isValid = /[a-z]/.test(value);
              break;
            case 3:
              isValid = /\d/.test(value);
              break;
            case 4:
              isValid = /[!@#$%^&*]/.test(value);
              break;
            case 5:
              isValid = !/\s/.test(value);
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

    setPasswordValid(passwordError.length < 1 && loginData.password.length > 1);
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    setPasswordValid(
      passwordError.length === 0 && loginData.password.length > 1,
    );
  }, [passwordError, loginData.password, setPasswordValid]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.label} htmlFor="password">
        Enter password:
      </label>
      <div
        className={`${styles.passwordBlock} ${passwordError.length > 0 ? styles.borderError : ''}`}
      >
        <input
          id="password"
          className={styles.passwordInput}
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          name="password"
          defaultValue={loginData.password}
          onChange={handlePasswordInputChange}
        />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className={`${styles.passwordEye} ${showPassword ? styles.passwordEyeClosed : styles.passwordEyeOpen}`}
          onClick={togglePasswordVisibility}
        />
      </div>
      {passwordError && (
        <div className={styles.error}>
          {passwordError.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
}

export default LoginPassword;
