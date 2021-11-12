import {Observable} from 'rxjs/internal/Observable';
import {IFormActions, IFormPathMatcher} from './form';

export type Dispatcher = (eventName: string, payload: any) => void;
export type IEffects = (selector: ISelector, actions: IFormActions) => void;

export type ISelector = (
    eventName: string,
    formPathPattern: string | IFormPathMatcher
) => Observable<any>;
