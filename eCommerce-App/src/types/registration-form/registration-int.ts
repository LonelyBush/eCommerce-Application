import { ChangeEvent, InputHTMLAttributes } from 'react';

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

export interface PropsOption extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  name: string;
  id: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage: string;
  required: boolean;
  options?: SelectOptionProps[];
}

export interface CredentialsProps
  extends InputHTMLAttributes<HTMLInputElement> {
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

  values: AdressData;
}
