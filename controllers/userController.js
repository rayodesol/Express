// mongoClient 맨 앞 소문자로!
const mongoClient = require('./mongoConnect');

// mongoDB 쿼리로!
// MySQL에선 못 썼던, async, await 로!

const userDB = {
  // 중복 회원 찾기 - 회원가입, 로그인 할 때 사용
  // userCheck 메소드 선언
  // 화살표함수 앞에 async 붙이기
  userCheck: async (userId) => {
    try {
      // 접속
      const client = await mongoClient.connect();
      // DB 찾아가기
      const user = client.db('kdt5').collection('user');

      // 중복 회원 찾기
      const findUser = await user.findOne({ id: userId });
      return findUser; // 중복 값이 없다면 undefined 값 리턴.
    } catch (err) {
      console.error(err);
    }
  },

  // 회원 가입 하기
  registerUser: async (newUser) => {
    try {
      // 접속
      const client = await mongoClient.connect();
      // DB 찾아가기
      const user = client.db('kdt5').collection('user');

      await user.insertOne(newUser);
      return true; // true 이면, 회원가입이 무사히 끝났다는 것.
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = userDB;
