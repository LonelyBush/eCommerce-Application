import QuantityCounter from '../ui/quantity-counter/quantity-counter';
import styles from './cart-order-list.module.css';

const productCard = {
  discount: 13.99,
  price: 14.99,
};

function CartOrderList() {
  return (
    <div className={styles.cartOrderListSection}>
      <div className={styles.cartOrderItem}>
        <div className={styles.deleteIcon} />
        <div className={styles.imageSection}>
          <img
            className={styles.cartImg}
            src="https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Vanilla_Candle-1.1.jpeg"
            alt="cart-img"
          />
        </div>
        <div className={styles.orderTextBlock}>
          <p className={styles.orderTitle}>Vanilla Candle</p>
          <QuantityCounter
            onClickMinus={() => {}}
            onClickPlus={() => {}}
            inputValue="4"
          />
        </div>
        <div className={styles.cartPriceSection}>
          <div className={styles.cartOrderPriceBlock}>
            Price/unit:
            <div className={styles.pricesBlock}>
              <p className={styles.cardDiscount}>
                {productCard.discount > 0 ? `${productCard.discount}$` : ''}
              </p>
              <p
                className={`${styles.cardPrice} ${productCard.discount > 0 ? `${styles.underscore}` : ''}`}
              >
                {productCard.price}&#36;
              </p>
            </div>
          </div>
          <div className={styles.cartOrderTotalPrice}>
            Total:
            <div className={styles.pricesBlock}>
              <p className={styles.cardDiscount}>
                {productCard.discount > 0 ? `${productCard.discount}$` : ''}
              </p>
              <p
                className={`${styles.cardPrice} ${productCard.discount > 0 ? `${styles.underscore}` : ''}`}
              >
                {productCard.price}&#36;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartOrderList;
