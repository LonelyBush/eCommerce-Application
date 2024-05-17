import { ChangeEvent } from 'react';

export interface CredentialsData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
}

export interface AdressData {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface SelectOptionProps {
  value: string;
  optionLabel: string;
}

export interface PropsOption {
  label: string;
  placeholder?: string;
  name: string;
  id: string;
  type?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  errorMessage: string;
  required: boolean;
  options?: SelectOptionProps[];
}

export interface CredentialsProps {
  emailInput: PropsOption[];
  nameInput: PropsOption[];
  dateInput: PropsOption[];

  passwordInput: PropsOption[];

  values: CredentialsData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AdressFormProps {
  adressInputs: PropsOption[];
  fieldLegend: string;
  selectInput: PropsOption;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;

  values: AdressData;
  checked: boolean;
}
