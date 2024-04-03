{
  function double(x) {
    return x + x;
  }
}

{
  function double(x: number | string): number | string;
  function double(x: any) {
    return x + x;
  }

  const num = double(12); // string | number
  const str = double('x'); // string | number
}

// NOTE: 제너릭 사용
{
  function double<T extends number | string>(x: T): T;
  function double(x: any) {
    return x + x;
  }

  const num = double(12); // Type is 12
  const str = double('x'); // Type is "x"
}

// NOTE: 여러 가지 타입 선언으로 분리
{
  function double(x: number): number;
  function double(x: string): string;
  function double(x: any) {
    return x + x;
  }

  const num = double(12); // Type is number
  const str = double('x'); // Type is string
}

// NOTE: 조건부 타입의 사용
{
  function double<T extends number | string>(x: T): T extends string ? string : number;
  function double(x: any) {
    return x + x;
  }

  const num = double(12); // number
  const str = double('x'); // string
}
