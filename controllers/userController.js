// 접속은 mongooseConnect.js 로. 이미 거기서 접속하므로 여기엔 불러오기만.
require('./mongooseConnect'); // 변수에 담을 필요 없음.
const User = require('../models/user');

// // 여기서 connect() 하려면, mongooseConnect.js 에서 connect(); 삭제하고
// const mongooseConnect = require('./mongooseConnect');
// mongooseConnect();

// 코드 리팩토링 //////////////////////////////////////////////////////////
// 에러 메시지 변수로 저장
// 회원 가입 관련
const UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원 가입으로 이동</a>';
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/register">회원 가입으로 이동</a>';
const SUCCESS_MSG = '회원 가입 성공!<br><a href="/login">로그인으로 이동</a>';

// 로그인 관련
const LOGIN_UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/login">로그인으로 이동</a>';
const LOGIN_NOT_REGISTERED__MSG =
  '입력하신 ID를 가지는 회원이 존재하지 않습니다.<br><a href="/register">회원 가입으로 이동</a>';
const LOGIN_WRONG_PASSWORD_MSG =
  '비밀번호가 틀렸습니다.<br><a href="/login">로그인으로 이동</a>';

// req, res 는 전역 객체.
const registerUser = async (req, res) => {
  try {
    // 동일한 아이디 있는지. 쿼리문.
    const duplicatedUser = await User.findOne({ id: req.body.id });
    // 중복 회원이 있으면. 리턴을 만나 함수 종료.
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    // 몽구스 작동 이유 - 잘못된 코드일 때 -> 에러 발생
    // await User.create({ idd: req.body.id, password: '11' });
    // await User.create({ idd: req.body.id });

    // 중복 회원 없으면, 회원 가입.
    await User.create(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

// 로그인 코드 수정
// depth 줄이기!!
const loginUser = async (req, res) => {
  try {
    // 폼에서 입력한 값과 같은 아이디인지 확인.
    const findUser = await User.findOne({ id: req.body.id });
    // 아이디가 없을 때 -> 메시지 출력
    if (!findUser) return res.status(400).send(LOGIN_NOT_REGISTERED__MSG);

    // findUser 에 값이 있음 -> 비번 대조
    // 비번 틀렸을 때.
    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONG_PASSWORD_MSG); // depth 줄이기!

    // 비번 맞았을 때 -> 로그인 처리
    req.session.login = true;
    req.session.userId = req.body.id;

    res.cookie('user', req.body.id, {
      maxAge: 1000 * 30, // 쿠키 30초 유지
      httpOnly: true, // 통신 시에만 ...
      signed: true, // 쿠키 데이터가 암호화돼서 저장
      // 쿠키 암호화 하려면 키가 필요. app.js에서 app.use(cookieParser('cielo')); 있어야!!
    });

    res.status(200);
    res.redirect('/dbBoard'); // 게시판 출력
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECTED_MSG);
  }
};

// 함수 바깥으로 빼주기. 전체 객체를 빼는 게 아니라 쓸 것만 빼는.
module.exports = {
  registerUser,
  loginUser,
};

// ///////////////////////////////////////////////////////////////////////

// // mongoDB 쿼리로!
// // MySQL에선 못 썼던, async, await 로!

// const userDB = {
//   // 중복 회원 찾기 - 회원가입, 로그인 할 때 사용
//   // userCheck 메소드 선언
//   // 화살표함수 앞에 async 붙이기
//   userCheck: async (userId) => {
//     try {
//       // 접속
//       const client = await mongoClient.connect();
//       // DB 찾아가기
//       const user = client.db('kdt5').collection('user');

//       // 중복 회원 찾기
//       const findUser = await user.findOne({ id: userId });
//       return findUser; // 중복 값이 없다면 undefined 값 리턴.
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   // 회원 가입 하기
//   registerUser: async (newUser) => {
//     try {
//       // 접속
//       const client = await mongoClient.connect();
//       // DB 찾아가기
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(newUser);
//       return true; // true 이면, 회원가입이 무사히 끝났다는 것.
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDB;
