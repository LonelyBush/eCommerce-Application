import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../../utils/hooks/scroll-to-top';
import { IProductCardProps } from './product-card-interface';
import { saveToLocalStorage } from '../../../utils/local-storage/ls-handler';

import styles from './product-card.module.css';
import getAllProductFromCart from '../../../api/getAllProductFromCart';
import addLineItemToCart from '../../../api/addLineItemToCart';
import removeLineItemFromCart from '../../../api/removeLineItem';

function ProductCard({ productCard }: IProductCardProps) {
  const navigate = useNavigate();
  const { scrollToTop } = useScrollToTop(0);
  const [isCartActive, setIsCartActive] = useState<boolean>(true);
  const [lineItemsId, setLineItemsId] = useState<string>('');
  const [cartUpdated, setCartUpdated] = useState(false);
  const cartId = localStorage.getItem('cart-id');

  const handleClick = () => {
    scrollToTop();
    saveToLocalStorage('product-id', productCard.id);
    navigate(`/catalog/product/:key=${productCard.key}`);
  };

  const toggleProductInCart = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    if (cartId) {
      if (isCartActive) {
        try {
          await removeLineItemFromCart(cartId, lineItemsId);
          setCartUpdated((prev) => !prev);
        } catch (error) {
          console.error('Failed to remove item from cart:', error);
        }
      } else {
        try {
          await addLineItemToCart(cartId, productCard.id, 1, 1);
          setCartUpdated((prev) => !prev);
        } catch (error) {
          console.error('Failed to add item to cart:', error);
        }
      }
    }
  };
  useEffect(() => {
    if (cartId) {
      getAllProductFromCart(cartId).then((response) => {
        const includeProduct = response.cartDraft?.lineItems.some(
          (item, index: number) => {
            if (item.productId === productCard.id) {
              setLineItemsId(response.cartDraft!.lineItems[index].id);
              return true;
            }
            return false;
          },
        );
        setIsCartActive(includeProduct!);
      });
    }
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
              className={`${styles.cardCart} ${isCartActive ? styles.checked : ''}`}
              type="button"
              onClick={toggleProductInCart}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
