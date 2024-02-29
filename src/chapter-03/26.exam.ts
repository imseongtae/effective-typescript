// NOTE: 타입 추론할 때 문맥도 고려해야 한다
{
  const setLanguage = (language: string) => console.log(language);

  // 인라인 형태
  setLanguage('JavaScript');

  // 참조 형태 - 타입스크립트에서도 표현식을 상수로 분리해내는 리팩토링이 가능
  const language = 'JavaScript';
  setLanguage(language);
}

// NOTE: 문자열 타입을 더 특정해서 리터럴 타입의 유니온으로 바꿀 경우
{
  type Language = 'JavaScript' | 'TypeScript' | 'Python';
  const setLanguage = (language: Language) => console.log(language);

  // 인라인 형태
  setLanguage('JavaScript'); // OK

  // 참조 형태 - 값을 변수로 분리해내면, 타입스크립트는 할당 시점에 타입을 추론하므로 string은 할당이 불가함
  // let language = 'JavaScript';
  // setLanguage(language); // Argument of type 'string' is not assignable to parameter of type 'Language'.ts(2345)

  // NOTE: 첫 번째 해결법 - 타입 선언을 통해 language의 값을 제한
  let language1: Language = 'JavaScript';
  setLanguage(language1);

  language1 = 'TypeScript';

  // NOTE: 두 번째 해결법 - language 를 상수로 선언
  /** const를 사용하여 타입 체커에게 language2 는 변경할 수 없다고 알리기 */
  const language2 = 'JavaScript';
  setLanguage(language2);
}

// NOTE: 문맥의 소실로 인해 오류가 발생하는 경우

// NOTE: 튜플 사용 시 주의점
{
  const panTo = (where: [number, number]) => console.log(where);

  panTo([10, 20]); // OK

  const loc = [10, 20];
  // panTo(loc); // Error: Argument of type 'number[]' is not assignable to parameter of type '[number, number]'. Target requires 2 element(s) but source may have fewer.ts(2345)
}

{
  const panTo = (where: readonly [number, number]) => console.log(where);

  // NOTE: 첫 번째 해결법 - 상수 문맥을 제공하는 것
  const loc = [10, 20] as const;
  panTo(loc); // OK

  // NOTE:
  const loc1 = [10, 20, 30];
  panTo(loc1);
}

// NOTE: 객체 사용 시 주의점
// 문맥에서 값을 분리하는 문제는 리터럴이나 튜플을 포함하는 큰 객체에서 상수를 뽑아낼 때도 발생함
{
  type Language = 'JavaScript' | 'TypeScript' | 'Python';
  interface GovernedLanguage {
    language: Language;
    organization: string;
  }

  const complain = (language: GovernedLanguage) => console.log(language);

  // complain({ language: 'JavaScript', organization: 'ECMA' }); // OK
  complain({ language: 'TypeScript', organization: 'Microsoft' }); // OK

  const js = {
    language: 'JavaScript',
    organization: 'ECMA',
  };
  // complain(js); // Error: js 객체에서 language의 타입은 string으로 추론됨

  // NOTE: GovernedLanguage 타입 선언을 추가하거나 상수 단언을 사용
  const ts: GovernedLanguage = {
    language: 'TypeScript',
    organization: 'Microsoft',
  } as const;

  complain(ts);
}

// NOTE: 콜백 사용 시 주의점
// 콜백을 다른 함수로 전달할 때, 콜백의 매개변수 타입을 추론하기 위해 문맥을 사용
{
  //
  const callWithRandomNumbers = (fn: (n1: number, n2: number) => void) => {
    fn(Math.random(), Math.random());
  };

  callWithRandomNumbers((n1, n2) => console.log(n1 + n2)); // OK

  const fn = (a, b) => {
    console.log(a + b);
  };
  callWithRandomNumbers(fn);

  const fnWithNumParams = (a: number, b: number) => {
    console.log(a + b);
  };
  callWithRandomNumbers(fnWithNumParams);
}
