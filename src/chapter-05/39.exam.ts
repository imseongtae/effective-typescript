{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const getLengthBad = (array: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return array.length;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const getLength = (array: any[]) => array.length;

  getLengthBad(/123/); // 오류 없음, undefined 반환

  // @ts-expect-error - Argument of type 'RegExp' is not assignable to parameter of type 'any[]'.
  getLength(/123/);
  // Argument of type 'RegExp' is not assignable to parameter of type 'any[]'.
  // Type 'RegExp' is missing the following properties from type 'any[]': length, pop, push, concat, and 29 more.
}

// NOTE: 객체이지만 값을 알 수 없을 때 { [key: string]: any } 사용
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasTwelveLetterKey = (o: { [key: string]: any }) => {
    for (const key in o) {
      if (key.length === 12) {
        console.log(key, o[key]);

        return true;
      }
    }
    return false;
  };

  hasTwelveLetterKey({ abcdefghijkl: 12 }); // true
}

// NOTE: 모든 비기본형 타입을 포함하는 object 타입 사용
{
  const hasTwelveLetterKey = (o: object) => {
    for (const key in o) {
      if (key.length === 12) {
        // @ts-expect-error - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
        console.log(key, o[key]);

        return true;
      }
    }
    return false;
  };

  hasTwelveLetterKey({ abcdefghijkl: 12 }); // true
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  type Fn0 = () => any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  type Fn1 = (arg: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  type FnN = (...args: any[]) => any;
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  const numArgsBad = (...args: any) => args.length; // any 반환
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const numArgsGood = (...args: any[]) => args.length; // number 반환
}
