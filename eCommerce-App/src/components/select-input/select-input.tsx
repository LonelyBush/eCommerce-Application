import { FocusEventHandler, useState } from 'react';

import styles from './select-input.module.css';
import { PropsOption } from '../../types/registration-form/registration-int';

function SelectInput(props: PropsOption) {
  const [focused, setFocused] = useState(false);
  const { label, id, onChange, errorMessage, options, name, required } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className={styles.selectInputForm}>
      <label htmlFor={id}>{label}</label>
      <select
        onBlur={handleFocus as FocusEventHandler}
        data-focused={focused.toString()}
        onChange={(e) => onChange(e)}
        name={name}
        required={required}
      >
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.optionLabel}
            </option>
          );
        })}
      </select>
      <span>{errorMessage}</span>
    </div>
  );
}

export default SelectInput;
