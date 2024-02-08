{
  console.log(
    'Cylinder 1 x 1 ',
    'Surface Area:',
    6.283185 * 1 * 1 + 6.283185 * 1 * 1,
    'Volume:',
    3.14159 * 1 * 1 * 1,
  );

  console.log(
    'Cylinder 1 x 2 ',
    'Surface Area:',
    6.283185 * 1 * 1 + 6.283185 * 2 * 1,
    'Volume:',
    3.14159 * 1 * 2 * 1,
  );

  console.log(
    'Cylinder 2 x 1 ',
    'Surface Area:',
    6.283185 * 2 * 1 + 6.283185 * 2 * 1,
    'Volume:',
    3.14159 * 2 * 1 * 1,
  );
}

{
  const surfaceArea = (r, h) => 2 * Math.PI * r * (r + h);
  const volume = (r, h) => Math.PI * r * r * h;

  for (const [r, h] of [
    [1, 1],
    [1, 2],
    [2, 1],
  ]) {
    console.log(
      `Cylinder ${r} x ${h}`,
      `Surface Area: ${surfaceArea(r, h)}`,
      `Volume: ${volume(r, h)}`,
    );
  }
}

{
  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  };
}

{
  interface Point2D {
    x: number;
    y: number;
  }

  const distance = (a: Point2D, b: Point2D) => {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  };
}

// NOTE: 이미 존재하는 타입을 확장하는 경우, 인터섹션 연산자(&)의 사용
{
  interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
  }

  // interface TopNavState {
  //   userId: string;
  //   pageTitle: string;
  //   recentFiles: string[];
  // }

  // type TopNavState = {
  //   userId: State['userId'];
  //   pageTitle: State['pageTitle'];
  //   recentFiles: State['recentFiles'];
  // };

  /** NOTE: 매핑된 타입을 사용하는 방식 */
  // type TopNavState = {
  //   [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
  // };

  /** NOTE: 매핑된 타입을 사용하는 방식 */
  // type Pick<T, K> = { [k in K]: T[k] };
  type Pick<T, K extends keyof T> = { [k in K]: T[k] };
  type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

  const topNav: TopNavState = {
    userId: '1',
    pageTitle: '2',
    recentFiles: ['3'],
  };
  console.log(topNav);
}
