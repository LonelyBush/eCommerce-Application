import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import { IProductCardProps } from './product-card-interface';
import Button from '../button/button';

import styles from './product-card.module.css';

function ProductCard({ productCard }: IProductCardProps) {
  const { scrollToTop } = useScrollToTop();

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <article className={styles.cardBlock}>
      <div className={styles.cardContent}>
        <div className={styles.imgBlock}>
          <img
            className={styles.cardImg}
            src={productCard.imageUrl}
            alt={productCard.name}
          />
        </div>
        <div className={styles.cardInfoBlock}>
          <h3 className={styles.cardName}>{productCard.name}</h3>
          <p className={styles.cardDescription}>{productCard.description}</p>
          <div className={styles.cardFooter}>
            <div className={styles.pricesBlock}>
              <p className={styles.cardDiscount}>{productCard.discount}</p>
              <p className={styles.cardPrice}>{productCard.price}</p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className={styles.cardCart} type="button" />
          </div>
          <Button
            btnType="button"
            to={`/main/product/:id=${productCard.id}`}
            onClick={handleClick}
          >
            Info
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
