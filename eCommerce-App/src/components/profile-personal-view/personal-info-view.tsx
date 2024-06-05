import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../form-input/form-input';
import Button from '../ui/button/button';
import { infoInputs } from './personal-consts';
import toastProps from './toast-props';
import UsePersonalInfo, {
  PersonalData,
} from '../profile-content/usePersonalInfo-hook';
import styles from './personal-info-view.module.css';
import updateAction from '../../api/updateAction';

function PersonalInfoInputs() {
  const info = UsePersonalInfo();
  const [values, setValues] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<boolean>(false);

  useEffect(() => {
    setValues({ ...info });
  }, [info]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBtn(true);
    setResponseError(false);
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowBtn(false);
    const response = updateAction(localStorage.getItem('personal-id')!, {
      version: Number(localStorage.getItem('version')),
      actions: [
        { action: 'setFirstName', firstName: values.firstName },
        { action: 'setLastName', lastName: values.lastName },
        { action: 'changeEmail', email: values.email! },
        { action: 'setDateOfBirth', dateOfBirth: values.dateOfBirth },
      ],
    });
    toast.promise(response, {
      pending: 'Loading...',
      success: 'Personal information has been succesfully updated !',
      error: {
        render({ data }) {
          setResponseError(true);
          return `Error: ${data}`;
        },
      },
    });
  };
  return (
    <>
      <form className={styles.personalForm} onSubmit={(e) => onSubmit(e)}>
        <div className={styles.nameSection}>
          {infoInputs.map((input) => {
            return input.name === 'firstName' || input.name === 'lastName' ? (
              <FormInput
                key={input.id}
                {...input}
                onChangeInput={(e) => {
                  handleOnChange(e);
                }}
                value={values[input.name as keyof typeof values]}
              />
            ) : (
              ''
            );
          })}
        </div>
        {infoInputs.map((input) => {
          return input.name === 'dateOfBirth' || input.name === 'email' ? (
            <FormInput
              key={input.id}
              responseError={input.name === 'email' ? responseError : false}

              {...input}
              onChangeInput={(e) => {
                handleOnChange(e);
              }}
              value={values[input.name as keyof typeof values]}
            />
          ) : (
            ''
          );
        })}
        <div className={styles.btnSection}>
          {showBtn && <Button btnType="submit">Confirm changes</Button>}
        </div>
      </form>
      <ToastContainer {...toastProps} />
    </>
  );
}

export default PersonalInfoInputs;
