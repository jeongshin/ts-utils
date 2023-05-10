import { assertType } from '../';

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
