import Button from '../button/button';
import styles from './popup.module.css';

interface PopUpProps {
  text: string;
  title: string;
  onClose: () => void;
}

function PopUp({ title, text, onClose }: PopUpProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <div className={styles.popupContent}>
          <h2 className={styles.popupTitle}>{title}</h2>
          <p className={styles.popupText}>{text}</p>
          <Button btnType="button" onClick={onClose}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
