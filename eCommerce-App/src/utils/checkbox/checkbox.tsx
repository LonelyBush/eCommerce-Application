import styles from './checkbox.module.css';

type CheckBoxType = {
  id: string;
  label: string;
};

function Checkbox({ id, label }: CheckBoxType) {
  return (
    <label className={styles.labelContainer} htmlFor={id}>
      {label}
      <input id={id} type="checkbox" />
      <span className={styles.checkmark} />
    </label>
  );
}

export default Checkbox;
