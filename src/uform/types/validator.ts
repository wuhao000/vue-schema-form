import {IField} from '../../../types';

export interface IValidateResponse {
  errors: string[];
  field: IField;
  invalid: boolean;
  name: string;
  valid: boolean;
  value: any;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;
