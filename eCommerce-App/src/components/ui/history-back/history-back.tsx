import { useNavigate } from 'react-router-dom';
import styles from './history-back.module.css';

function HistoryBack() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <button type="button" className={styles.backElement} onClick={handleClick}>
      Back
    </button>
  );
}

export default HistoryBack;
