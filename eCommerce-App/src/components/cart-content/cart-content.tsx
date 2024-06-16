import CartOrderList from '../cart-order-list/cart-order-list';
import CartPriceView from '../cart-price-view/cart-price-view';
import HistoryBack from '../ui/history-back/history-back';
import Tags from '../ui/tags/tags';
import styles from './cart-content.module.css';

export function CartContent() {
  return (
    <>
      <HistoryBack />
      <div className={styles.cartContentSection}>
        <div className={styles.cartTitle}>
          <Tags.H2>Cart</Tags.H2>
          <p>3 Items</p>
          <div className={styles.deleteAllBlock}>
            <div className={styles.deleteAllIcon} />
            <div className={styles.hide}>Delete All</div>
          </div>
        </div>

        <div className={styles.mainCartView}>
          <CartOrderList />
          <CartPriceView />
        </div>
      </div>
    </>
  );
}

export default CartContent;
