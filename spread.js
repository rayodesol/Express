const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr);
console.log(...arr); // 구조를 깨고 하나씩 뿌려줌.

const obj = {
  name: '송민선',
  status: '아픔',
};

console.log(obj);
// console.log(...obj); // 이렇게 못 씀.
console.log({ ...obj });

const cieloData = {
  name: '송민선',
  age: 29,
};

const cieloInfo = {
  nickName: 'cielo',
  status: '아파요',
};

// 이중 객체 구조가 됨.
const cielo = {
  cieloData,
  cieloInfo,
};

console.log(cielo);

// 전개 연산자로 객체 합치기
const cieloS = {
  ...cieloData,
  ...cieloInfo,
};

console.log(cieloS);

// 배열 합치기
const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const merge = [...arr1, ...arr2];
console.log(merge);

// 문자열 하나하나 뿌려주기
const str = 'test';
console.log([...str]);

// 나머지 연산자로 쓸 때
// 객체
const cielo2 = {
  name: '송민선',
  gender: 'F',
  nickName: 'cielo',
  email: 'cielo576@naver.com',
};

const { name, ...restInfo } = cielo2;
console.log(name, restInfo);

// 배열
const arr3 = [1, 2, 3, 4, 5, 6, 7];

const [first, ...rest] = arr3;
console.log(first, rest);

// 함수 인자
// 첫번째, 두번째 인자만 중요할 때
function spread(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest); // 배열 형태로
}

spread(1, 2, 3, 4, 5, 6, 7, 8);
