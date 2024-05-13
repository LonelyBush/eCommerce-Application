import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  password: string;
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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value?: string;
  errorMessage: string;
  required: boolean;
  options?: SelectOptionProps[];
}
