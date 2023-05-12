import { assertObjectValues, assertType, isNonEmptyObject } from '../';

describe('test core utils', () => {
  describe('assertType', () => {
    it('should return true if the data is of the expected type', () => {
      expect(assertType('hello', 'string')).toBe(true);
      expect(assertType(42, 'number')).toBe(true);
      expect(assertType(null, 'null')).toBe(true);
      expect(assertType({}, 'object')).toBe(true);
      expect(assertType(() => null, 'function')).toBe(true);
      expect(assertType(undefined, 'undefined')).toBe(true);
    });

    it('should return false if the data is not of the expected type', () => {
      expect(assertType(42, 'string')).toBe(false);
      expect(assertType('hello', 'number')).toBe(false);
      expect(assertType(undefined, 'null')).toBe(false);
      expect(assertType(null, 'object')).toBe(false);
      expect(assertType([], 'function')).toBe(false);
      expect(assertType({}, 'undefined')).toBe(false);
    });

    it('should narrow the type of the data', () => {
      const data: unknown = 'hello';
      if (assertType(data, 'string')) {
        const length: number = data.length;
        expect(length).toBe(5);
      } else {
        fail('type narrow error');
      }
    });

    it('should throw an error for an unknown data type', () => {
      //@ts-ignore: for testing error throwing
      expect(() => assertType('hello', 'invalid')).toThrowError('unknown data type invalid');
    });
  });

  describe('isNonEmptyObject', () => {
    it('should return true for a non-empty object', () => {
      expect(isNonEmptyObject({ foo: 'bar' })).toBe(true);
      expect(isNonEmptyObject({ a: 1, b: 2, c: 3 })).toBe(true);
      expect(isNonEmptyObject({})).toBe(false);
    });

    it('should return false for a non-object value', () => {
      //@ts-ignore: for testing invalid parameter
      expect(isNonEmptyObject(null)).toBe(false);
      //@ts-ignore: for testing invalid parameter
      expect(isNonEmptyObject(undefined)).toBe(false);
      //@ts-ignore: for testing invalid parameter
      expect(isNonEmptyObject(42)).toBe(false);
      //@ts-ignore: for testing invalid parameter
      expect(isNonEmptyObject('hello')).toBe(false);
      //@ts-ignore: for testing invalid parameter
      expect(isNonEmptyObject(true)).toBe(false);
      expect(isNonEmptyObject([])).toBe(false);
    });
  });

  describe('assertObjectValues', () => {
    it('should return false if the object is invalid', () => {
      //@ts-ignore: for testing invalid parameter
      expect(assertObjectValues(null, ['key1', 'key2'])).toBe(false);
      //@ts-ignore: for testing invalid parameter
      expect(assertObjectValues({}, ['key1', 'key2'])).toBe(false);
    });

    it('should return true if all specified keys have values that are not null, undefined, or empty object', () => {
      const obj = {
        key1: 0,
        key2: false,
        key3: '',
        key4: { nestedKey: 'nestedValue' },
        key5: [1, 2, 3],
      };
      expect(assertObjectValues(obj, ['key1', 'key2'])).toBe(true);
      expect(assertObjectValues(obj, ['key2', 'key3', 'key4', 'key5'])).toBe(true);
    });

    it('should return false if at least one specified key has a value that is null, undefined, or an empty object', () => {
      const obj = {
        key1: 0,
        key2: false,
        key3: '',
        key4: null,
        key5: undefined,
        key6: {},
        key7: { nestedKey: null },
      };
      expect(assertObjectValues(obj, ['key2', 'key3', 'key4', 'key5', 'key6', 'key7'])).toBe(false);
    });
  });
});
