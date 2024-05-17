import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
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
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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

  values: InputData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface AdressFormProps {
  adressInputs: PropsOption[];
  fieldLegend: string;
  selectInput: PropsOption;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  values: InputData;
}
