{
  /**
   *최솟값이나 최댓값 계산
   *
   * 최솟값이나 최댓값이 0인 경우, 값이 덧씌워져 버림
   * nums 배열이 비어 있다면 [undefined, undefined] 반환
   */
  const extent = (nums: number[]) => {
    let min, max;
    for (const num of nums) {
      // 0은 falsy 한 값이므로 min, max 가 0으로 초기화되지 않음
      if (!min) {
        min = num;
        max = num;
      } else {
        min = Math.min(min, num);
        // Type undefined is not assignable to type number
        max = Math.max(max, num); // Argument of type is not assignable to parameter of type.
      }
    }

    return [min, max];
  };

  const range = extent([0, 1, 2, 4, 7]);
  console.log(range); // [1, 7]
}

// NOTE: 값이 전부 null 이거나 null 아닌 경우로 구분하면, 다루기 쉬워짐
{
  // NOTE: null 을 사용하지 않고, 개선
  const extent = (nums: number[]) => {
    if (nums.length === 0) {
      return null;
    }

    // NOTE: 명시적으로 초기화하면 첫 번째 반복에서 항상 할당하는 방식이 됨. 0도 올바르게 처리됨
    let min = nums[0];
    let max = nums[0];

    for (const num of nums) {
      //  이 조건문은 첫 번째 요소에서만 참(true)이 됩니다.
      // 이후의 반복에서는 min과 max에 이미 숫자가 할당되어 있으므로 undefined가 아니라는 것을 보장할 수 있지만,
      // TypeScript는 이를 감지하지 못함
      min = Math.min(min, num);
      // Type undefined is not assignable to type number
      max = Math.max(max, num); // Argument of type is not assignable to parameter of type.
    }

    return [min, max];
  };

  const range = extent([0, 1, 2, 4, 7]);
  console.log(range); // [0, 7]
}

{
  const extent = (nums: number[]) => {
    let result: [number, number] | null = null;

    for (const num of nums) {
      // null 인 경우, 첫 번째 요소를 할당하여 초기화
      if (!result) {
        result = [num, num];
      } else {
        const min = Math.min(num, result[0]);
        const max = Math.max(num, result[1]);
        result = [min, max];
      }
    }

    return result;
  };

  /** NOTE: null 아님 단언을 사용하여 min, max를 얻을 수 있음 */
  const [min, max] = extent([0, 1, 2, 4, 7])!;
  console.log('min:', min, 'max:', max); // 0 7

  // if 구문으로 체크
  const range = extent([0, 1, 2, 4, 7])!;
  if (range) {
    const [min, max] = range;
    const span = max - min;

    console.log('min:', min, 'max:', max, 'span:', span);
  }
}

{
  interface UserInfo {
    name: string;
    email: string;
  }

  interface Post {
    title: string;
    content: string;
  }

  class UserPosts {
    user: UserInfo;
    posts: Post[];

    constructor(user: UserInfo, posts: Post[]) {
      this.user = user;
      this.posts = posts;
    }

    static async init(): Promise<UserPosts> {
      return new Promise(resolve => {
        setTimeout(() => {
          const user = { name: 'John Doe', email: 'john@example.com' }; // Temporary user data
          const posts: Post[] = []; // Temporary empty posts array
          resolve(new UserPosts(user, posts));
        }, 300);
      });
    }

    getUserName() {
      return this.user.name;
    }
  }

  (async () => {
    const userPosts = await UserPosts.init();
    console.log(userPosts.getUserName());
  })();
}
