{
  enum Flavor {
    VANILLA = 1,
    CHOCOLATE = 1,
    STRAWBERRY = 2,
  }
}

{
  enum Flavor {
    VANILLA = 'vanilla',
    CHOCOLATE = 'chocolate',
    STRAWBERRY = 'strawberry',
  }

  const flavor = Flavor.CHOCOLATE;

  Flavor;
  Flavor[0];
}

{
  enum Flavor {
    VANILLA = 'vanilla',
    CHOCOLATE = 'chocolate',
    STRAWBERRY = 'strawberry',
  }

  // vanilla | chocolate | strawberry
  let flavor = Flavor.CHOCOLATE;

  flavor = Flavor.CHOCOLATE;

  console.log(flavor);
}

// NOTE: 열거형 쓰지 않는 방법
{
  const Flavor = {
    ALL: 'all',
    VANILLA: 'vanilla',
    CHOCOLATE: 'chocolate',
  } as const;

  const Flavor_LABEL = {
    [Flavor.ALL]: '모두',
    [Flavor.VANILLA]: '바닐라',
    [Flavor.CHOCOLATE]: '초콜릿',
  };

  type FlavorType = (typeof Flavor)[keyof typeof Flavor];
  const flaver: FlavorType = 'chocolate';
}

{
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
}

{
  class Person {
    constructor(public name: string) {}
  }
}

{
  class Person {
    first: string;
    last: string;
    constructor(public name: string) {
      [this.first, this.last] = name.split(' ');
    }
  }
}

{
  class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
    @logged
    greet() {
      return 'Hello, ' + this.greeting;
    }
  }

  const logged = (target: any, name: string, descriptor: PropertyDescriptor) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const fn = target[name];
    descriptor.value = function () {
      console.log(`Calling ${name}`);
      return fn.apply(this, arguments);
    };
  };

  console.log(new Greeter('Dave').greet()); // Logs:
  // Calling greet
  // Hello, Dave
}
