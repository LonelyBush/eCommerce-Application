import React, { useState } from 'react';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import {
  passwordValidationMessages,
  emailValidationMessages,
} from './login-const';
import styles from './login-form.module.css';

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginFormType>({
    mail: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label} htmlFor="email">
          Enter mail:
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="mail"
          name="email"
          value={loginData.mail}
          onChange={handleInputChange}
        />
        {emailError && (
          <div className={styles.error}>
            {emailError.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label} htmlFor="password">
          Enter password:
        </label>
        <div className={styles.passwordBlock}>
          <input
            id="password"
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
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
      </div>
      <Button btnType="submit">Send</Button>
    </form>
  );
}

export default LoginForm;
