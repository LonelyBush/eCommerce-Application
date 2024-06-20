import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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

  const toggleProductInCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (cartId) {
      if (isCartActive) {
        const response = removeLineItemFromCart(cartId, lineItemsId).then(
          (apiResponse) => {
            toast.promise(response, {
              pending: 'Loading...',
              success: 'Item has been removed!',
              error: {
                render({ data }) {
                  return `Error: ${data}`;
                },
              },
            });
            setCartUpdated((prev) => !prev);
            const cartProducts = apiResponse.cartDraft?.lineItems
              ? apiResponse.cartDraft.lineItems.length
              : 0;
            setCountCart((prevState) => ({
              ...prevState,
              count: cartProducts,
            }));
          },
        );
      } else {
        const response = addLineItemToCart(cartId, productCartId, 1, 1).then(
          (apiResponse) => {
            toast.promise(response, {
              pending: 'Loading...',
              success: 'Item has been added to cart!',
              error: {
                render({ data }) {
                  return `Error: ${data}`;
                },
              },
            });
            setCartUpdated((prev) => !prev);
            const cartProducts = apiResponse.cartDraft?.lineItems
              ? apiResponse.cartDraft.lineItems.length
              : 0;
            setCountCart((prevState) => ({
              ...prevState,
              count: cartProducts,
            }));
          },
        );
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
