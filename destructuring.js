// // 배열 구조 분해 전
// const arr = [1, 2, 3];
// const one = arr[0];
// const two = arr[1];
// const three = arr[2];

// console.log(one, two, three);

// // 배열 구조 분해 사용
// const [deOne, deTwo, deThree] = arr;

// console.log(deOne, deTwo, deThree);

// // 날짜
// const today = new Date(); // 초 단위로 생김.
// console.log(today);

// // toISOString() ; 규정화된 형태로 날짜값 변경함.
// const formatDay = today.toISOString().substring(0, 10); // 10글자까지 출력.
// console.log(formatDay);

// const [year, month, day] = formatDay.split('-');
// console.log(year, month, day);

// // const year = formatDay.split('-')[0];
// // console.log(year); // 2023 출력됨.

// 객체 구조 분해 할당 전
const obj = { firstName: '민선', lastName: '송' };

// const firstName = obj.firstName;
// const lastName = obj.lastName;

// console.log(lastName, firstName);

// 객체 구조 분해 할당
const { firstName, lastName } = obj;

console.log(firstName, lastName);

// 객체 안에 객체가 있는 경우
const person = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul',
  },
};

const {
  address: { city, zipCode },
} = person;

console.log(city, zipCode);
