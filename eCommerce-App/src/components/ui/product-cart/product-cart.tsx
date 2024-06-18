import React, { useState, useEffect } from 'react';
import getAllProductFromCart from '../../../api/getAllProductFromCart';
import addLineItemToCart from '../../../api/addLineItemToCart';
import removeLineItemFromCart from '../../../api/removeLineItem';
import styles from './product-cart.module.css';

interface ProductCartProps {
  productCardId: string;
}

function ProductCart({ productCardId }: ProductCartProps) {
  const [isCartActive, setIsCartActive] = useState<boolean>(true);
  const [lineItemsId, setLineItemsId] = useState<string>('');
  const [cartUpdated, setCartUpdated] = useState(false);
  const cartId = localStorage.getItem('cart-id');

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
          await addLineItemToCart(cartId, productCardId, 1, 1);
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
        const includeProduct = response.lineItems.some(
          (item, index: number) => {
            if (item.productId === productCardId) {
              setLineItemsId(response.lineItems[index].id);
              return true;
            }
            return false;
          },
        );
        setIsCartActive(includeProduct);
      });
    }
  }, [cartUpdated]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className={`${styles.cardCart} ${isCartActive ? styles.checked : ''}`}
        type="button"
        onClick={toggleProductInCart}
      />
    </>
  );
}

export default ProductCart;
