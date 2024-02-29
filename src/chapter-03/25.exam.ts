{
  // 코드의 중첩을 줄이고, 실행 순서도 코드 순서와 같에 만들 수 있음
  const fetchPages = async (url1: string, url2: string, url3: string) => {
    try {
      const res1 = await fetch(url1);
      const res2 = await fetch(url2);
      const res3 = await fetch(url3);
    } catch (error) {
      console.error(error);
    }
  };
}
