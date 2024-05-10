import React, { useState } from 'react';
import Button from '../../utils/button/button';
import { LoginFormType } from '../../types/types';
import styles from './login-form.module.css';

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginFormType>({
    mail: '',
    password: '',
  });
  //   const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginData);
  };

  //   const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  //   };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className={styles.input}
          type="email"
          placeholder="mail"
          name="mail"
          value={loginData.mail}
          onChange={handleInputChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />

        <input
          className={styles.input}
          // type={showPassword ? 'text' : 'password'}
          placeholder="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
      </div>
      <Button btnType="submit">Send</Button>
    </form>
  );
}
export default LoginForm;
