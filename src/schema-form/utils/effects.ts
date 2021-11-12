import {Subject} from 'rxjs';
import {nextTick, Ref} from 'vue';
import {EffectsContext, EffectsHandlers, Paths, SchemaFormFieldStates, SchemaFormStore} from '../../../types';
import {FieldDefinition, SchemaFormEvents} from '../internal/utils';
import runValidation from '../uform/validator';
import {values} from './object';
import {appendPath, findFieldPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath, takePath} from './path';

let contextId = 1;

class SchemaContext {

  store: SchemaFormStore;
  currentValue: Ref;
  onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>;

  constructor(store: SchemaFormStore, currentValue: Ref, onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>) {
    this.store = store;
    this.currentValue = currentValue;
    this.onOk = onOk
  }

  public matchFields = (paths: Paths): FieldDefinition[] => {
    const matchedPaths = match(paths, this.store.fields as any);
    return matchedPaths.map(path => this.store.fields[path]).filter(it => !!it) as any;
  };

}

export const defineEffectsContext = () => {

  const context: EffectsContext = function(...paths) {
    const required = (required: boolean) => {
      if (typeof required === 'boolean') {
        context.__context.matchFields(paths).forEach(field => {
          field.required = required;
        });
      }
      return context(...paths);
    };
    const hide = (hide?: boolean): EffectsHandlers => {
      context.__context.matchFields(paths).forEach(field => {
        if (typeof hide === 'boolean') {
          field.visible = !hide;
        } else {
          field.visible = false;
        }
      });
      return context(...paths);
    };
    const show = (show?: boolean): EffectsHandlers => {
      context.__context.matchFields(paths).forEach(field => {
        if (typeof show === 'boolean') {
          field.visible = show;
        } else {
          field.visible = true;
        }
      });
      return context(...paths);
    };
    const disable = (disable?: boolean) => {
      context.__context.matchFields(paths).forEach(field => {
        if (typeof disable === 'boolean') {
          field.disabled = disable;
        } else {
          field.disabled = true;
        }
      });
      return context(...paths);
    };
    const editable = (value = true) => {
      context.__context.matchFields(paths).forEach(field => {
        field.editable = value;
      });
      return context(...paths);
    };
    const readOnly = (value = true) => {
      context.__context.matchFields(paths).forEach(field => {
        field.editable = !value;
      });
      return context(...paths);
    };
    const enable = (enable?: boolean) => {
      context.__context.matchFields(paths).forEach(field => {
        if (typeof enable === 'boolean') {
          field.disabled = !enable;
        } else {
          field.disabled = false;
        }
      });
      return context(...paths);
    };
    return {
      setTitle: (title) => {
        context.__context.matchFields(paths).forEach(field => {
          if (typeof title === 'function') {
            field.title = title(field);
          } else {
            field.title = title;
          }
        });
        return context(...paths);
      },
      setStates: (states: SchemaFormFieldStates) => {
        if (states.required !== undefined) {
          required(states.required);
        }
        if (states.visible !== undefined) {
          show(states.visible);
        }
        if (states.editable !== undefined) {
          editable(states.editable);
        }
        if (states.readonly !== undefined) {
          readOnly(states.readonly);
        }
        if (states.enable !== undefined) {
          enable(states.enable);
        }
        return context(...paths);
      },
      paths: () => context(...paths).fields().map(it => it.plainPath),
      fields: () => context.__context.matchFields(paths),
      field: () => {
        const fields = context.__context.matchFields(paths);
        if (fields.length >= 2) {
          throw new Error(paths + '匹配到超过1个字段');
        }
        return fields[0];
      },
      toggle: (): EffectsHandlers => {
        context.__context.matchFields(paths).forEach(field => {
          field.visible = !field.visible;
        });
        return context(...paths);
      },
      value: (value: unknown) => {
        const res = context.__context.matchFields(paths).map(it => {
          if (typeof value === 'function') {
            it.setGetValue(value(it));
          } else {
            it.setGetValue(value);
          }
        });
        if (value === undefined) {
          if (paths.length === 1 && !isFuzzyPath(paths[0])) {
            return res[0];
          } else {
            return res;
          }
        }
      },
      hide,
      show,
      required,
      disable,
      editable,
      readonly: readOnly,
      enable,
      setEnum: (options: any): EffectsHandlers => {
        context.__context.matchFields(paths).forEach(field => {
          field.enum = options;
        });
        return context(...paths);
      },
      setFieldProps: (props): EffectsHandlers => {
        context.__context.matchFields(paths).forEach(field => {
          field.props = Object.assign({}, field.props, props);
        });
        return context(...paths);
      },
      onFieldCreate: (callback): EffectsHandlers => {
        context.subscribe(SchemaFormEvents.fieldCreate, paths, callback);
        return context(...paths);
      },
      onFieldBlur: (callback): EffectsHandlers => {
        context.subscribe(SchemaFormEvents.fieldBlur, paths, callback);
        return context(...paths);
      },
      setDisplayValue: (value: any) => {
        context.__context.matchFields(paths).forEach(field => {
          field.displayValue = value;
        });
        return context(...paths);
      },
      onFieldFocus: (callback): EffectsHandlers => {
        context.subscribe(SchemaFormEvents.fieldFocus, paths, callback);
        return context(...paths);
      },
      onFieldCreateOrChange: (callback): EffectsHandlers =>
          context(...paths).onFieldCreate(callback)
              .onFieldChange(callback),
      onFieldChange: (callback): EffectsHandlers => {
        context.subscribe(SchemaFormEvents.fieldChange, paths, callback);
        return context(...paths);
      },
      subscribe: (event: string, callback): EffectsHandlers => {
        context.subscribe(event, paths, callback);
        return context(...paths);
      },
      trigger: (event: string, value: any): EffectsHandlers => {
        context.__context.matchFields(paths).forEach(field => {
          context.trigger(event, {
            path: field.plainPath,
            value,
            field
          });
        });
        return context(...paths);
      },
      takePath: (number: number): EffectsHandlers => {
        if (paths.length === 0) {
          return context();
        } else {
          if (typeof paths[0] === 'string') {
            return context(...takePath(paths as string[], number));
          } else {
            return context(...takePath((paths).map((it: any) => findFieldPath(
                it, context.__context.store.fields as any
            )), number));
          }
        }
      },
      appendPath: (suffix: string): EffectsHandlers => {
        if (paths.length === 0) {
          return context();
        } else {
          if (typeof paths[0] === 'string') {
            return context(...appendPath(paths as string[], suffix));
          } else {
            return context(...appendPath((paths).map((it: any) => findFieldPath(it, context.__context.store.fields as any)), suffix));
          }
        }
      },
      isEnabled: (): boolean => !context.__context.matchFields(paths).some(it => it.disabled),
      replaceLastPath: (...last: string[]): EffectsHandlers =>
          context(...replaceLastPath(paths as string[], last)),
    } as EffectsHandlers;
  };
  context.subscribes = {};
  context.subscribe = (e: string, pathsOrHandler, handler) => {
    if (!context.subscribes[e]) {
      context.subscribes[e] = new Subject();
    }
    context.subscribes[e].subscribe({
      next: (v) => {
        nextTick(() => {
          if (typeof pathsOrHandler === 'function') {
            pathsOrHandler(v);
          } else {
            let patterns: string[];
            if (typeof pathsOrHandler === 'string') {
              patterns = [pathsOrHandler];
            } else {
              patterns = Array.isArray(pathsOrHandler) ? (pathsOrHandler as any[]).map((item: any) => {
                if (typeof item === 'string') {
                  return item;
                } else {
                  return findFieldPath(item, context.__context.store.fields as any);
                }
              }) : [findFieldPath(pathsOrHandler, context.__context.store.fields as any)];
            }
            if (isPathMatchPatterns(v.field, patterns)) {
              if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                handler(v.value, v.path);
              } else if ([SchemaFormEvents.fieldFocus, SchemaFormEvents.fieldBlur].includes(e as any)) {
                handler(v.path, v.event);
              } else {
                handler(v.value);
              }
            }
          }
        });
      }
    });
  };
  context.trigger = (event: string, value: any) => {
    nextTick(() => {
      const subject = context.subscribes[event];
      if (subject) {
        subject.next(value);
      }
    });
  };
  context.getValue = () => {
    return context.__context.currentValue.value;
  };
  context.submit = (forceValidate: boolean, callback: (value) => any) => {
    context.__context.onOk(forceValidate, callback);
  };
  context.validate = async (handler) => {
    const errors = await runValidation(values(context.__context.store.fields).filter(it => it.getComponent()?.mode !== 'layout'));
    if (handler) {
      handler(errors, context);
    } else {
      return errors;
    }
  };
  context.onValidate = (handler) => {
    context.subscribe(SchemaFormEvents.validate, handler);
  };
  return context;
};

export const createContext = (store: SchemaFormStore,
                              onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>,
                              currentValue: Ref,
                              preDefinedContext?: EffectsContext): EffectsContext => {

  const context: EffectsContext = preDefinedContext || defineEffectsContext();
  context.__context = new SchemaContext(store, currentValue, onOk)

  store.id = contextId++;
  return context;
};
