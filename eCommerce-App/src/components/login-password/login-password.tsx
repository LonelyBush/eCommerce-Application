/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { passwordValidationMessages } from '../login-form/login-const';
import { LoginFormType } from '../../types/types';
import styles from '../login-form/login-form.module.css';

function LoginPassword({
  loginData,
  setLoginData,
  setPasswordValid,
  setError,
  eyeDisplay,
  label,
  responseError,
  setResponseError,
}: {
  loginData: LoginFormType;
  setLoginData: React.Dispatch<React.SetStateAction<LoginFormType>>;
  setPasswordValid?: React.Dispatch<React.SetStateAction<boolean>>;
  setResponseError?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  eyeDisplay: boolean;
  label?: string;
  responseError?: boolean;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [borderStyle, setBorderStyle] = useState<string>('');

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    if (setResponseError) setResponseError(false);
    const { name, value } = event.target;
    if (setError) setError('');

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
              isValid = /(?=.*[\W_])/.test(value);
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
    if (setPasswordValid)
      setPasswordValid!(
        passwordError.length < 1 && loginData.password!.length > 1,
      );
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    if (setPasswordValid)
      setPasswordValid(
        passwordError.length === 0 && loginData.password!.length > 1,
      );
    if (loginData.password!.length > 0) {
      setBorderStyle(
        passwordError.length > 0 ? styles.borderError : styles.borderValid,
      );
    }
  }, [passwordError, loginData.password, setPasswordValid]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.label} htmlFor="password">
        {label || 'Enter password'}
      </label>
      <div
        className={`${styles.passwordBlock} ${responseError ? styles.borderError : borderStyle}`}
      >
        <input
          id="password"
          className={styles.passwordInput}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          data-responseerror={responseError}
          defaultValue={loginData.password}
          onChange={handlePasswordInputChange}
          pattern="^(?!^\s)(?!.*\s$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$"
          required
        />
        {eyeDisplay && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            className={`${styles.passwordEye} ${showPassword ? styles.passwordEyeClosed : styles.passwordEyeOpen}`}
            onClick={togglePasswordVisibility}
          />
        )}
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
