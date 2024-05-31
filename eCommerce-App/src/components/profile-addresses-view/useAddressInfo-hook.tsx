import { useEffect, useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import fetchPersonalData from '../../api/fetchPersonalData';

interface AddressType {
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
}

export interface CustomAddressInterface {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;

  addressType: AddressType;
}

export interface ClientAddressData {
  addresses?: BaseAddress[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  billingAddressIds?: string[];
  shippingAddressIds?: string[];
}

function UseAddressInfo() {
  const [personalData, setPersonalData] = useState<ClientAddressData>({
    addresses: [],
    defaultBillingAddressId: '',
    defaultShippingAddressId: '',
    billingAddressIds: [],
    shippingAddressIds: [],
  });
  useEffect(() => {
    async function getResponse() {
      try {
        const response = await fetchPersonalData(
          localStorage.getItem('personal-id')!,
        );
        setPersonalData({
          ...personalData,
          addresses: response.customer?.addresses,
          defaultBillingAddressId: response.customer?.defaultBillingAddressId,
          defaultShippingAddressId: response.customer?.defaultShippingAddressId,
          billingAddressIds: response.customer?.billingAddressIds,
          shippingAddressIds: response.customer?.shippingAddressIds,
        });
      } catch (caughtError) {
        if (caughtError instanceof Error) {
          console.log(caughtError.message);
        }
      }
    }
    getResponse();
  }, []);
  return personalData;
}

export default UseAddressInfo;
