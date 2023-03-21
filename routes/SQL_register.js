const express = require('express');

const userDB = require('../controllers/userController');

const router = express.Router();

// localhost:4000/register
router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  // console.log(req.body);
  userDB.userCheck(req.body.id, (data) => {
    // mydb에 동일한 아이디 없을 때 회원가입 진행!
    if (data.length === 0) {
      userDB.registerUser(req.body, (result) => {
        if (result.affectedRows >= 1) {
          res.status(200);
          res.send('회원 가입 성공!<br><a href="/login">로그인으로 이동</a>'); // html 코드도 쓸 수 있음.
        } else {
          // 쿼리로 인해 추가된 데이터가 없을 때
          res.status(500);
          res.send(
            '회원 가입 실패! 알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>',
          );
        }
      });
    } else {
      res.status(400);
      res.send(
        '동일한 ID를 가진 회원이 존재합니다!<br><a href="/register">회원가입으로 이동</a>',
      );
    }
  });
});

module.exports = router;
