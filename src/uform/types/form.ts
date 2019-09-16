import {IField} from 'v-schema-form-types';
import {IFieldState} from './field';
import {Path} from './path';
import {ISchema} from './schema';

export interface IFormPayload {
  formState: IFormState;
}

export interface IFieldError {
  errors: string[];
  name: string;
}

export interface IFormState<V = any> {
  dirty: boolean; // 是否存在变化
  errors: IFieldError[]; // 错误提示集合
  initialValues: V; // 初始化数据
  invalid: boolean; // 是否不合法
  pristine: boolean; // 是否是原始态
  valid: boolean; // 是否合法
  values: V; // 表单数据
}

// 通过 createActions  创建出来的 actions 接口
export interface IFormActions {
  dispatch: <T = any>(type: string, payload: T) => void;
  getFieldState: {
    (
      name: Path | IFormPathMatcher,
      callback: (fieldState: IFieldState) => void
    ): void
    (name: Path | IFormPathMatcher): IFieldState
  };
  getFormState: {
    (): IFormState
    (callback: (formState: IFormState) => void): void
  };
  getSchema: (path: Path) => ISchema;
  reset: (
    forceClear?: boolean | {
      forceClear?: boolean;
      validate?: boolean
    },
    validate?: boolean
  ) => void;
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback: (fieldState: IFieldState) => void
  ) => Promise<void>;
  setFormState: (callback: (formState: IFormState) => void) => Promise<void>;
  submit: () => Promise<IFormState>;
  validate: () => Promise<IFormState>; // error will be IFormState['errors']
}

export interface IFormPathMatcher {
  hasWildcard: boolean;
  pattern: string;

  (payload: IField | Path | {
    fieldState: IFieldState
  }): boolean;
}
