import {IField} from 'types';
import {IValidateResponse, ValidateHandler} from '../types';
import {clone, each, format, isArr, isEmpty, isEqual, isFn, reduce, toArr} from './utils';
import {validate} from './validators';

export * from './message';

const flatArr = (arr: any[]) => {
  return reduce(
    arr,
    (buf: any, item: any) => {
      return isArr(item)
        ? buf.concat(flatArr(item))
        : item
          ? buf.concat(item)
          : buf;
    },
    []
  );
};

export {format};

export const runValidation = async (
  values: object,
  fieldMap: { [key: string]: IField },
  forceUpdate?: boolean | ValidateHandler,
  callback?: ValidateHandler
): Promise<IValidateResponse[]> => {
  const queue = [];
  if (isFn(forceUpdate)) {
    callback = forceUpdate as ValidateHandler;
    forceUpdate = false;
  }
  each(fieldMap, (field: IField, name) => {
    const value = field.value;
    if (field.visible === false ||
      field.display === false ||
      field.editable === false) {
      return;
    }
    if (!forceUpdate) {
      if (isEmpty(field.lastValidateValue) && isEmpty(value)) {
        return;
      }
      if (isEqual(field.lastValidateValue, value)) {
        return;
      }
    }
    const title = field.definition.props?.title;
    const rafId = setTimeout(() => {
      field.loading = true;
      field.dirty = true;
      if (field.notify) {
        field.notify();
      }
    }, 100);
    queue.push(
      Promise.all(
        field.rules.map(rule => {
          return validate(value, rule, values, title || name);
        })
      ).then(errors => {
        clearTimeout(rafId);
        const lastFieldErrors = toArr(field.errors);
        const lastValid = field.valid;
        const lastLoading = field.loading;
        const newErrors = flatArr(toArr(errors));
        const effectErrors = flatArr(toArr(field.effectErrors));
        field.loading = false;
        field.errors = newErrors;
        field.effectErrors = effectErrors;
        if (forceUpdate) {
          if (newErrors.length || effectErrors.length) {
            field.valid = false;
            field.invalid = true;
          } else {
            field.valid = true;
            field.invalid = false;
          }
          field.dirty = true;
        } else {
          if (!field.pristine) {
            if (newErrors.length || effectErrors.length) {
              field.valid = false;
              field.invalid = true;
            } else {
              field.valid = true;
              field.invalid = false;
            }
            if (
              !isEqual(lastValid, field.valid) ||
              !isEqual(lastFieldErrors, field.errors)
            ) {
              field.dirty = true;
            }
          }
        }

        if (field.loading !== lastLoading) {
          field.dirty = true;
        }

        if (field.dirty && field.notify) {
          field.notify();
        }
        field.lastValidateValue = clone(value);
        return {
          name,
          value,
          field,
          invalid: field.invalid,
          valid: field.valid,
          errors: newErrors.concat(effectErrors)
        };
      })
    );
  });

  return Promise.all(queue).then((response: IValidateResponse[]) => {
    const errors = response.filter(it => it.invalid);
    if (isFn(callback)) {
      callback(errors);
    }
    return errors;
  });
};

export default runValidation;
