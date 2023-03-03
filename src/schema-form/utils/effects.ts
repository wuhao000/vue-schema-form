import { Subject } from 'rxjs';
import { nextTick, Ref } from 'vue';
import { EffectsContext, EffectsHandlers, Paths, SchemaFormFieldStates, SchemaFormStore } from '../../../types';
import { FieldDefinition } from '../bean/field-definition';
import { SchemaFormEvents } from '../internal/utils';
import runValidation from '../uform/validator';
import { values } from './object';
import { appendPath, findFieldPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath, takePath } from './path';
import { isNotNull } from './utils';

let contextId = 1;

class SchemaContext {

  store: SchemaFormStore;
  currentValue: Ref;
  onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>;

  constructor(store: SchemaFormStore, currentValue: Ref, onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>) {
    this.store = store;
    this.currentValue = currentValue;
    this.onOk = onOk;
  }

  public matchFields = (paths: Paths): FieldDefinition[] => {
    const matchedPaths = match(paths, this.store.fields as any);
    return matchedPaths.map(path => {
      if (typeof path === 'object') {
        return path;
      } else {
        return this.store.fields[path];
      }
    }).filter(it => !!it) as any;
  };

}

export const defineEffectsContext = <V>() => {

  const context: EffectsContext = function (...paths) {
    const required = (required: boolean) => {
      context.afterInitialized(() => {
        if (typeof required === 'boolean') {
          context.__context.matchFields(paths).forEach(field => {
            field.required = required;
          });
        }
      });
      return context(...paths);
    };
    const hide = (hide?: boolean): EffectsHandlers<V> => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          if (typeof hide === 'boolean') {
            field.setVisible(!hide);
          } else {
            field.setVisible(false);
          }
        });
      });
      return context(...paths);
    };
    const show = (show?: boolean): EffectsHandlers<V> => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          if (typeof show === 'boolean') {
            field.setVisible(show);
          } else {
            field.setVisible(true);
          }
        });
      });
      return context(...paths);
    };
    const disable = (disable?: boolean) => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          if (typeof disable === 'boolean') {
            field.disabled = disable;
          } else {
            field.disabled = true;
          }
        });
      });
      return context(...paths);
    };
    const editable = (value = true) => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          field.editable = value;
        });
      });
      return context(...paths);
    };
    const readOnly = (value = true) => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          field.editable = !value;
        });
      });
      return context(...paths);
    };
    const enable = (enable?: boolean) => {
      context.afterInitialized(() => {
        context.__context.matchFields(paths).forEach(field => {
          if (typeof enable === 'boolean') {
            field.disabled = !enable;
          } else {
            field.disabled = false;
          }
        });
      });
      return context(...paths);
    };
    return {
      setTitle: (title) => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            if (typeof title === 'function') {
              field.title = title(field);
            } else {
              field.title = title;
            }
          });
        });
        return context(...paths);
      },
      setStates: (states: SchemaFormFieldStates) => {
        context.afterInitialized(() => {
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
        });
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
      toggle: (): EffectsHandlers<V> => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            field.setVisible(!field.isVisible());
          });
        });
        return context(...paths);
      },
      reset: (): EffectsHandlers<V> => {
        if (!context.initialized()) {
          console.warn('SchemaForm尚未初始化');
        } else {
          context.__context.matchFields(paths).forEach(it => {
            if (it.plainPath !== '') {
              it.reset();
            }
          });
        }
        return context(...paths);
      },
      value: (value: unknown) => {
        if (!context.initialized()) {
          console.warn('SchemaForm尚未初始化');
          return undefined;
        }
        const res = context.__context.matchFields(paths).map(it => {
          if (typeof value === 'function') {
            return it.setGetValue(value(it));
          } else {
            return it.setGetValue(value);
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
      setEnum: (options: any): EffectsHandlers<V> => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            field.enum = options;
          });
        });
        return context(...paths);
      },
      setFieldProps: (props): EffectsHandlers<V> => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            Object.assign(field.props, props);
          });
        });
        return context(...paths);
      },
      onFieldCreate: (callback): EffectsHandlers<V> => {
        context.subscribe(SchemaFormEvents.fieldCreate, paths, callback);
        return context(...paths);
      },
      onFieldBlur: (callback): EffectsHandlers<V> => {
        context.subscribe(SchemaFormEvents.fieldBlur, paths, callback);
        return context(...paths);
      },
      setDisplayValue: (value: any) => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            field.displayValue = value;
          });
        });
        return context(...paths);
      },
      onFieldFocus: (callback): EffectsHandlers<V> => {
        context.subscribe(SchemaFormEvents.fieldFocus, paths, callback);
        return context(...paths);
      },
      onFieldCreateOrChange: (callback): EffectsHandlers<V> =>
          context(...paths).onFieldCreate(callback)
              .onFieldChange(callback),
      onFieldChange: (callback): EffectsHandlers<V> => {
        context.subscribe(SchemaFormEvents.fieldChange, paths, callback);
        return context(...paths);
      },
      subscribe: (event: string, callback): EffectsHandlers<V> => {
        context.subscribe(event, paths, callback);
        return context(...paths);
      },
      trigger: (event: string, value: any): EffectsHandlers<V> => {
        context.afterInitialized(() => {
          context.__context.matchFields(paths).forEach(field => {
            context.trigger(event, {
              path: field.plainPath,
              value,
              field
            });
          });
        });
        return context(...paths);
      },
      takePath: (number: number): EffectsHandlers<V> => {
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
      appendPath: (suffix: string): EffectsHandlers<V> => {
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
      replaceLastPath: (...last: string[]): EffectsHandlers<V> =>
          context(...replaceLastPath(paths as string[], last))
    } as EffectsHandlers<V>;
  } as EffectsContext;
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
              const h = context(v.field.plainPath);
              if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                handler.call(h, v.value, v.path, v.oldValue);
              } else if ([SchemaFormEvents.fieldFocus, SchemaFormEvents.fieldBlur].includes(e as any)) {
                handler.call(h, v.path, v.event);
              } else {
                handler.call(h, v.value);
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
  context.initialized = () => {
    return isNotNull(context.__context);
  };
  context.callStack = [];
  context.afterInitialized = (callback: () => void) => {
    if (context.initialized()) {
      callback();
    } else {
      return context.callStack.push(callback);
    }
    return undefined;
  };
  context.getValue = () => {
    if (!context.initialized()) {
      console.warn('SchemaForm尚未初始化');
      return undefined;
    }
    return context.__context.currentValue.value;
  };
  context.submit = (forceValidate: boolean, callback: (value) => any) => {
    context.__context.onOk(forceValidate, callback);
  };
  context.validate = async () => {
    return runValidation(values(context.__context.store.fields).filter(it => it.getComponent()?.mode !== 'layout'));
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
  context.__context = new SchemaContext(store, currentValue, onOk);
  nextTick().then(() => {
    context.callStack.forEach(it => it());
    context.callStack = [];
  });
  store.id = contextId++;
  return context;
};
