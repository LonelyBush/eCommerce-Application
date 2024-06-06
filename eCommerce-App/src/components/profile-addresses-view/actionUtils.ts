import { CustomerUpdateAction } from '@commercetools/platform-sdk';

export function getDefaultAddressAction(
  type: string,
  defaultCheck: boolean,
  pathId: string | undefined,
  addressKey: string | undefined,
  addressInfo: string | undefined,
): CustomerUpdateAction {
  if (defaultCheck) {
    return {
      action:
        type === 'billing'
          ? 'setDefaultBillingAddress'
          : 'setDefaultShippingAddress',
      addressId: pathId || undefined,
      addressKey: pathId === '' ? addressKey : undefined,
    };
  }
  if (addressInfo !== pathId) {
    return {
      action:
        type === 'billing'
          ? 'setDefaultBillingAddress'
          : 'setDefaultShippingAddress',
      addressId: addressInfo,
      addressKey: addressInfo === '' ? addressKey : undefined,
    };
  }
  return {
    action:
      type === 'billing'
        ? 'setDefaultBillingAddress'
        : 'setDefaultShippingAddress',
  };
}

export function setTypeAction(
  type: string,
  typeCheck: boolean,
  pathId: string | undefined,
  addressKey: string | undefined,
  addressInfo: string[] | undefined,
): CustomerUpdateAction | null {
  if (typeCheck) {
    return {
      action:
        type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId',
      addressId: pathId || undefined,
      addressKey: pathId === '' ? addressKey : undefined,
    };
  }
  if (addressInfo?.includes(pathId!)) {
    return {
      action:
        type === 'billing'
          ? 'removeBillingAddressId'
          : 'removeShippingAddressId',
      addressId: pathId || undefined,
      addressKey: pathId === '' ? addressKey : undefined,
    };
  }
  return null;
}
