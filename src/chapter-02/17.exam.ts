/** NOTE:
 *
 * - 만약 함수가 매개변수를 수정하지 않는다면 readonly 로 선언하는 것이 좋음. readonly 매개변수는 인터페이스를 명확하게 하며, 매개변수가 변경되는 것을 방지
 * - readonly를 사용하면 변경하면서 발생하는 오류를 방지할 수 있고, 변경이 발생하는 코드도 쉽게 찾을 수 있음
 * - const 와 readonly의 차이를 이해
 * - readonly는 얕게 동작한다는 것을 명심
 */

{
  const arraySum = (arr: number[]) => {
    let sum = 0;
    let num;
    while ((num = arr.pop()) !== undefined) {
      sum += num;
    }
    return sum;
  };

  // NOTE: 자바스크립트의 배열은 내용을 변경할 수 있음
  const printTriangle = (size: number) => {
    const nums = [];
    for (let i = 0; i < size; i++) {
      nums.push(i);
      console.log(arraySum(nums));
    }
  };

  printTriangle(5);
  // 0
  // 1
  // 2
  // 3
  // 4
}

// NOTE: 함수가 매개변수를 변경하지 않기 위해 사용할 수 있는 방법
{
  // 단순히 매개변수 readonly 접근 제어자를 사용하는 것만으로는 해결할 수 없음
  const readonlyArraySum = (arr: readonly number[]) => {
    let sum = 0;
    let num;
    // NOTE: Property 'pop' does not exist on type 'readonly number[]'.ts(2339)
    while ((num = arr.pop()) !== undefined) {
      sum += num;
    }
    return sum;
  };

  const a: number[] = [1, 2, 3];
  const b: readonly number[] = a;
  // NOTE: The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.ts(4104)
  const c: number[] = b;

  console.log(a, b, c);
}

// NOTE:
{
  const parseTaggedText = (lines: string[]): string[][] => {
    const paragraphs: string[][] = [];
    const currPara: string[] = [];

    const addParagraph = () => {
      if (currPara.length > 0) {
        paragraphs.push(currPara);
        currPara.length = 0; // 배열을 비움
      }
    };

    for (const line of lines) {
      if (!line) {
        addParagraph();
      } else {
        currPara.push(line);
      }
    }

    addParagraph();
    return paragraphs;
  };

  const novel = `
    Frankenstein; or, the Modern Prometheus
    by Mary Shelley

    You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.

    I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight.
  `;

  console.log(parseTaggedText(novel));
}
