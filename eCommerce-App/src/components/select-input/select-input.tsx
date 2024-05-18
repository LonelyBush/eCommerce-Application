import { useState } from 'react';

import styles from './select-input.module.css';
import { PropsOption } from '../../types/registration-form/registration-int';

function SelectInput(props: PropsOption) {
  const [focused, setFocused] = useState(false);
  const {
    label,
    id,
    onChangeSelect,
    errorMessage,
    name,
    options,
    required,
    value,
  } = props;
  return (
    <div className={styles.selectInputForm}>
      <label htmlFor={id}>{label} </label>
      <select
        onBlur={() => setFocused(true)}
        data-focused={focused.toString()}
        onChange={(e) => onChangeSelect!(e)}
        name={name}
        required={required}
        value={value}
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
