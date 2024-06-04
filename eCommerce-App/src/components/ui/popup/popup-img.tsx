import Button from '../button/button';
import styles from './popup.module.css';

interface PopUpProps {
  imageUrl: string;
  onClose: () => void;
}

function PopUpImg({ imageUrl, onClose }: PopUpProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <div className={styles.popupContentImg}>
          <div className={styles.popupImageBlock}>
            <img src={imageUrl} alt={imageUrl} className={styles.popupImage} />
          </div>
          <Button btnType="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUpImg;
