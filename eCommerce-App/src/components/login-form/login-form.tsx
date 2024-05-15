import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import LoginEmail from '../login-email/login-email';
import LoginPassword from '../login-password/login-password';

import styles from './login-form.module.css';

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <LoginEmail
          loginData={loginData}
          setLoginData={setLoginData}
          setEmailValid={setEmailValid}
        />
        <LoginPassword
          loginData={loginData}
          setLoginData={setLoginData}
          setPasswordValid={setPasswordValid}
        />
      </div>
      <Link className={styles.link} to="/registration">
        <Button btnType="submit" disabled={!(emailValid && passwordValid)}>
          Submit
        </Button>
      </Link>
    </form>
  );
}

export default LoginForm;
