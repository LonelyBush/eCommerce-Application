import {
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';

export function getDefaultAddressAction(
  type: string,
  defaultCheck: boolean,
  pathId: string | undefined,
  addressKey: string | undefined,
  addressInfo: string | undefined,
):
  | CustomerSetDefaultBillingAddressAction
  | CustomerSetDefaultShippingAddressAction {
  if (defaultCheck) {
    return {
      action:
        type === 'billing'
          ? 'setDefaultBillingAddress'
          : 'setDefaultShippingAddress',
      addressId: pathId || undefined,
      addressKey: !pathId ? addressKey : undefined,
    };
  }
  if (addressInfo !== pathId) {
    return {
      action:
        type === 'billing'
          ? 'setDefaultBillingAddress'
          : 'setDefaultShippingAddress',
      addressId: addressInfo,
      addressKey: !pathId ? addressKey : undefined,
    };
  }
  return {
    action:
      type === 'billing'
        ? 'setDefaultBillingAddress'
        : 'setDefaultShippingAddress',
  };
}

export function setTypeAction() {}
