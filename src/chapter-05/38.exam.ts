{
  // @ts-expect-error -  예제에서는 Bar 타입을 알 수 없음
  const processBar = (b: Bar) => console.log(b);

  const expressionReturnFoo = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const f = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const x: any = expressionReturnFoo();
    processBar(x);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enhancedF = () => {
    const x = expressionReturnFoo();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processBar(x as any);
  };
}

{
  // @ts-expect-error -  예제에서는 Bar 타입을 알 수 없음
  const processBar = (b: Bar) => console.log(b);
  const expressionReturnFoo = () => {};

  /** 함수에서 any를 전파하면, 그 영향력이 프로젝트 전반에 전염병처럼 퍼짐 */
  const f = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const x: any = expressionReturnFoo();
    processBar(x);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return x;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const g = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const foo = f();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    foo.fooMethod();
  };
}

{
  // @ts-expect-error -  예제에서는 Bar 타입을 알 수 없음
  const processBar = (b: Bar) => console.log(b);
  const expressionReturnFoo = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const f1 = () => {
    const x = expressionReturnFoo();
    processBar(x);
    return x;
  };
}

{
  // 'Foo' 타입은 'foo' 속성을 가짐
  interface Foo {
    foo: string;
  }

  // 'Bar' 타입은 선택적으로 'foo' 속성을 가짐
  interface Bar {
    foo?: string;
    // bar: string;
  }

  // 'Config' 타입은 'c' 속성이 'Foo' 또는 'Bar' 타입의 객체를 가질 수 있음
  type Config = {
    a: number;
    b: number;
    c: Foo | Bar;
  };

  // 'config' 객체는 'Config' 타입을 가지며, 'Foo'에 필요한 'foo' 속성이 누락됨
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config: Config = {
    a: 1,
    b: 2,
    // ~~~ foo' 속성이 'Foo' 타입에 필요하지만 'Bar' 타입에는 없습니다.
    c: {
      //
    },
  };

  console.log('config.c.foo:', config.c.foo);
}
