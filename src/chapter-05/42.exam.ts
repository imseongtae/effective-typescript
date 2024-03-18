interface Book {
  name: string;
  author: string;
}

{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseYAML = (yaml: string): any => {
    return yaml;
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const book = parseYAML(`{
    "name": "Villette",
    "author": "Charlotte Bronte"
  }`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(book.title);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.log(book('read'));
}

{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseJSON = (json: string): any => {
    return JSON.parse(json);
  };

  const safeParseJSON = (json: string): unknown => {
    return parseJSON(json);
  };

  const book = safeParseJSON(`{
    "name": "Villette",
    "author": "Charlotte Bronte"
  }`) as Book;

  // @ts-expect-error - Property 'title' does not exist on type 'Book'.ts(2339)
  console.log(book.title);
  // @ts-expect-error - This expression is not callable. Type 'Book' has no call signatures.ts(2349)
  console.log(book('read'));

  console.log(book.name);
  console.log(book.author);
}

// NOTE: 단언문과 관련된 unknown
type Foo = number;
type Bar = string;
declare const foo: Foo;
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const barAny = foo as any as Bar;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const barUnk = foo as unknown as Bar;

  // 나중에 두 개의 단언문을 분리하는 리팩토링을 할 경우
  // any는 분리되는 즉시 영향력이 전염병처럼 퍼지지만, unknown 경우 즉시 오류를 발생시키므로 더 안전함
}
