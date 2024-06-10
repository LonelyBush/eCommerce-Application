import React from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import { IProductCardProps } from './product-card-interface';
import { saveIdToLocalStorage } from '../../../utils/local-storage/save-id';

import styles from './product-card.module.css';

function ProductCard({ productCard }: IProductCardProps) {
  const navigate = useNavigate();
  const { scrollToTop } = useScrollToTop();

  const handleClick = () => {
    scrollToTop();
    saveIdToLocalStorage(productCard.id);
    navigate(`/catalog/product/:key=${productCard.key}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article className={styles.cardBlock} onClick={handleClick}>
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
          <div className={styles.cardFooter}>
            <div className={styles.pricesBlock}>
              <p className={styles.cardDiscount}>
                {productCard.discount > 0 ? `${productCard.discount}$` : ''}
              </p>
              <p
                className={`${styles.cardPrice} ${productCard.discount > 0 ? `${styles.underscore}` : ''}`}
              >
                {productCard.price} &#36;
              </p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className={styles.cardCart} type="button" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
