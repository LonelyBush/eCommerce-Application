import { ButtonType } from '../../../types/types';
import styles from './btn.module.css';

function Button({
  btnType = 'button',
  children,
  onClick,
  to,
  disabled,
}: ButtonType) {
  const handleClick = () => {
    if (to) {
      window.location.href = to;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={styles.btn}
      type={btnType === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
