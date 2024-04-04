# **Chapter-07**

코드를 작성하고 실행하기

## Table of contents
- [53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기](#53-타입스크립트-기능보다는-ecmascript-기능을-사용하기)

---

## **53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기**
TC39는 자바스크립트의 런타임 기능을 발전시키고, 타입스크립트팀은 타입 기능만 발전시킨다.


### 사용하지 않는 것이 좋은 기능
타입 공간(타입스크립트)과 값 공간(자바스크립트)의 경계를 혼란하게 만드는 기능은 사용하지 않는 것이 좋음

### Enum의 문제점
- 숫자 열거형에 0, 1, 2 외의 다른 숫자가 할당되면 매우 위험함
- 상수 열거형은 보통의 열거형과 달리 런타임에 완전히 제거됨
- 앞의 예제를 const enum Flavor로 바꾸면, 컴파일러는 Flavor.CHOCOLATE 을 0으로 바꿔버림
  - 문자열 열거형과 숫자형 열거형의 동작이 전혀 다름
- 문자열 열거형은 런타임의 타입 안정성과 투명성을 제공하지만 명목적 타이핑을 사용(다른 타입과 달리 구조적 타이핑이 아님)

#### 리터럴 타입의 유니온 열거형을 쓰세요
리터럴 타입의 유니온은 열거형만큼 안전하며, 자바스크립트와 호환되는 장점이 있음

### 매개변수 속성
일반적으로 클래스를 초기화할 때 속성을 할당하기 위해 생성자의 매개변수를 사용

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

타입스크립트는 더 간단한 문법을 제공하지만 문제점이 존재!

```ts
class Person {
  constructor(public name: string) {}
}
```

### 매개변수 속성의 문제점
- 일반적으로 타입스크립트 컴파일은 타입 제거가 이루어지므로 코드가 줄어들지만, 매개변수 속성을 코드가 늘어남
- 매개변수 속성이 런타임에 사용되지만, 타입스크립트 관점에서는 사용되지 않는 것처럼 보임
- 매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워짐


```ts
class Person {
  first: string;
  last: string;
  constructor(public name: string) {
    [this.first, this.last] = name.split(' ');
  }
}
```

- 클래스 설계가 혼란
- first, last만 속성에 나열되어 있으므로 일관성이 없음
- 한 가지만 사용하는 것이 좋음

### 네임스페이스와 트리플 슬래시 임포트

### 데코레이터
데코레이터는 클래스, 메서드, 속성에 애너테이션을 붙이거나 기능을 추가하는데 사용할 수 있음

### 요약
- 일반적으로 타입스크립트 코드에서 모든 타입 정보를 제거하면 자바스크립트가 됨.
  - 하지만 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 타입 정보를 제거한다고 자바스크립트가 되지는 않음
- 타입스크립트의 역할을 명확하게 하기 위해 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 사용하지 않는 것이 좋음

---

## **54. 객체를 순회하는 노하우**

### 요약
- 객체를 순회할 때, 키가 어떤 타입인지 정확히 파악하고 있다면, let k: keyof T와 for-in loop 를 사용
  - 함수의 매개변수로 쓰이는 객체에는 추가적인 키가 존재할 수 있다는 점을 명심
- 객체를 순회하며, 키와 값을 얻는 가장 일반적인 방법은 Object.entries를 사용하는 것

---

## **56. 정보를 감추는 목적으로 private 사용하지 않기**
- 비공개 속성을 나타내기 위해 언더스코어를 붙이던 기존의 관례

```ts
class Foo {
  _private = 'secret123';
}

const f = new Foo();
f._private; // 'secret123'
```

### 정보를 숨기기 위해 클로저 사용

- 인스턴스를 생성할 때마다 메서드의 복사본이 생성되므로 메모리가 낭비됨

```ts
declare function hash(text: string): number;

class PasswordChecker {
  checkPassword: (password: string) => boolean;
  constructor(passwordHash: number) {
    this.checkPassword = (password: string) => {
      return hash(password) === passwordHash;
    };
  }
}

const checker = new PasswordChecker(hash('s3cret'));
checker.checkPassword('s3cret'); // Returns true
```

### 비공개 필드 기능

```ts
class PasswordChecker {
  #passwordHash: number;
  constructor(passwordHash: number) {
    this.#passwordHash = passwordHash;
  }
  checkPassword(password: string) {
    return hash(password) === this.#passwordHash;
  }
}
```

### 요약
- 접근 제어자는 타입 시스템에서만 강제됨 
  - 런타임에는 소용이 없으며 단언문을 통해 우회할 수 있음
  - 접근 제어자로 데이터를 감추려고 하면 안됨
- 확실히 데이터를 감추고 싶다면 클로저를 사용해야 함

---

## **57. 소스맵을 사용하여 타입스크립트 디버깅하기**

타입스크립트 코드를 실행한다는 것 -> 타입스크립트 컴파일러가 생성한 자바스크립트 코드를 실행하는 것

### 디버깅 문제에 대한 해결책

### 디버깅 환경의 중요성
타입체커가 코드를 실행하기 전에 많은 오류를 잡을 수는 있지만, 디버거를 대체할 수는 없음
소스맵을 사용해서 제대로 된 타입스크립트 디버깅 환경 구축하기

### 요약
- 원본 코드가 아닌 변환된 자바스크립트 코드를 디버깅하는 대신 소스맵을 사용해서 런타임에 타입스크립트 코드를 디버깅하기
- 소스맵이 최종적으로 변환된 코드에 완전히 매핑되었는지 확인하기
- 소스맵에 원본 코드가 그대로 그대로 포함되도록 설정되어 있을 수도 있음
  - 공개되지 않도록 설정 확인하기
