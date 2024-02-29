// NOTE: 객체를 생성할 때는 속성을 하나씩 추가하기보다 여러 속성을 한꺼번에 생성해야 타입 추론에 유리
{
  const pt = {};
  pt.x = 3; // Property 'x' does not exist on type '{}'.ts(2339)
  pt.y = 4; // Property 'y' does not exist on type '{}'.ts(2339)
}

// NOTE: Point 인터페이스를 정의하면, 오류 메시지가 바뀜
{
  interface Point {
    x: number;
    y: number;
  }

  // const pt: Point = {}; // Type '{}' is missing the following properties from type 'Point': x, yts(2739)
  // pt.x = 3;
  // pt.y = 4;

  /** NOTE: 방법1: 객체를 한꺼번에 정의하면 해결됨 */
  const pt1: Point = { x: 3, y: 4 }; // OK
}

{
  const pt = { x: 3, y: 4 };
  const id = { name: 'Pythagoras' };
  const namedPoint = {};
  Object.assign(namedPoint, pt, id);
  console.log(namedPoint); // { x: 3, y: 4, name: 'Pythagoras' }

  // console.log(namedPoint.name); // Error: Property 'name' does not exist on type '{}'.ts(2339)

  // 객체 전개 연산자 사용 - 객체를 만들기 위해 우회하기는 하지만 새로운 타입을 추론할 수 있게 해 유용
  const namedPointUsingSpreadOperator = { ...pt, ...id };
  console.log(namedPointUsingSpreadOperator); // { x: 3, y: 4, name: 'Pythagoras' }
}

{
  let hasDate;
  const nameTitle = { name: 'Khufu', title: 'Pharaoh' };

  const addOptional = <T extends object, U extends object>(a: T, b: U | null): T & Partial<U> => {
    return { ...a, ...b };
  };

  const pharaoh = addOptional(nameTitle, hasDate ? { start: -2589, end: -2566 } : null);
  console.log(pharaoh.start); // OK, number | undefined
}
