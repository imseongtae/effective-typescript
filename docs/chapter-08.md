# **Chapter-08 타입스크립트로 마이그레이션하기**

타입스크립트를 사용했다면 컴파일 시점에 미리 방지했을 수 있는 에러
- 2017년 한 조사에서 것헙 자바스크립트 프로젝트 버그의 15%
- 에어비앤비 프로젝트들의 사후 분석 6개월치 조사, 발견된 버그의 38%

덩치 크고 낡은 자바스크립트 프로젝트라고 할지라도, 꾸준하게 타입스크립트로 마이그레이션할 수 있게 해주는 방법
- 마이그레이션 작업은 어렵지만 품질을 크게 개선할 수 있는 가능성을 열어 줌
- 점진적 마이그레이션을 실험하는 방법(아이템.59)
- 마이그레이션 진행 상황을 수치화하는 법(아이템.61)

## Table of contents
- [58. 모던 자바스크립트로 작성하기](#58-모던-자바스크립트로-작성하기)

---

## **58. 모던 자바스크립트로 작성하기**

### ECMAScript 사용하기
- ES2015부터 import와 export를 사용하는 ECMAScript 모듈이 표준이 됨
- 점진적 마이그레이션이 원활해짐

### 프로토타입 대신 클래스 사용하기
- 프로토 타입 문법 보다 클래스 문법이 간결하고 직관적

### var 대신 let/const 사용하기
- var 대신 let/const 사용하여 스코프 문제 피하기

### for 대신 for-of 또는 배열 메서드 사용하기
- for-of 루프는 코드가 짧고, 인덱스 변수를 사용하지 않으므로 실수를 줄일 수 있음
- 인덱스 변수가 필요한 경우 forEach를 사용하면 됨
- for-in 은 몇 가지 문제점으로 인해 사용하지 않는 것이 좋음

### 함수 표현식 보다는 화살표 함수 사용하기
- 화살표 함수를 사용하여 상위 스코프의 this를 유지하기
  - 인라인 또는 콜백에서 화살표 함수가 더 직관적이고, 코드도 간결함

### 단축 객체 표현과 구조 분해 할당 사용하기
- 단축 객체 표현 코드가 간결해지고, 중복된 이름이 생략됨
  - 가독성이 좋고, 실수가 적어짐
- 객체 구조 분해를 사용하면 문법이 간결해지고, 변수를 사용할 때 실수를 줄일 수 있음

### 함수 매개변수 기본값 사용하기
- 코드가 간결해짐
- 기본값을 기반으로 타입 추론이 가능해짐
  - 마이그레이션시 매개변수에 타입 구문을 쓰지 않아도 됨

### 저수준 프로미스나 콜백 대신 async/await 사용하기
- 코드가 간결해지고, 버그나 실수를 방지하게 됨
- 비동기 코드에 타입 정보가 전달되어 타입 추론을 가능하게 함

### 요약
- 타입스크립트 개발 환경은 모던 자바스크립트도 실행할 수 있음
  - 모던 자바스크립트의 최신 기능을 적극적으로 활용하기
  - 코드 품질을 향상할 수 있고, 타입스크립트의 타입 추론도 더 나아짐
- 타입스크립트 개발 환경에서는 컴파일러와 언어 서비스를 제공함
  - 클래스, 구조 분해, async/await 같은 기능을 쉽게 쓸 수 있음
- 'use strict'는 타입스크립트 컴파일러 수준에서 사용되므로 코드에서 제거해야 함
- TC39의 깃헛 저장소와 타입스크립트의 릴리스 노트를 통해 최신 기능을 확인할 수 있음

---

## **59. 타입스크립트 도입 전에 @ts-check와 JSDoc으로 시험해보기 **


### 타입스크립트 전환시 발생할 수 있는 문제 미리 파악하기


### @ts-check
- @ts-check 지시자를 사용하여 타입 체커가 파일을 분석하고, 발견된 오류 보고하도록 지시
- @ts-check 지시자는 매우 느슨한 수준으로 타입 체크를 수행
- noImplicitAny 설정을 해제한 것보다 헐거운 체크를 수행


### 요약
- 파일 상단에 `// @ts-check` 를 추가하면 자바스크립트에서도 타입 체크를 수행할 수 있음
- 전역 선언과 서드파티 라이브러리의 타입 선언을 추가하는 방법을 익히기
- 주석을 잘 활용하면 자바스크립트 상태에서도 타입 단언과 타입 추론을 할 수 있음
- JSDoc 주석은 중단 단계이므로 공들일 필요는 없음
  - 최종 목표는 `.ts` 확장자로된 타입스크립트 코드임을 명심하기

---

## allowJS 로 타입스크립트와 자바스크립트 같이 사용하기

### 요약
- 점진적 마이그레이션을 위해 자바스크립트와 타입스크립트를 동시에 사용할 수 있게 allowJS 컴파일러 옵션 사용하기
- 대규모 마이그레이션 작업을 시작하기 전에, 테스트와 빌드 체인에 타입스크립트를 적용해야 함

---

## 61. 의존성 관계에 따라 모듈 단위로 전환하기


---

## 62. 마이그레이션 완성을 위해 noImplicitAny 설정하기

### 요약
- noImplicitAny 설정을 활성화하여 마이그레이션의 마지막 단계 진행해야 함
  - noImplicitAny 설정이 없다면 타입 선언과 관련된 오류가 드러나지 않음
- noImplicitAny를 전면 적용하기 전에 로컬에서 타입 오류를 점진적으로 수정해야 함

---