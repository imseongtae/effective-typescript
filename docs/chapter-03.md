# **Chapter-02**

타입스크립트의 타입시스템

## Table of contents
- [23. 한꺼번에 객체 생성하기](#23-한꺼번에-객체-생성하기)
- [24. 일관성 있는 별칭 사용하기](#24-일관성-있는-별칭-사용하기)
- [25. 비동기 코드에는 콜백 대신 async 함수 사용하기](#25-비동기-코드에는-콜백-대신-async-함수-사용하기)
- [26. 타입 추론에 문맥이 어떻게 사용되는지 이해하기](#26-타입-추론에-문맥이-어떻게-사용되는지-이해하기)
- [27. 함수형 기법과 라이브러리로 타입 흐름 유지하기](#27-함수형-기법과-라이브러리로-타입-흐름-유지하기)

---

## **23. 한꺼번에 객체 생성하기**

### 요약
- 속성을 제각각 추가하지 말고, 한꺼번에 객체로 객체로 만들어야 함
  - 안전한 타입으로 속성을 추가하려면 객체 전개(`{...a, ...b}`)를 사용하면 됨
- 객체에 조건부로 속성을 추가하는 방법 익히기


### 한꺼번에 객체로 만들기

```ts
const pt = {};
pt.x = 3; // Property 'x' does not exist on type '{}'.ts(2339)
pt.y = 4; // Property 'y' does not exist on type '{}'.ts(2339)
```

#### 방법1: 객체를 한꺼번에 정의

```ts
interface Point {
    x: number;
    y: number;
  }

/** NOTE: 방법1: 객체를 한꺼번에 정의하면 해결됨 */
const pt1: Point = { x: 3, y: 4 }; // OK
```

#### 방법2: 객체 전개 연산자 사용

```ts
const pt = { x: 3, y: 4 };
const id = { name: 'Pythagoras' };
const namedPoint = {};
Object.assign(namedPoint, pt, id);
console.log(namedPoint); // { x: 3, y: 4, name: 'Pythagoras' }

console.log(namedPoint.name); // Error: Property 'name' does not exist on type '{}'.ts(2339)
```

```ts
// 객체 전개 연산자 사용 - 객체를 만들기 위해 우회하기는 하지만 새로운 타입을 추론할 수 있게 해 유용
const namedPointUsingSpreadOperator = { ...pt, ...id };
console.log(namedPointUsingSpreadOperator); // { x: 3, y: 4, name: 'Pythagoras' }
console.log(namedPointUsingSpreadOperator.name); // 'Pythagoras'
```

### 객체에 조건부로 속성을 추가하는 방법

```ts
let hasDate;
const nameTitle = { name: 'Khufu', title: 'Pharaoh' };

/** 선택적 필드 방식으로 표현하기 위해 헬퍼 함수 사용 */
const addOptional = <T extends object, U extends object>(a: T, b: U | null): T & Partial<U> => {
  return { ...a, ...b };
};

const pharaoh = addOptional(nameTitle, hasDate ? { start: -2589, end: -2566 } : null);
console.log(pharaoh.start); // OK, number | undefined
```

---

## **24. 일관성 있는 별칭 사용하기**

### 요약
- 별칭은 타입스크립트가 타입을 좁히는 것을 방해하므로, 변수에 별칭을 사용할 때는 **일관되게 사용**해야 함
- 비구조화 문법을 사용해서 일관된 이름을 사용하는 것이 좋음
- 함수 호출이 객체 속성의 타입 정제를 무효화할 수 있다는 점을 주의해야 함
  - 속성보다 지역 변수를 사용하면, 타입 정제를 믿을 수 있음


### 별칭을 남발하지 마요 🥲
별칭을 남발해서 사용하면 제어 흐름을 분석하기 어려워짐
- 별칭의 값을 변경하면, 원래 속성 값에서도 변경됨

```ts
const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
const loc = borough.location;

loc[0] = 0
console.log(borough.location) // [0, -73.979]
```

### 별칭은 일관성 있게
- 비구조화 문법을 사용해서 일관된 이름을 사용

```ts
const isPointInPolygon = (polygon: Polygon, pt: Coordinate) => {
  const { bbox } = polygon.bbox;

  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
      return false;
    }
  }
};
```

---

## **25. 비동기 코드에는 콜백 대신 async 함수 사용하기**

### 요약
- 콜백 보다는 프로미스를 사용하는 게 코드 작성과 타입 추론 면에서 유리함
- 가능하면 프로미스를 생성하기보다는 async와 await 를 사용하는 것이 좋음
  - 간결하고 직관적인 코드를 작성할 수 있고, 모든 종류의 오류를 제거할 수 있음
- 어떤 함수가 프로미스를 반환한다면, async로 선언하는 것이 좋음

### 콜백 지옥을 간단하게 처리하는 방법
코드의 중첩을 줄이고, 실행 순서도 코드 순서와 같에 만들 수 있음

```ts
const fetchPages = async (url1: string, url2: string, url3: string) => {
  try {
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const res3 = await fetch(url3);
  } catch (error) {
    console.error(error);
  }
};
```

---

## **26. 타입 추론에 문맥이 어떻게 사용되는지 이해하기**

### 요약
- 타입 추론에 문맥이 어떻게 쓰이는지 주의해서 살펴보기
- 변수를 뽑아서 별도로 선언했을 때 오류가 발생한다면, 타입 선언을 추가하기
- 변수가 정말로 상수라면 상수 단언(`as const`)을 사용하기
  - 상수 단언을 사용하면 정의한 곳이 아니라 사용한 곳에서 오류가 발생하므로 주의하기

### 문맥으로부터 값을 분리하면 생길 수 있는 문제
- 튜플 사용 시 주의점
- 객체 사용 시 주의점
- 콜백 사용 시 주의점

#### 표현식을 상수로 분리
타입스크립트에서 표현식을 상수로 분리해내는 리팩토링이 가능

```ts
setLanguage('JavaScript');

// 참조 형태 
const language = 'JavaScript';
setLanguage(language);
```

---

## **27. 함수형 기법과 라이브러리로 타입 흐름 유지하기**

### 요약
- 타입 흐름을 개선하고, 가독성을 높이고, 명시적인 타입 구문의 필요성을 줄이기 위해 직접 구현하기 보다는 내장된 함수형 기법과 로대시 같은 유틸리티 라이브러리를 사용하는 것이 좋음

---

