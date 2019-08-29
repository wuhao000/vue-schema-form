import {IField} from '@/uform/types';

export interface EffectsContext {
}

export interface Effects {
  onFieldChange: (field: IField, value: any, context: EffectsContext) => {};
}
