{
  const obj = { one: 'uno', two: 'dos', three: 'tres' };

  // NOTE: k와 obj 객체의 타입이 서로 다르게 추론되어 오류가 발생
  for (const k in obj) {
    const v = obj[k];
    // obj에 인덱스 시그니처가 없으므로 엘리먼트는 암시적 any 타입
  }
}

{
  const obj = { one: 'uno', two: 'dos', three: 'tres' };
  // NOTE: k의 타입을 구체적으로 명시
  let k: keyof typeof obj; // Type is "one" | "two" | "three"

  for (k in obj) {
    const v = obj[k];
  }
}

{
  interface ABC {
    a: string;
    b: string;
    c: number;
  }

  const foo = (abc: ABC) => {
    let k: keyof ABC;
    for (k in abc) {
      const v = abc[k];
    }
  };
}

// NOTE: Object.entries 는 복잡한 기교없이 사용할 수 있음
{
  interface ABC {
    a: string;
    b: string;
    c: number;
  }

  const foo = (abc: ABC) => {
    for (const [k, v] of Object.entries(abc)) {
      k; // Type is string
      v; // Type is any }
    }
  };
}
