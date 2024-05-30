/* eslint-disable import/no-extraneous-dependencies */
import { BaseAddress } from '@commercetools/platform-sdk';
import { ChangeEvent } from 'react';
import { LoginFormType } from '../types';

export interface CredentialsData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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
  label?: string;
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
  defaultValue?: string;
}

export interface CredentialsProps {
  nameInput: PropsOption[];
  dateInput: PropsOption[];

  values: CredentialsData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  setLoginData: React.Dispatch<React.SetStateAction<LoginFormType>>;
  loginData: LoginFormType;
}

export interface AdressFormProps {
  adressInputs: PropsOption[];
  fieldLegend: string;
  selectInput: PropsOption;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;

  onDefaultCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checkedDefault: boolean;
  values: BaseAddress;
  checked: boolean;
  fieldName: string;
}

export interface PostBody {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: BaseAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
}

export interface ModalText {
  title: string;
  text: string;
}
