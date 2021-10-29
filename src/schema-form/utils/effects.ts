import {Subject} from 'rxjs';
import {nextTick} from 'vue';
import {EffectsContext, EffectsHandlers, Paths, SchemaFormStore} from '../../../types';
import {FieldDefinition, SchemaFormEvents} from '../internal/utils';
import runValidation from '../uform/validator';
import {appendPath, findFieldPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath, takePath} from './path';

let contextId = 1;

export const createContext = (store: SchemaFormStore, onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>, currentValue: any): EffectsContext => {
  const matchFields = (paths: Paths): FieldDefinition[] => {
    const matchedPaths = match(paths, store.fields as any);
    return matchedPaths.map(path => store.fields[path]).filter(it => !!it) as any;
  };
  const subscribes = {};
  const subscribe = (e: string, pathsOrHandler, handler) => {
    if (!subscribes[e]) {
      subscribes[e] = new Subject();
    }
    subscribes[e].subscribe({
      next: (v) => {
        nextTick(() => {
          if (typeof pathsOrHandler === 'function') {
            pathsOrHandler(v);
          } else {
            const patterns = typeof pathsOrHandler === 'string' ? [pathsOrHandler]
                : (Array.isArray(pathsOrHandler) ? (pathsOrHandler as any[]).map((item: any) => {
                  if (typeof item === 'string') {
                    return item;
                  } else {
                    return findFieldPath(item, store.fields as any);
                  }
                }) : [findFieldPath(pathsOrHandler, store.fields as any)]);
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
  const trigger = (event: string, value: any) => {
    nextTick(() => {
      const subject = store.context.subscribes[event];
      if (subject) {
        subject.next(value);
      }
    });
  };
  const context: EffectsContext = (...paths) => {
    return {
      setTitle: (title) => {
        matchFields(paths).forEach(field => {
          if (typeof title === 'function') {
            field.title = title(field);
          } else {
            field.title = title;
          }
        });
        return context(...paths);
      },
      paths: () => {
        return context(...paths).fields().map(it => it.plainPath);
      },
      fields: () => {
        return matchFields(paths);
      },
      field: () => {
        const fields = matchFields(paths);
        if (fields.length >= 2) {
          throw new Error(paths + '匹配到超过1个字段');
        }
        return fields[0];
      },
      toggle: (): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          field.visible = !field.visible;
        });
        return context(...paths);
      },
      value: (value: any) => {
        const res = matchFields(paths).map(it => it.setGetValue(value));
        if (value === undefined) {
          if (paths.length === 1 && !isFuzzyPath(paths[0])) {
            return res[0];
          } else {
            return res;
          }
        }
      },
      hide: (hide?: boolean): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          if (typeof hide === 'boolean') {
            field.visible = !hide;
          } else {
            field.visible = false;
          }
        });
        return context(...paths);
      },
      show: (show?: boolean): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          if (typeof show === 'boolean') {
            field.visible = show;
          } else {
            field.visible = true;
          }
        });
        return context(...paths);
      },
      setEnum: (options: any): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          field.enum = options;
        });
        return context(...paths);
      },
      setFieldProps: (props): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          field.props = Object.assign({}, field.props, props);
        });
        return context(...paths);
      },
      onFieldCreate: (callback): EffectsHandlers => {
        subscribe(SchemaFormEvents.fieldCreate, paths, callback);
        return context(...paths);
      },
      onFieldBlur: (callback): EffectsHandlers => {
        subscribe(SchemaFormEvents.fieldBlur, paths, callback);
        return context(...paths);
      },
      setDisplayValue: (value: any) => {
        matchFields(paths).forEach(field => {
          field.displayValue = value;
        });
        return context(...paths);
      },
      onFieldFocus: (callback): EffectsHandlers => {
        subscribe(SchemaFormEvents.fieldFocus, paths, callback);
        return context(...paths);
      },
      required: (required: boolean) => {
        if (typeof required === 'boolean') {
          matchFields(paths).forEach(field => {
            field.required = required;
          });
        }
        return context(...paths);
      },
      onFieldCreateOrChange: (callback): EffectsHandlers => {
        return context(...paths).onFieldCreate(callback)
            .onFieldChange(callback);
      },
      onFieldChange: (callback): EffectsHandlers => {
        subscribe(SchemaFormEvents.fieldChange, paths, callback);
        return context(...paths);
      },
      subscribe: (event: string, callback): EffectsHandlers => {
        subscribe(event, paths, callback);
        return context(...paths);
      },
      trigger: (event: string, value: any): EffectsHandlers => {
        matchFields(paths).forEach(field => {
          trigger(event, {
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
                it, store.fields as any
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
            return context(...appendPath((paths).map((it: any) => findFieldPath(it, store.fields as any)), suffix));
          }
        }
      },
      disable: (disable?: boolean) => {
        matchFields(paths).forEach(field => {
          if (typeof disable === 'boolean') {
            field.disabled = disable;
          } else {
            field.disabled = true;
          }
        });
        return context(...paths);
      },
      editable: (value = true) => {
        matchFields(paths).forEach(field => {
          field.editable = value;
        });
        return context(...paths);
      },
      readonly: (value = true) => {
        matchFields(paths).forEach(field => {
          field.editable = !value;
        });
        return context(...paths);
      },
      enable: (enable?: boolean) => {
        matchFields(paths).forEach(field => {
          if (typeof enable === 'boolean') {
            field.disabled = !enable;
          } else {
            field.disabled = false;
          }
        });
        return context(...paths);
      },
      replaceLastPath: (...last: string[]): EffectsHandlers => {
        return context(...replaceLastPath(paths as string[], last));
      }
    } as EffectsHandlers;
  };
  context.subscribe = subscribe;
  context.submit = (forceValidate: boolean, callback: (value) => any) => {
    onOk(forceValidate, callback);
  };
  context.validate = async (handler) => {
    const errors = await runValidation(currentValue.value, store.fields as any, true);
    if (handler) {
      handler(errors, context);
    } else {
      return errors;
    }
  };
  context.onValidate = (handler) => {
    context.subscribe(SchemaFormEvents.validate, handler);
  };
  context.subscribes = subscribes;
  context.getValue = () => {
    return currentValue.value;
  };
  context.trigger = trigger;
  store.id = contextId++;
  return context;
};
