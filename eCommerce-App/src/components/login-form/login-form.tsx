import React, { useState } from 'react';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import LoginEmail from '../login-email/login-email';
import styles from './login-form.module.css';
import LoginPassword from '../login-password/login-password';

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <LoginEmail loginData={loginData} setLoginData={setLoginData} />
        <LoginPassword loginData={loginData} setLoginData={setLoginData} />
      </div>
      <Button btnType="submit">Send</Button>
    </form>
  );
}

export default LoginForm;
