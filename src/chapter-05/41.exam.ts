/* eslint-disable @typescript-eslint/no-unused-vars */

// NOTE: any 타입의 진화는 암시적 any 타입에 어떤 값을 할당할 때만 발생
{
  const range = (start: number, limit: number) => {
    // @ts-expect-error - Variable 'out' implicitly has type 'any[]' in some locations where its type cannot be determined.ts(7034)
    const out = [];

    if (start === limit) {
      // @ts-expect-error - 변수가 암시적 any 상태일 때 값을 읽으려고 하면 오류 발생
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return out;
    }

    for (let i = start; i < limit; i++) {
      out.push(i);
    }
    return out;
  };

  const result = range(0, 10);
  console.log('result:', result);
}

{
  const range = (start: number, limit: number) => {
    // @ts-expect-error - Variable 'out' implicitly has type 'any[]' in some locations where its type cannot be determined.ts(7034)
    const out = [];

    if (start === limit) {
      // @ts-expect-error - 변수가 암시적 any 상태일 때 값을 읽으려고 하면 오류 발생
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return out;
    }

    for (let i = start; i < limit; i++) {
      out.push(i);
    }
    return out;
  };

  const makeSquares = (start: number, limit: number) => {
    // @ts-expect-error - Variable 'out' implicitly has type 'any[]' in some locations where its type cannot be determined.ts(7034)
    const out = [];

    range(start, limit).forEach(i => {
      out.push(i * i);
    });

    // @ts-expect-error - 변수가 암시적 any 상태일 때 값을 읽으려고 하면 오류 발생
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return out;
  };
}
