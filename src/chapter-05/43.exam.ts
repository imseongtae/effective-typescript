{
  interface Document {
    monkey: string;
  }

  document.monkey = 'Tamarin';
}

{
  interface MonkeyDocument extends Document {
    /** 몽키 패치의 속 또는 종 */
    monkey: string;
  }

  (document as MonkeyDocument).monkey = 'Chimpanzee';
}
