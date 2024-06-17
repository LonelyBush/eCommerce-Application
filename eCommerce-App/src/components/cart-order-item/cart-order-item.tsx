/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { LineItem } from '@commercetools/platform-sdk';
import QuantityCounter from '../ui/quantity-counter/quantity-counter';
import styles from './cart-order-item.module.css';
import cartUpdateAction from '../../api/cartUpdateActipn';
import { getFromLocalStorage } from '../../utils/local-storage/ls-handler';
import { CartContent } from '../../types/interface';

function CartOrderItem({
  lineItem,
  setCartContent,
}: {
  lineItem: LineItem;
  setCartContent: React.Dispatch<React.SetStateAction<CartContent>>;
}) {
  const getImage = lineItem.variant.images?.filter((elem) => elem.url)[0].url;
  const name = lineItem.name['en-US'];
  const discountPerUnit =
    lineItem.price.discounted!.value.centAmount === undefined
      ? 0
      : lineItem.price.discounted!.value.centAmount / 100;
  const pricePerUnit =
    lineItem.price.value.centAmount === undefined
      ? 0
      : lineItem.price.value.centAmount / 100;
  const totalUnitPrice =
    lineItem.totalPrice.centAmount === undefined
      ? 0
      : lineItem.totalPrice.centAmount / 100;

  const handleDelete = () => {
    const response = cartUpdateAction(getFromLocalStorage('cart-id'), {
      version: Number(getFromLocalStorage('version-cart')),
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItem.id,
        },
      ],
    });
    response.then((apiResponse) => {
      const responsedTotalQuantity =
        apiResponse.cartDraft?.totalLineItemQuantity || 0;
      const responsedTotalPrice =
        apiResponse.cartDraft!.totalPrice.centAmount / 100 || 0;
      const responsedLineItems = apiResponse.cartDraft?.lineItems || [];
      const responsedVersion = apiResponse.cartDraft?.version || 0;
      setCartContent((prevState) => ({
        ...prevState,
        totalLineItemQuantity: responsedTotalQuantity,
        totalPrice: responsedTotalPrice,
        version: responsedVersion,
        lineItems: responsedLineItems,
      }));
    });
  };

  const handlePlus = () => {
    const response = cartUpdateAction(getFromLocalStorage('cart-id'), {
      version: Number(getFromLocalStorage('version-cart')),
      actions: [
        {
          action: 'addLineItem',
          productId: lineItem.productId,
          quantity: 1,
        },
      ],
    });
    response.then((apiResponse) => {
      const responsedTotalQuantity =
        apiResponse.cartDraft?.totalLineItemQuantity || 0;
      const responsedTotalPrice =
        apiResponse.cartDraft!.totalPrice.centAmount / 100 || 0;
      const responsedLineItems = apiResponse.cartDraft?.lineItems || [];
      const responsedVersion = apiResponse.cartDraft?.version || 0;
      setCartContent((prevState) => ({
        ...prevState,
        totalLineItemQuantity: responsedTotalQuantity,
        totalPrice: responsedTotalPrice,
        version: responsedVersion,
        lineItems: responsedLineItems,
      }));
    });
  };
  const handleMinus = () => {
    const response = cartUpdateAction(getFromLocalStorage('cart-id'), {
      version: Number(getFromLocalStorage('version-cart')),
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItem.id,
          quantity: 1,
        },
      ],
    });
    response.then((apiResponse) => {
      const responsedTotalQuantity =
        apiResponse.cartDraft?.totalLineItemQuantity || 0;
      const responsedTotalPrice =
        apiResponse.cartDraft!.totalPrice.centAmount / 100 || 0;
      const responsedLineItems = apiResponse.cartDraft?.lineItems || [];
      const responsedVersion = apiResponse.cartDraft?.version || 0;
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
    <div className={styles.cartOrderItem}>
      <div className={styles.deleteIcon} onClick={handleDelete} />
      <div className={styles.imageSection}>
        <img className={styles.cartImg} src={getImage} alt="cart-img" />
      </div>
      <div className={styles.orderTextBlock}>
        <p className={styles.orderTitle}>{name}</p>
        <QuantityCounter
          onClickMinus={handleMinus}
          onClickPlus={handlePlus}
          inputValue={`${lineItem.quantity}`}
        />
      </div>
      <div className={styles.cartPriceSection}>
        <div className={styles.cartOrderPriceBlock}>
          Price/unit:
          <div className={styles.pricesBlock}>
            <p className={styles.cardDiscount}>
              {discountPerUnit > 0 ? `${discountPerUnit}$` : ''}
            </p>
            <p
              className={`${styles.cardPrice} ${discountPerUnit > 0 ? `${styles.underscore}` : ''}`}
            >
              {pricePerUnit}&#36;
            </p>
          </div>
        </div>
        <div className={styles.cartOrderTotalPrice}>
          Total:
          <div className={styles.pricesBlock}>
            <p className={`${styles.cardPrice}`}>{totalUnitPrice}&#36;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartOrderItem;
