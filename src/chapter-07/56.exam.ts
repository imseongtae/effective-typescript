// NOTE: ## **56. 정보를 감추는 목적으로 private 사용하지 않기**

{
  class Foo {
    _private = 'secret123';
  }

  const f = new Foo();
  f._private; // 'secret123'
}

declare function hash(text: string): number;

{
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
}

{
  class PasswordChecker {
    #passwordHash: number;
    constructor(passwordHash: number) {
      this.#passwordHash = passwordHash;
    }
    checkPassword(password: string) {
      return hash(password) === this.#passwordHash;
    }
  }

  const checker = new PasswordChecker(hash('s3cret'));
  checker.checkPassword('secret'); // Returns false checker.checkPassword('s3cret'); // Returns true
}
