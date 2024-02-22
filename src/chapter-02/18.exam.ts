interface ScatterProps {
  // The data
  xs: number[];
  ys: number[];

  // Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  // Events
  onClick: (x: number, y: number, index: number) => void;
}

// NOTE: 실패에 닫힌 접근법 - 최적화 기법
{
  const shouldUpdate = (oldProps: ScatterProps, newProps: ScatterProps) => {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      if (oldProps[k] !== newProps[k]) {
        if (k !== 'onClick') return true;
      }
    }
  };
}

// NOTE: 실패에 열린 접근법 - 최적화 기법
{
  const shouldUpdate = (oldProps: ScatterProps, newProps: ScatterProps) => {
    return (
      oldProps.xs !== newProps.xs ||
      oldProps.ys !== newProps.ys ||
      oldProps.xRange !== newProps.xRange ||
      oldProps.yRange !== newProps.yRange ||
      oldProps.color !== newProps.color
      // (no check for onClick)
    );
  };
}

// NOTE: 타입 체커가 동작하도록 개선한 코드, 핵심은 매핑된 타입과 객체를 사용하는 것
{
  const REQUIRE_UPDATE: { [k in keyof ScatterProps]: boolean } = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
  };

  const shouldUpdate = (oldProps: ScatterProps, newProps: ScatterProps) => {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      //
      if (oldProps[k] !== newProps[k] && REQUIRE_UPDATE[k]) {
        //
        if (k !== 'onClick') return true;
      }
    }
  };
}
