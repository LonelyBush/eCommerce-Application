import React, { useState, useEffect } from 'react';
import getAllProductFromCart from '../../../api/getAllProductFromCart';
import addLineItemToCart from '../../../api/addLineItemToCart';
import removeLineItemFromCart from '../../../api/removeLineItem';
import styles from './product-cart.module.css';
import { CountCart } from '../../../types/types';

function ProductCart({
  productCartId,
  setCountCart,
}: {
  productCartId: string;
  setCountCart: React.Dispatch<React.SetStateAction<CountCart>>;
}) {
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
          const response = await removeLineItemFromCart(cartId, lineItemsId);
          setCartUpdated((prev) => !prev);
          const cartProducts = response.cartDraft?.lineItems
            ? response.cartDraft.lineItems.length
            : 0;
          setCountCart((prevState) => ({
            ...prevState,
            count: cartProducts,
          }));
        } catch (error) {
          console.error('Failed to remove item from cart:', error);
        }
      } else {
        try {
          const response = await addLineItemToCart(cartId, productCartId, 1, 1);
          setCartUpdated((prev) => !prev);
          const cartProducts = response.cartDraft?.lineItems
            ? response.cartDraft.lineItems.length
            : 0;
          setCountCart((prevState) => ({
            ...prevState,
            count: cartProducts,
          }));
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
            if (item.productId === productCartId) {
              const lineItemsIdIncluded =
                response.cartDraft?.lineItems[index].id;
              setLineItemsId(
                lineItemsIdIncluded !== undefined ? lineItemsIdIncluded : '0',
              );
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
