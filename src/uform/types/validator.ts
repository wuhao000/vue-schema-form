import {IField} from 'v-schema-form-types';

export interface IValidateResponse {
  errors: string[];
  field: IField;
  invalid: boolean;
  name: string;
  valid: boolean;
  value: any;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;
