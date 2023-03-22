const express = require('express');

// const userDB = require('../controllers/userController');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

// 회원 가입 페이지로 이동
// localhost:4000/register
router.get('/', (req, res) => {
  res.render('register');
});

// 회원 가입
router.post('/', registerUser);

// 기존 회원 가입 라우터 코드. 위에는 코드 리택토링 한 것.
// router.post('/', async (req, res) => {
//   // req.body.id 값을 가진 회원이 있는지 체크
//   const duplicatedUser = await userDB.userCheck(req.body.id);

//   // 중복된 회원이 없을 때
//   if (!duplicatedUser) {
//     const registerResult = await userDB.registerUser(req.body); // true 값이면, 회원가입 성공한 것.
//     if (registerResult) {
//       res.status(200);
//       res.send('회원 가입 성공!<br><a href="/login">로그인으로 이동</a>');
//     } else {
//       res.status(500);
//       res.send(
//         '회원 가입 실패! 알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>',
//       );
//     }
//   } else {
//     res.status(400);
//     res.send(
//       '동일한 ID를 가진 회원이 존재합니다!<br><a href="/register">회원가입으로 이동</a>',
//     );
//   }
// });

module.exports = router;
