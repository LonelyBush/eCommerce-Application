import { ChangeEvent } from 'react';
import styles from './form-input.module.css';

interface PropsOption {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function FormInput(props: PropsOption) {
  const { label, id, onChange, ...inputProps } = props;
  return (
    <div className={styles.formInput}>
      <label htmlFor={id.toString()}>{label}</label>
      <input {...inputProps} onChange={(e) => onChange(e)} />
    </div>
  );
}
export default FormInput;
