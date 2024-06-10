import LinkTemplateIcon from '../link/link-icon';
import styles from './cart-header.module.css';

interface CartHeaderProps {
  countCart: number;
}

function CartHeader({ countCart }: CartHeaderProps) {
  return (
    <div className={styles.cartBlock}>
      <LinkTemplateIcon to="/cart" className={styles.iconCart}>
        Cart
      </LinkTemplateIcon>
      {countCart > 0 ? <div className={styles.count}>{countCart}</div> : ''}
    </div>
  );
}

export default CartHeader;
