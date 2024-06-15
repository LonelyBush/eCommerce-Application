import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import { IProductCardProps } from './product-card-interface';
import { saveToLocalStorage } from '../../../utils/local-storage/ls-handler';

import styles from './product-card.module.css';

function ProductCard({ productCard }: IProductCardProps) {
  const navigate = useNavigate();
  const { scrollToTop } = useScrollToTop();
  const [isCartActive, setIsCartActive] = useState<boolean>(true);
  const handleClick = () => {
    scrollToTop();
    saveToLocalStorage('product-id', productCard.id);
    navigate(`/catalog/product/:key=${productCard.key}`);
  };

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsCartActive(false);
  };

  useEffect(() => {
    // const includeProduct=cartArray.some(item => item.id ===  productCard.id)
    // setIsCartActive(includeProduct)
    setIsCartActive(isCartActive);
  });

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
            <button
              className={styles.cardCart}
              type="button"
              disabled={!isCartActive}
              onClick={addToCart}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
