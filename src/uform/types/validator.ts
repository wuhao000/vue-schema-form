import {IFieldState} from './field';

export interface IValidateResponse {
  errors: string[];
  field: IFieldState;
  invalid: boolean;
  name: string;
  valid: boolean;
  value: any;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;
