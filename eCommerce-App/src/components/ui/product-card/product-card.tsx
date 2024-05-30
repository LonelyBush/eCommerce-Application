import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import styles from './product-card.module.css';
import Button from '../button/button';

function ProductCard() {
  const { scrollToTop } = useScrollToTop();

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <article className={styles.cardBlock}>
      <div className={styles.cardContent}>
        <div className={styles.imgBlock}>
          <img className={styles.cardImg} alt="product" />
        </div>
        <div className={styles.cardInfoBlock}>
          <h3 className={styles.cardName}>Product Name</h3>
          <p className={styles.cardDescription}>Product Description</p>
          <div className={styles.cardFooter}>
            <div className={styles.pricesBlock}>
              <p className={styles.cardDiscount}>Discount</p>
              <p className={styles.cardPrice}>Price</p>
            </div>
            <button className={styles.cardCart} type="button">
              Add to Cart
            </button>
          </div>
          <Button btnType="button" to="/products" onClick={handleClick}>
            Info
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
