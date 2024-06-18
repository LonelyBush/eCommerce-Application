/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CartRemoveLineItemAction } from '@commercetools/platform-sdk';
import cartUpdateAction from '../../api/cartUpdateActipn';
import CartOrderItem from '../cart-order-item/cart-order-item';
import CartPriceView from '../cart-price-view/cart-price-view';
import { EmptyCartContent } from '../empty-cart/empty-cart-view';
import HistoryBack from '../ui/history-back/history-back';
import Tags from '../ui/tags/tags';
import styles from './cart-content.module.css';
import UseCartContent from './useCartContent-hook';
import { getFromLocalStorage } from '../../utils/local-storage/ls-handler';
import { CountCart } from '../../types/types';

export function CartContent({
  setCountCart,
}: {
  setCountCart: React.Dispatch<React.SetStateAction<CountCart>>;
}) {
  const { cartContent, setCartContent } = UseCartContent();
  const getLineItems = cartContent.lineItems;
  const getTotalPrice = cartContent.totalPrice;

  if (cartContent.lineItems.length === 0) {
    return <EmptyCartContent />;
  }
  const handleDeleteAll = () => {
    const getAllLineIdsAction: CartRemoveLineItemAction[] = getLineItems.map(
      (lineItem) => {
        return { action: 'removeLineItem', lineItemId: lineItem.id };
      },
    );
    const response = cartUpdateAction(getFromLocalStorage('cart-id'), {
      version: Number(getFromLocalStorage('version-cart')),
      actions: getAllLineIdsAction,
    });
    response.then((apiResponse) => {
      const responsedTotalQuantity =
        apiResponse.cartDraft?.totalLineItemQuantity || 0;
      const responsedTotalPrice =
        apiResponse.cartDraft!.totalPrice.centAmount / 100 || 0;
      const responsedLineItems = apiResponse.cartDraft?.lineItems || [];
      const responsedVersion = apiResponse.cartDraft?.version || 0;
      const cartProducts = apiResponse.cartDraft?.lineItems
        ? apiResponse.cartDraft.lineItems.length
        : 0;
      setCountCart((prevState) => ({ ...prevState, count: cartProducts }));
      setCartContent((prevState) => ({
        ...prevState,
        totalLineItemQuantity: responsedTotalQuantity,
        totalPrice: responsedTotalPrice,
        version: responsedVersion,
        lineItems: responsedLineItems,
      }));
    });
  };
  return (
    <>
      <HistoryBack />
      <div className={styles.cartContentSection}>
        <div className={styles.cartTitle}>
          <Tags.H2>Cart</Tags.H2>
          <p>{`${getLineItems.length} Items`}</p>
          <div className={styles.deleteAllBlock} onClick={handleDeleteAll}>
            <div className={styles.deleteAllIcon} />
            <div className={styles.hide}>Clear All</div>
          </div>
        </div>

        <div className={styles.mainCartView}>
          <div className={styles.cartOrderListSection}>
            {getLineItems.map((lineItem) => {
              return (
                <CartOrderItem
                  key={lineItem.id}
                  lineItem={lineItem}
                  setCartContent={setCartContent}
                  setCountCart={setCountCart}
                />
              );
            })}
          </div>
          <CartPriceView orderPrice={getTotalPrice} lineItems={getLineItems} />
        </div>
      </div>
    </>
  );
}

export default CartContent;
