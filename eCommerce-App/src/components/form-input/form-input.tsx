import { useState } from 'react';
import styles from './form-input.module.css';
import { PropsOption } from '../../types/registration-form/registration-int';

function FormInput(props: PropsOption) {
  const [focused, setFocused] = useState(false);
  const { label, id, onChangeInput, errorMessage, ...inputProps } = props;
  return (
    <div className={styles.formInput}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        onChange={(e) => onChangeInput!(e)}
        onBlur={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
export default FormInput;
