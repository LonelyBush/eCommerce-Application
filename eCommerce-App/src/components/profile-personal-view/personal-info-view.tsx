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

function PersonalInfoInputs() {
  const info = UsePersonalInfo();
  const [values, setValues] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  const [showBtns, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    setValues({ ...info });
  }, [info]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBtn(true);
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowBtn(false);
    toast.success('Personal information has been succesfully updated !');
    console.log('send');
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
          return input.name === 'dateOfBirth' ? (
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

        <div className={styles.btnSection}>
          {showBtns && (
            <>
              <Button btnType="submit">Confirm changes</Button>
              <Button
                btnType="button"
                onClick={() => {
                  setShowBtn(false);
                  setValues({ ...info });
                  toast.warn('Changes reverted !');
                }}
              >
                Revert changes
              </Button>
            </>
          )}
        </div>
      </form>
      <ToastContainer {...toastProps} />
    </>
  );
}

export default PersonalInfoInputs;
