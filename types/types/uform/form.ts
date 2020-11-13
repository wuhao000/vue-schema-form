import {Subject} from 'rxjs/internal/Subject';
import {Platform} from '../bean';
import {VNode} from 'vue';
import {IField, ISubscribers} from '../form';
import {IEffects} from './effects';
import {IFieldState} from './field';
import {Path} from './path';
import {ISchema} from './schema';

export interface IFormPayload {
  formState: IFormState;
}

export interface IFieldPayload {
  fieldState: IFieldState;
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

export interface IFormOptions<V = any> {
  defaultValue?: V;
  editable: boolean | ((name: string) => boolean);
  effects: IEffects;
  initialValues?: V;
  onFieldChange: (payload: (v) => void) => void;
  onFormChange: (payload: IFormPayload) => void;
  onFormWillInit?: (form: any) => void;
  onReset: (payload: IFormPayload) => void;
  onSubmit: (values: any) => Promise<any> | void;
  onValidateFailed: (fieldErrors: IFieldError[]) => void;
  schema: ISchema;
  subscribes: ISubscribers;
  traverse?: (schema: ISchema) => ISchema;
  values?: V;
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

// 通过 createAsyncActions 创建出来的 actions 接口
export interface IAsyncFormActions {
  dispatch: <T = any>(type: string, payload: T) => Promise<void>;
  getFieldState: {
    (
      name: Path | IFormPathMatcher,
      callback: (fieldState: IFieldState) => void
    ): Promise<void>
    (name: Path | IFormPathMatcher): Promise<IFieldState>
  };
  getFormState: {
    (): Promise<IFormState>
    (callback: (formState: IFormState) => void): Promise<void>
  };
  getSchema: (path: Path) => Promise<ISchema>;
  reset: (
    forceClear?: boolean | {
      forceClear?: boolean;
      validate?: boolean
    },
    validate?: boolean
  ) => Promise<void>;
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback: (fieldState: IFieldState) => void
  ) => Promise<void>;
  setFormState: (callback: (fieldState: IFormState) => void) => Promise<void>;
  submit: () => Promise<IFormState>;
  validate: () => Promise<IFormState>; // reject err will be IFormState['errors']
}

export interface IFormPathMatcher {
  hasWildcard: boolean;
  pattern: string;

  (payload: IField | Path | {
    fieldState: IFieldState
  }): boolean;
}

export type TextAlign = 'left' | 'right';
export type Size = 'small' | 'medium' | 'large';
export type LabelAlign = 'left' | 'top' | 'inset';

type ColSpanType = number | string;

export interface ColSize {
  offset?: ColSpanType;
  order?: ColSpanType;
  pull?: ColSpanType;
  push?: ColSpanType;
  span?: ColSpanType;
}

export interface ColProps {
  lg?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  offset?: ColSpanType;
  order?: ColSpanType;
  prefixCls?: string;
  pull?: ColSpanType;
  push?: ColSpanType;
  sm?: ColSpanType | ColSize;
  span?: ColSpanType;
  xl?: ColSpanType | ColSize;
  xs?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
}

// export type ColProps = { span: number; offset?: number } | number

export interface IFormItemGridProps {
  cols?: any;
  description?: string;
  extra?: VNode | string;
  help?: VNode | string;
  name?: string;
  title?: string;
}

interface IFormSharedProps {
  autoAddColon?: boolean;
  inline?: boolean;
  labelAlign?: LabelAlign;
  labelCol?: ColProps | number;
  labelTextAlign?: TextAlign;
  maxTipsNum?: number;
  prefix?: string;
  size?: Size;
  wrapperCol?: ColProps | number;
}

export interface IFormProps extends IFormSharedProps {
  component?: string;
  layout?: string;
  onValidateFailed?: () => void;
}

export interface IFormItemProps extends IFormSharedProps {
  extra?: VNode | string;
  help?: VNode | string;
  id?: string;
  isTableColItem?: boolean;
  label?: VNode | string;
  noMinHeight?: boolean;
  required?: boolean;
  schema?: ISchema;
  type?: string;
  validateState?: any;
}
