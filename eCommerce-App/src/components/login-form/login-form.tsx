import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import LoginEmail from '../login-email/login-email';
import LoginPassword from '../login-password/login-password';

import styles from './login-form.module.css';
import checkAuthClient from '../../api/auth-client';

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
      await checkAuthClient(loginData);
      navigate('/main');
    } catch (caughtError) {
      if (caughtError instanceof Error)
        setError(`* ${caughtError.message.toLowerCase()}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.titleLogin}>Welcome!!!</h2>
      <p className={styles.titleLogin}>
        Don&apos;t have an account?&nbsp;
        <Link className={styles.link} to="/registration">
          Sign up
        </Link>
      </p>
      <div>
        <LoginEmail
          loginData={loginData}
          setLoginData={setLoginData}
          setEmailValid={setEmailValid}
          setError={setError}
        />
        <LoginPassword
          loginData={loginData}
          setLoginData={setLoginData}
          setPasswordValid={setPasswordValid}
          setError={setError}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
      <div className={styles.btnBlock}>
        <Button btnType="submit" disabled={!(emailValid && passwordValid)}>
          Log in
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
