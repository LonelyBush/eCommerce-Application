import { useNavigate } from 'react-router-dom';
import Button from '../ui/button/button';
import styles from './empty-cart-view.module.css';
import Tags from '../ui/tags/tags';
import emptyCart from '../../assets/logo/empty_cart.png';
import HistoryBack from '../ui/history-back/history-back';

export function EmptyCartContent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };
  return (
    <>
      <HistoryBack />
      <div className={styles.emptyCartWrapper}>
        <div className={styles.emptyCartContent}>
          <img
            className={styles.emptyCartPic}
            src={emptyCart}
            alt="empty-cart-pic"
          />
          <div className={styles.emptyCartText}>
            <Tags.H2>Your Cart Is Empty !</Tags.H2>
            <p>Looks like you havent made your choice yet...</p>
          </div>
          <Button btnType="button" onClick={handleClick}>
            To Catalog !
          </Button>
        </div>
      </div>
    </>
  );
}

export default EmptyCartContent;
