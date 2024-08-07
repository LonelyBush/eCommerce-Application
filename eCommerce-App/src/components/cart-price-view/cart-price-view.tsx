import { LineItem } from '@commercetools/platform-sdk';
import Button from '../ui/button/button';
import styles from './cart-price-view.module.css';

function CartPriceView({
  orderPrice,
  lineItems,
}: {
  orderPrice: number;
  lineItems: LineItem[];
}) {
  const totalWithoutDisco = lineItems.reduce((prev, cur) => {
    const getTotalPricePerItem =
      (cur.price.value.centAmount / 100) * cur.quantity;
    return prev + getTotalPricePerItem;
  }, 0);
  return (
    <div className={styles.cartPriceWrapper}>
      <div className={styles.cartPriceSection}>
        <div className={styles.priceDiscountBlock}>
          <div className={styles.priceBlock}>
            <p className={styles.priceText}>Order price</p>
            <p className={styles.priceValue}>{`${orderPrice}`}&#36;</p>
          </div>
          <div className={styles.discountBlock}>
            <p className={styles.discountText}>Discount amount</p>
            <p className={styles.discountValue}>
              {`${(totalWithoutDisco - orderPrice).toFixed(2)}`}&#36;
            </p>
          </div>
        </div>

        <div className={styles.totalPriceBlock}>
          <p className={styles.totalPriceText}>Total price with discount</p>
          <p className={styles.totalPriceValue}>{`${orderPrice}`}&#36;</p>
        </div>
      </div>
      <Button btnType="button">Order !</Button>
    </div>
  );
}

export default CartPriceView;
