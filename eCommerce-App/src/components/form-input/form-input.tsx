import { ChangeEvent, useState } from 'react';
import styles from './form-input.module.css';
import { PropsOption } from '../../types/registration-form/registration-int';

function isAtLeast13YearsOld(dateString: string) {
  const inputDate = new Date(dateString);

  const today = new Date();

  const ageDiff = today.getFullYear() - inputDate.getFullYear();
  const monthDiff = today.getMonth() - inputDate.getMonth();
  const dayDiff = today.getDate() - inputDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return ageDiff - 1 >= 13;
  }
  return ageDiff >= 13;
}

function FormInput(props: PropsOption) {
  const [focused, setFocused] = useState(false);
  const {
    label,
    id,
    onChangeInput,
    errorMessage,
    type,
    responseError,
    ...inputProps
  } = props;

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isAtLeast13YearsOld(e.currentTarget.value)) {
      if (e.currentTarget.name === 'dateOfBirth')
        e.currentTarget.setCustomValidity('User must be at least 13 years old');
    } else if (e.currentTarget.name === 'dateOfBirth')
      e.currentTarget.setCustomValidity('');
  };
  return (
    <div className={styles.formInput}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        {...inputProps}
        onChange={(e) => {
          if (type === 'date') {
            setFocused(true);
            onChangeDate(e);
            onChangeInput!(e);
          } else {
            setFocused(true);
            onChangeInput!(e);
          }
        }}
        data-focused={focused.toString()}
        data-responseerror={responseError}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
export default FormInput;
