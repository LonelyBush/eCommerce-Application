import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import { IProductCardProps } from './product-card-interface';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../../utils/local-storage/ls-handler';

import styles from './product-card.module.css';
import getAllProductFromCart from '../../../api/getAllProductFromCart';
import addLineItemToCart from '../../../api/addLineItemToCart';

function ProductCard({ productCard }: IProductCardProps) {
  const navigate = useNavigate();
  const { scrollToTop } = useScrollToTop(0);
  const [isCartActive, setIsCartActive] = useState<boolean>(true);
  const [cartUpdated, setCartUpdated] = useState(false);
  const handleClick = () => {
    scrollToTop();
    saveToLocalStorage('product-id', productCard.id);
    navigate(`/catalog/product/:key=${productCard.key}`);
  };

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addLineItemToCart(
      getFromLocalStorage('cart-id'),
      productCard.id,
      1,
      1,
    ).then((response) => {
      console.log(response);
      setCartUpdated((prev) => !prev);
    });
  };
  useEffect(() => {
    getAllProductFromCart(getFromLocalStorage('cart-id')).then((response) => {
      const includeProduct = response.cartDraft?.lineItems.some(
        (item) => item.productId === productCard.id,
      );
      setIsCartActive(includeProduct!);
    });
    // const includeProduct = cartArray.some((item) => item.id === productCard.id);
    // setIsCartActive(includeProduct);
    // setIsCartActive(isCartActive);
    // getOrCreateCart(productCard.id);
    // console.log(productCard.id);
  }, [cartUpdated]);

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
              disabled={isCartActive}
              onClick={addToCart}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
