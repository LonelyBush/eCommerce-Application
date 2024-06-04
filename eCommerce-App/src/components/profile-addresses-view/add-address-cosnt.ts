export const addAddressFormSelect = {
  id: 'country',
  name: 'country',
  label: 'Country',
  errorMessage: '*you must choose valid country',
  required: true,
  options: [
    {
      value: '',
      optionLabel: 'Choose one...',
    },
    {
      value: 'US',
      optionLabel: 'United States',
    },
    {
      value: 'RU',
      optionLabel: 'Russia',
    },
    {
      value: 'UA',
      optionLabel: 'Ukraine',
    },
  ],
};

export const addAdressFormInputs = [
  {
    id: 'city',
    name: 'city',
    type: 'text',
    placeholder: 'City',
    label: 'City',
    errorMessage:
      '*must contain at least one character and no special characters or numbers',
    required: true,
    pattern: '^[a-zA-Z]+$',
  },
  {
    id: 'postalCode',
    name: 'postalCode',
    type: 'text',
    placeholder: 'Postal Code',
    label: 'Postal Code',
    errorMessage: '*must follow the format for the country',
    required: true,
  },
  {
    id: 'streetName',
    name: 'streetName',
    type: 'text',
    placeholder: 'Adress',
    label: 'Adress',
    errorMessage: '*must contain at least one character',
    required: true,
    pattern: '^.+$',
  },
];
export const addressTypeCheckProps = [
  {
    id: 'shipping',
    label: 'Shipping',
  },
  {
    id: 'billing',
    label: 'Billing',
  },
];

export const defaultAddressCheckProps = [
  {
    id: 'defaultShipping',
    label: 'Default shipping address',
  },
  {
    id: 'defaultBilling',
    label: 'Default billing address',
  },
];

export const columns = [
  {
    label: 'Num',
    id: 'id',
  },
  {
    label: 'Address',
    id: 'streetName',
  },
  {
    label: 'City',
    id: 'city',
  },
  {
    label: 'Country',
    id: 'country',
  },
  {
    label: 'Postal code',
    id: 'postalCode',
  },

  {
    label: 'Address Type',
    id: 'addressType',
  },
];
