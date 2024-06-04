import { useState, useEffect, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPassword from '../login-password/login-password';
import Button from '../ui/button/button';
import toastProps from './toast-props';
import UseConfidential from './useConfidential-hook';
import styles from './confidential-view.module.css';
import { LoginFormType } from '../../types/types';

function ConfidentialView() {
  const info = UseConfidential();
  const [currentPasswordValid, setCurrentPasswordValid] =
    useState<boolean>(false);
  const [newPasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [newPassword, setNewPassword] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  useEffect(() => {
    setCurrentData({ ...info });
  }, [info]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Password has been updated !');
    console.log(currentData, newPassword);
    console.log('send');
  };
  return (
    <>
      <form className={styles.confidentialForm} onSubmit={(e) => onSubmit(e)}>
        <LoginPassword
          eyeDisplay
          loginData={currentData}
          setLoginData={setCurrentData}
          setPasswordValid={setCurrentPasswordValid}
          label="Current password:"
        />
        <LoginPassword
          eyeDisplay
          loginData={newPassword}
          setLoginData={setNewPassword}
          setPasswordValid={setNewPasswordValid}
          label="New password"
        />
        <div className={styles.btnSection}>
          {currentPasswordValid && newPasswordValid && (
            <Button btnType="submit">Confirm changes</Button>
          )}
        </div>
      </form>
      <ToastContainer {...toastProps} />
    </>
  );
}

export default ConfidentialView;
