import { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../../utils/local-storage/ls-handler';
import getAllProductFromCart from '../../api/getAllProductFromCart';
import { CountCart } from '../../types/types';

function useCountCart() {
  const [countCart, setCountCart] = useState<CountCart>({
    count: 0,
  });

  useEffect(() => {
    async function getResponse() {
      try {
        const response = await getAllProductFromCart(
          getFromLocalStorage('cart-id'),
        );
        const cartProducts = response.cartDraft?.lineItems
          ? response.cartDraft.lineItems.length
          : 0;
        setCountCart({ ...countCart, count: cartProducts });
      } catch (caughtError) {
        if (caughtError instanceof Error) {
          console.log(caughtError.message);
        }
      }
    }
    getResponse();
  }, []);
  console.log(countCart);
  return { countCart, setCountCart };
}

export default useCountCart;
