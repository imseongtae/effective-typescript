---
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
---

<!-- ![bg left:40% 80%](https://avatars.githubusercontent.com/u/60806840?v=4) -->
![bg left:40% 80%](https://effectivetypescript.com/images/cover.jpg)

# **Chapter-02**

타입스크립트의 타입시스템

> <span style="font-size: 24px; color: #0A7FC7;">타입스크립트의 가장 중요한 역할은 타입 시스템에 있다.</span>

---

## Table of contents
- [06. 아이템 편집기를 사용하여 타입 시스템 탐색하기](#06-아이템-편집기를-사용하여-타입-시스템-탐색하기)
- [07. 타입이 값들의 집합이라고 생각하기]
- [08. 타입 공간과 값 공간의 심벌 구분하기]
- [09. 타입 단언보다는 타입 선언을 사용하기]
- [10. 객체 래퍼 타입 피하기]
- [11. 잉여 속성 체크의 한계 인지하기]

---

## **06. 아이템 편집기를 사용하여 타입 시스템 탐색하기**

- IDE에서 타입스크립트 언어 서비스를 적극 활용
- IDE에서 타입스크립트에 대한 개념 잡기
  - 어떻게 타입 시스템이 동작하는지
  - 어떻게 타입을 추론하는지
- 타입스크립트가 동작을 모델링하는 방법을 알기 위해 타입 선언 파일을 찾아보는 방법을 터득하기

---

### **IDE에서 타입스크립트에 대한 개념 잡기**
- 어떻게 타입 시스템이 동작하는지
- 어떻게 타입을 추론하는지

---

```ts
enum TAB_TYPE {
  BEST = 'BEST',
  REALTIME = 'REALTIME',
}

const selectedTab: TAB_TYPE = TAB_TYPE.BEST;

class Person {
  // 
}
```


---

## **09. 타입 단언보다는 타입 선언을 사용하기**

- 타입 단언 보다 타입 선언을 사용하기
- 화살표 함수의 반환 타입을 명시하는 방법을 터득해야 함
- 타입스크립트 보다 타입 정보를 더 잘 알고 있는 상황에서는 타입 단언문과 null 아님 단언문을 사용

---

### 타입 단언 보다 타입 선언을 사용하기

- 타입 선언은 할당되는 값이 인터페이스를 만족하는지 검사
- 타입 단언은 강제로 타입을 지정했으니 타입 체커에게 오류를 무시하도록 강제

```ts
interface Person { name: string }

const people: Person[] = ['ham'].map(name => ({name}));
```

---

### 타입 단언이 꼭 필요한 경우
타입 단언은 타입 검사기가 추론한 타입보다 더 정확할 때 의미가 있음

```ts
const ham = document.querySelector('.ham').addEventListener('click', (e) => {
  const button = e.currentTarget;
  const $button = button as HTMLButtonElement
  $button.classList.toggle('active')
};
```

---

## **10. 객체 래퍼 타입 피하기**
- 기본형 값에 메서드를 제공하기 위해 객체 래퍼 타입이 어떻게 쓰이는지 이해해야 함. 직접 사용하거나 인스턴스를 생성하는 것은 피해야 함.
- 타입스크립트 객체 래퍼 타입은 지양하고, 대신 기본형 타입을 사용해야 함

---


## **11. 잉여 속성 체크의 한계 인지하기**

### 요약
- 객체 리터럴을 변수에 할당하거나 함수에 매개변수로 전달할 때 잉여 속성 체크가 수행됨
- 잉여 속성 체크는 오류를 찾는 효과적인 방법이지만, 타입스크립트의 타입 체커가 수행하는 일반적인 구조적 할당 가능성 체크와 역할이 다름. 할당의 개념을 정확히 알아야 잉여 속성 체크와 일반적인 구조적 할당 가능성 체크를 구분할 수 있음
- 잉여 속성 체크에는 한계가 있음
- 초과 속성 체크가 더 좋은 표현일 수 있음

---

