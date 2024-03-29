# **Chapter-02**

타입스크립트의 타입시스템

## Table of contents
- [17. 변경 관련된 오류 방지를 위해 readonly 사용하기](#17-변경-관련된-오류-방지를-위해-readonly-사용하기)
- [18. 매핑된 타입을 사용하여 값을 동기화하기](#18-매핑된-타입을-사용하여-값을-동기화하기)
- [19. 추론 가능한 타입을 사용해 장황한 코드 방지하기](#19-추론-가능한-타입을-사용해-장황한-코드-방지하기)
- [20. 동적 데이터에 인덱스 시그니처 사용하기](#15-동적-데이터에-인덱스-시그니처-사용하기)
- [21. 타입 넓히기](#21-타입-넓히기)
- [22. 타입 좁히기](#22-타입-좁히기)

---

## **17. 변경 관련된 오류 방지를 위해 readonly 사용하기**

### 요약
- 만약 함수가 매개변수를 수정하지 않는다면 readonly 로 선언하는 것이 좋음. readonly 매개변수는 인터페이스를 명확하게 하며, 매개변수가 변경되는 것을 방지
- readonly를 사용하면 변경하면서 발생하는 오류를 방지할 수 있고, 변경이 발생하는 코드도 쉽게 찾을 수 있음
- const와 readonly의 차이를 이해
- readonly는 얕게 동작한다는 것을 명심

---

## **18. 매핑된 타입을 사용하여 값을 동기화하기**

### 요약
- 매핑된 타입을 사용해서 값과 타입을 동기화
- 인터페이스에 새로운 속성을 추가할 때, 선택을 강제하도록 매핑된 타입을 고려해야 함

### 최적화에 대한 두 가지 방법
실패에 열린 방법을 선택할지, 닫힌 방법을 선택할지 정해야 함

---

## **19. 추론 가능한 타입을 사용해 장황한 코드 방지하기**

### 요약
- 타입스크립트가 타입을 추론할 수 있다면 타입 구문을 작성하지 않는게 좋음
- 이상적인 경우 함수/메서드의 시그니처에는 타입구문이 있지만, 함수내의 지역 변수에는 타입 구문이 없음
- 추론될 수 있는 경우라도 객체 리터럴과 함수 반환에는 타입 명시를 고려해야 함. 이는 내부 구현 오류가 사용자 코드 위치에 나타나는 것을 방지해줌

---

## **20. 다른 타입에는 다른 변수 사용하기**

### 요약
- 변수의 값은 바뀔 수 있지만 타입은 일반적으로 바뀌지 않음
- 혼란을 막기 위해 타입이 다른 값을 다룰 때에는 변수를 재사용하지 않도록 함

---

## **21. 타입 넓히기**

### 요약
- 타입스크립트가 타입 넓히기를 통해 상수의 타입을 추론하는 방법을 이해해야 함
- 동작에 영향을 줄 수 있는 방법인 const, 타입 구문, 문맥, as const에 익숙해져야 함

---

## **22. 타입 좁히기**

### 요약
- 분기문 외에도 여러 종류의 제어 흐름을 살펴보며 타입스크립트가 타입을 좁히는 과정을 이해하기
- 태그된 유니온과 사용자 정의 타입 가드를 사용하여 타입 좁히기 과정을 원활하게 만들 수 있음
