{
  interface Layer {
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
  }

  interface FillLayer {
    layout: FillLayout;
    paint: FillPaint;
  }

  interface LineLayer {
    layout: LineLayout;
    paint: LinePaint;
  }

  interface PointLayer {
    layout: PointLayout;
    paint: PointPaint;
  }

  // NOTE: Layer를 정의하면 layout과 paint 속성이 잘못된 조합으로 섞이는 경우를 방지할 수 있음
  type Layer = FillLayer | LineLayer | PointLayer;
}

{
  interface Layer {
    type: 'fill' | 'line' | 'point;
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
  }

  interface FillLayer {
    type: 'fill';
    layout: FillLayout;
    paint: FillPaint;
  }

  interface LineLayer {
    type: 'line';
    layout: LineLayout;
    paint: LinePaint;
  }

  interface PointLayer {
    type: 'point';
    layout: PointLayout;
    paint: PointPaint;
  }

  type Layer = FillLayer | LineLayer | PointLayer;
}

{
  interface Person {
    name: string;
    placeOfBirth: string;
    dateOfBirth: Date;
  }
}

{
  interface Person {
    name: string;
    birth: {
      place: string;
      date: Date;
    };
  }

  const alanT: Person = {
    name: 'Alan Turing',
    birth: {
      place: 'London',
      date: new Date('1912-06-23'),
    },
  };

  const eulogize = (p: Person) => {
    console.log(p.name);
    const { birth } = p;
    if (birth) {
      console.log(`was born in ${birth.place} on ${birth.date.toDateString()}`);
    }
  };

  eulogize(alanT);
}

// NOTE: 타입의 구조를 손댈 수 없는 상황, 인터페이스 유니온을 사용하여 속성사이 관계를 모델링
{
  interface Name {
    name: string;
  }

  interface PersonWithBirth extends Name {
    placeOfBirth: string;
    dateOfBirth: Date;
  }

  type Person = Name | PersonWithBirth;

  // 중첩된 객체에서도 동일한 효과를 누릴 수 있음

  const eulogize = (p: Person) => {
    console.log(p.name);
    if ('placeOfBirth' in p) {
      console.log(`was born in ${p.placeOfBirth} on ${p.dateOfBirth.toDateString()}`);
    }
  };

  eulogize({
    name: 'Alan Turing',
    placeOfBirth: 'London',
    dateOfBirth: new Date('2002-06-23'),
  });
}
