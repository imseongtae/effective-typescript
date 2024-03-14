// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
declare function cacheLast<T extends Function>(fn: T): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function shallowEqual(a: any, b: any): boolean;

{
  const cacheLast = <T extends Function>(fn: T): T => {
    let lastArgs: any[] | null = null;
    let lastResult: any;
    return function (...args: any[]) {
      if (!lastArgs || !shallowEqual(lastArgs, args)) {
        lastResult = fn(...args);
        lastArgs = args;
      }
      return lastResult;
    } as unknown as T;
  };
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shallowEqual = <T extends object>(a: T, b: T): boolean => {
    for (const [k, aVal] of Object.entries(a)) {
      // @ts-expect-error - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
      if (!(k in b) || aVal !== b[k]) {
        return false;
      }
    }
    return Object.keys(a).length === Object.keys(b).length;
  };
}

{
  interface MyObject {
    [key: string]: any;
  }

  const isEqual = (obj1: MyObject, obj2: MyObject): boolean => {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        // 단언문 사용
        const val1 = obj1[key];
        const val2 = obj2[key];

        // 객체의 동일한 키에 대해 값이 같은지 확인
        if (val1 !== val2) {
          return false;
        }
      }
    }
    return true;
  };

  const objA = { a: 1, b: '2' };
  const objB = { a: 1, b: '2' };

  console.log(isEqual(objA, objB)); // true
}

{
  interface MyObject {
    [key: string]: any;
  }

  const isPropertyEqual = (obj1: MyObject, obj2: MyObject, key: string): boolean => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    return val1 === val2;
  };

  const isEqual = (obj1: MyObject, obj2: MyObject): boolean => {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (!isPropertyEqual(obj1, obj2, key)) {
          return false;
        }
      }
    }
    return true;
  };

  const objA = { a: 1, b: 2 };
  const objB = { a: 1, b: 2 };

  console.log(isEqual(objA, objB)); // true
}
