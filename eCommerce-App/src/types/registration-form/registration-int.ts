import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputData {
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  password: string;
}

export interface PropsOption extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage: string;
  required: boolean;
}
