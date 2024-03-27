class C {
  vals = [1, 2, 3];
  // 제곱 출력
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

{
  const c = new C();
  c.logSquares();
}

// NOTE: 외부 변수를 넣고 호출하는 예제
{
  const c = new C();
  // NOTE: 외부 변수를 넣고 호출하면 에러가 발생함
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const method = c.logSquares;
  method(); //  Cannot read properties of undefined (reading 'vals')
}

// NOTE: 자바스크립트에서 this 바인딩을 제어하는 방법
{
  const c = new C();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const method = c.logSquares;
  method.call(c); // call 을 사용하여 명시적으로 this를 바인딩
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeButton = (params: any) => {
  console.log(params);
};

// NOTE: DOM에서 this 바인딩
// this 를 바인딩하지 않아도 왜 뜨나요
{
  class ResetButton {
    constructor() {
      this.onClick = this.onClick.bind(this);
    }
    render() {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      return makeButton({ text: 'Reset', onClick: this.onClick });
    }
    onClick() {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
      alert(`Reset ${this}`);
    }
  }

  const reset = new ResetButton();
  reset.render();
}

// NOTE: DOM에서 this 바인딩을 더 간단하게 해결하는 방법
{
  class ResetButton {
    private name = 'ResetButton';

    render() {
      return makeButton({ text: 'Reset', onClick: this.onClick });
    }
    onClick = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
      alert(`Reset ${JSON.stringify(this)}`); // "this" always refers to the ResetButton instance.
    };
  }

  const reset = new ResetButton();
  reset.render();
  reset.onClick();
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addKeyListener = (el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) => {
    el.addEventListener('keydown', e => {
      fn.call(el, e);
    });
  };
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addKeyListener = (el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) => {
    el.addEventListener('keydown', e => {
      // @ts-expect-error Expected 1 arguments, but got 2.
      fn(el, e);
    });
  };
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addKeyListener = (el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) => {
    el.addEventListener('keydown', e => {
      fn(e);
    });
  };
}

declare let el: HTMLElement;

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addKeyListener = (el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) => {
    el.addEventListener('keydown', e => {
      fn(e);
    });
  };

  addKeyListener(el, function (e) {
    this.innerHTML;
  });
}
