{
  /**
   *
   * 전경색(foregroundcolor) 문자열을 반환
   * 0개 또는 1개의 매개변수를 받음
   * 매개변수가 없을 때는 표준 전경색 반환
   * 매개변수가 있을 때는 특정 페이지의 전경색 반환
   */
  const getForegroundColor = (page: string) => {
    return page === 'login' ? { r: 127, g: 127, b: 127 } : { r: 0, g: 0, b: 0 };
  };

  console.log(getForegroundColor('login'));
}

{
  /** 애플리케이션 또는 특정 페이지의 전경색을 가져옴 */
  const getForegroundColor = (page: string) => {
    return page === 'login' ? { r: 127, g: 127, b: 127 } : { r: 0, g: 0, b: 0 };
  };
}

{
  const arr = [3, 7, 2, 1];
  const sort = (arr: number[]) => {
    return arr.sort((a, b) => a - b);
  };

  console.log('sort:', sort(arr));
  console.log('arr:', arr);
}

{
  const arr = [3, 7, 2, 1];
  const sort = (arr: readonly number[]) => {
    return [...arr].sort((a, b) => a - b);
  };

  console.log('sort:', sort(arr));
  console.log('arr:', arr);
}
