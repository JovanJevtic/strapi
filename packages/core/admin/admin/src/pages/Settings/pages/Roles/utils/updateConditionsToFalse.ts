import has from 'lodash/has';
import omit from 'lodash/omit';

import { isObject } from '../../../../../utils/objects';

import { createArrayOfValues } from './createArrayOfValues';
/**
 * Changes all the conditions leaf when the properties are all falsy
 */
const updateConditionsToFalse = (obj: Record<string, any>): object => {
  return Object.keys(obj).reduce((acc: Record<string, any>, current) => {
    const currentValue = obj[current];

    if (isObject(currentValue) && !has(currentValue, 'conditions')) {
      return { ...acc, [current]: updateConditionsToFalse(currentValue) };
    }

    if (isObject(currentValue) && has(currentValue, 'conditions')) {
      const isActionEnabled = createArrayOfValues(omit(currentValue, 'conditions')).some(
        (val) => val
      );

      if (!isActionEnabled) {
        const updatedConditions = Object.keys(currentValue.conditions).reduce(
          (acc1: Record<string, boolean>, current) => {
            acc1[current] = false;

            return acc1;
          },
          {}
        );

        return { ...acc, [current]: { ...currentValue, conditions: updatedConditions } };
      }
    }

    acc[current] = currentValue;

    return acc;
  }, {});
};

export { updateConditionsToFalse };
