export const inputs = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    errorMessage: '*it should be a valid email adress',
    required: true,
  },
  {
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    label: 'First Name',
    errorMessage:
      '*must contain at least one character and no special characters or numbers',
    required: true,
    pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
  },
  {
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    label: 'Last Name',
    errorMessage:
      '*must contain at least one character and no special characters or numbers',
    required: true,
    pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
  },
  {
    id: 'dateOfBirth',
    name: 'dateOfBirth',
    type: 'date',
    placeholder: 'YYY-MM-DD',
    label: 'Date Of Birth',
    errorMessage: '*you must be at least 13 years old',
    required: true,
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    errorMessage:
      '*must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    required: true,
    pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$',
  },
];

export const selectInput = {
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
      value: 'UK',
      optionLabel: 'Ukraine',
    },
  ],
};

export const adressInputs = [
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
    id: 'streetName',
    name: 'streetName',
    type: 'text',
    placeholder: 'Street',
    label: 'Street',
    errorMessage: '*must contain at least one character',
    required: true,
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
];
