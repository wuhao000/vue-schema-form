export type EffectsContext = (
  path: string | string[]
) => EffectsHandlers;

export interface EffectsHandlers {
  hide: () => any;
  show: () => any;
  setEnum: (options: any) => any;
  setFieldProps: (props: object) => void;
  onFieldChange: (value: any) => any;
  subscribe: (event: string, handler: (...args: any) => any) => any;
}

export type Effects = (context: EffectsContext) => any;
