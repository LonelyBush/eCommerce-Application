export const infoInputs = [
  {
    id: 'firsName',
    name: 'firstName',
    label: 'First name:',
    type: 'text',
    required: true,
    errorMessage:
      '*must contain at least one character and no special characters or numbers',
    pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last name:',
    type: 'text',
    required: true,
    errorMessage:
      '*must contain at least one character and no special characters or numbers',
    pattern: '^[^\\W\\d]*[^\\W\\d\\s][^\\W\\d]*$',
  },
  {
    id: 'dateOfBirth',
    name: 'dateOfBirth',
    type: 'date',
    label: 'Date of birth:',
    errorMessage: '*you must be at least 13 years old',
    required: true,
    min: '1800-01-01',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    errorMessage: '*must be a valid email address',
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
  },
];

export default infoInputs;
