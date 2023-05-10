import { assertType, isNonEmptyObject } from '../';

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
      expect(assertType({}, 'undefined')).toBe(true);
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
});
