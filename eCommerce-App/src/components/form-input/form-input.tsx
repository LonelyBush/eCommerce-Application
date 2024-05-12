import { ChangeEvent, useState, InputHTMLAttributes } from 'react';
import styles from './form-input.module.css';

interface PropsOption extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage: string;
  required: boolean;
}

function FormInput(props: PropsOption) {
  const [focused, setFocused] = useState(false);
  const { label, id, onChange, errorMessage, ...inputProps } = props;
  return (
    <div className={styles.formInput}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        onChange={(e) => onChange(e)}
        onBlur={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
export default FormInput;
