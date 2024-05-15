import { ButtonType } from '../../types/types';
import styles from './btn.module.css';

function Button({
  btnType = 'button',
  children,
  onClick,
  disabled,
}: ButtonType) {
  return (
    <button
      className={styles.btn}
      type={btnType === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
