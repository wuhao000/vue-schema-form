import {ArrayPath, ISchema, isFn, Path} from '../types';
import {getIn, setIn} from './accessor';
import {each, toArr} from './array';
import {isEmpty} from './isEmpty';

const numberRE = /^\d+$/;
const VIRTUAL_BOXES = {};

interface IRuleDescription {
  message?: string;
  pattern?: RegExp | string;
  required?: boolean;
  validator?: RuleHandler;
}

interface IPathInfo {
  name: string;
  path: string[];
  schemaPath: string[];
}

type RuleHandler = (
    value: any,
    rule: IRuleDescription,
    values: object,
    name: string
) => string | null;

export const getSchemaNodeFromPath = (schema: ISchema, path: Path) => {
  let res = schema;
  let suc = 0;
  const copyPath = toArr(path);
  for (let i = 0; i < copyPath.length; i++) {
    const key = copyPath[i];
    if (res && !isEmpty(res.properties)) {
      res = res.properties[key];
      suc++;
    } else if (res && !isEmpty(res.items) && numberRE.test(key as string)) {
      res = res.items;
      suc++;
    }
  }
  return suc === copyPath.length ? res : undefined;
};

export const schemaIs = (schema: ISchema, type: string) => {
  return schema && schema.type === type;
};

export const isVirtualBox = (name: string) => {
  return !!VIRTUAL_BOXES[name];
};

export const registerVirtualboxFlag = (name: string) => {
  VIRTUAL_BOXES[name] = true;
};

const isVirtualBoxSchema = (schema: ISchema) => {
  return isVirtualBox(schema.type) || isVirtualBox(schema['x-component']);
};

const schemaTraverse = (
    schema: ISchema,
    callback: any,
    path: ArrayPath = [],
    schemaPath = []
) => {
  if (schema) {
    let copyPath = null;
    if (isVirtualBoxSchema(schema)) {
      copyPath = path.slice(0, path.length - 1);
    }
    callback(schema, {path: copyPath, schemaPath});
    if (schemaIs(schema, 'object') || schema.properties) {
      each(schema.properties, (subSchema, key) => {
        schemaTraverse(
            subSchema,
            callback,
            copyPath.concat(key),
            schemaPath.concat(key)
        );
      });
    } else if (schemaIs(schema, 'array') || schema.items) {
      if (schema.items) {
        callback(
            schema.items,
            key => {
              schemaTraverse(
                  schema.items,
                  callback,
                  copyPath.concat(key),
                  schemaPath.concat(key)
              );
            },
            copyPath
        );
      }
    }
  }
};

export const calculateSchemaInitialValues = (
    schema: ISchema,
    initialValues: any,
    callback?: (pathInfo: IPathInfo, schema: ISchema, value: any) => void
) => {
  const copyInitialValues = initialValues || schema.default || {};
  schemaTraverse(schema, (subSchema, $path, parentPath) => {
    const defaultValue = subSchema.default;
    if (isFn($path) && parentPath) {
      each(toArr(getIn(copyInitialValues, parentPath)), (value, index) => {
        $path(index);
      });
    } else if ($path) {
      const isVirtualBoxInstance = isVirtualBoxSchema(subSchema);
      const name = isVirtualBoxInstance
          ? $path.schemaPath.join('.')
          : $path.path.join('.');
      const path = isVirtualBoxInstance ? $path.schemaPath : $path.path;
      const schemaPath = $path.schemaPath;
      const initialValue = getIn(copyInitialValues, name);
      const value = !isEmpty(initialValue) ? initialValue : defaultValue;
      if (!isEmpty(value)) {
        setIn(copyInitialValues, name, value);
      }
      if (callback && isFn(callback)) {
        const newPath = {
          name,
          path,
          schemaPath
        };
        callback(newPath, subSchema, value);
      }
    }
  });
  return copyInitialValues;
};
