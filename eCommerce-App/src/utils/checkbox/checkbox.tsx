import { ChangeEvent } from 'react';
import styles from './checkbox.module.css';

type CheckBoxType = {
  id: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

function Checkbox({ id, label, onChange, checked }: CheckBoxType) {
  return (
    <label className={styles.labelContainer} htmlFor={id}>
      {label}
      <input
        checked={checked}
        onChange={(e) => onChange(e)}
        id={id}
        type="checkbox"
      />
      <span className={styles.checkmark} />
    </label>
  );
}

export default Checkbox;
