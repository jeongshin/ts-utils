/**
 * assert and narrow type of data
 *
 * @param {unknown} data - test data
 * @param {T} type - expected type of data
 * @returns boolean
 */
export function assertType<
  T extends 'string' | 'null' | 'number' | 'object' | 'function' | 'undefined',
>(
  data: unknown,
  type: T,
): data is T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : T extends 'null'
  ? null
  : T extends 'object'
  ? Record<any, any>
  : T extends 'function'
  ? (...args: any) => any
  : T extends 'undefined'
  ? undefined
  : never {
  switch (type) {
    case 'string':
      return typeof data === 'string';
    case 'null':
      return data === null;
    case 'number':
      return typeof data === 'number';
    case 'object':
      return data !== null && typeof data === 'object';
    case 'function':
      return typeof data === 'function';
    case 'undefined':
      return data === undefined;
  }
  throw new Error(`unknown data type ${type}`);
}

/**
 * check object is empty or not
 *
 * @param obj - non empty object
 * @returns boolean - true if it's not empty
 */
export function isNonEmptyObject(obj: Record<any, any>): boolean {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).length !== 0;
}
