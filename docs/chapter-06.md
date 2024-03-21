# **Chapter-05**

any 다루기

## Table of contents
- [45. devDependencies에 TypeScript와 @types 추가하기](#45-devdependencies에-typescript와-types-추가하기)
- [46. 타입 선언과 관련된 3가지 버전 이해하기](#46-타입-선언과-관련된-3가지-버전-이해하기)
- [47. 공개 API에 등장하는 모든 타입을 익스포트하기](#47-공개-api에-등장하는-모든-타입을-익스포트하기)

---

## **45. devDependencies에 TypeScript와 @types 추가하기**

### 요약
- 타입스크립트를 시스템 레벨로 설치하면 안됨
  - 타입스크립트를 프로젝트의 devDependencies에 포함시키고, 팀원 모두가 동일한 버전을 사용하도록 해야 함
- @types 의존성은 dependencies가 아니라 devDependencies에 포함시켜야 함
  - 런타임에 @types가 필요한 경우라면 별도의 작업이 필요할 수 있음

## **46. 타입 선언과 관련된 3가지 버전 이해하기**

### 요약
- @types 의존성과 관련된 3가지 버전이 있음
  - 라이브러리 버전, @types 버전, 타입스크립트 버전
- 라이브러리를 업데이트하는 경우, 해당 @types 역시 업데이트해야 함
- 타입 선언을 라이브러리에 포함하는 것과 DefinitelyTyped에 공개하는 것 사이의 장단점을 이해해야 함
  - 타입스크립트로 작성된 라이브러리라면 타입 선언을 자체적으로 포함하고, 자바스크립트로 작성된 라이브러리라면 타입 선언을 DefinitelyTyped에 공개하는 것이 좋음

## **47. 공개 API에 등장하는 모든 타입을 익스포트하기**

### 요약
- 공개 메서드에 등장한 어떤 형태의 타입이든 익스포트하기
  - 어차피 라이브러리 사용자가 추출할 수 있으므로, 익스포트하기 쉽게 만드는 것이 좋음

## **48. API 주석에 TSDoc 사용하기**

```ts
/** 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다. */
function greetJSDoc(name: string, title: string) { 
  return `Hello ${title} ${name}`;
}
```

```ts
/** 특정 시간과 장소에서 수행된 측정 */
interface Measurement {
  /** 어디에서 측정되었나? */
  position: Vector3D;
  /** 언제 측정되었나? epoch에서부터 초 단위로. */ 
  time: number;
  /** 측정된 운동량 */
  momentum: Vector3D;
}
```


### 요약
- 익스포트된 함수, 클랙스, 타입에 주석을 달 때는 JSDoc-/TSDoc 형태를 사용
  - JSDoc-/TSDoc 형태의 주석을 달면 편집기가 주석 정보를 표시
- 문서 서식을 위해 @param, @returns 구문과 마크다운(Markdown)을 사용할 수 있음
- 주석에 타입 정보를 포함하면 안 됨

## **49. 콜백에서 this에 대한 타입 제공하기**

### 요약
- this 바인딩이 동작하는 원리를 이해해야 함
- 콜백 함수에서 this를 사용해야 한다면, 타입 정보를 명시해야 함