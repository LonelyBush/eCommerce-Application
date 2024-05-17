import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import LoginEmail from '../login-email/login-email';
import LoginPassword from '../login-password/login-password';

import styles from './login-form.module.css';
import { checkAuthClient } from '../../api/checkAuthClient';
import authWithPassword from '../../api/authWithPassword';

function LoginForm() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await checkAuthClient(loginData);
      console.log('Response from checkAuthClient:', response);
      authWithPassword(loginData);
      navigate('/main');
    } catch (caughtError) {
      if (caughtError instanceof Error)
        setError(`* ${caughtError.message.toLowerCase()}`);
    }
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
        {error && <div className={styles.error}>{error}</div>}
      </div>
      <div className={styles.buttonBlock}>
        <Button btnType="submit" disabled={!(emailValid && passwordValid)}>
          Enter
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
