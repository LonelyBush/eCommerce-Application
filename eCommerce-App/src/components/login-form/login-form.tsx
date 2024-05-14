import React, { useState } from 'react';
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
      <Button btnType="submit" disabled={!(emailValid && passwordValid)}>
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
