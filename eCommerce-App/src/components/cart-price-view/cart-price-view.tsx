import Button from '../ui/button/button';
import styles from './cart-price-view.module.css';

function CartPriceView() {
  return (
    <div className={styles.cartPriceWrapper}>
      <div className={styles.cartPriceSection}>
        <div className={styles.priceDiscountBlock}>
          <div className={styles.priceBlock}>
            <p className={styles.priceText}>Order price</p>
            <p className={styles.priceValue}>$ 14,99</p>
          </div>
          <div className={styles.discountBlock}>
            <p className={styles.discountText}>Discount amount</p>
            <p className={styles.discountValue}>$ 14,99</p>
          </div>
        </div>

        <div className={styles.totalPriceBlock}>
          <p className={styles.totalPriceText}>Total price with discount</p>
          <p className={styles.totalPriceValue}>$ 14,99</p>
        </div>
      </div>
      <Button btnType="button">Order !</Button>
    </div>
  );
}

export default CartPriceView;
