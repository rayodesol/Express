const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  // userDB 만 쳤을 때 나오는거 Enter 하면 2행의 require문 추가됨.
  userDB.userCheck(req.body.id, (data) => {
    // 아이디 값이 UNIQUE 이므로 1개일 수 밖에
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        // 비번 틀린 경우
        res.status(400); // 사용자 잘못
        // /가 있다면, localhost:4000 뒤에 붙음
        // /가 없다면, 현재 페이지 뒤에 붙음
        res.send(
          '비밀번호가 다릅니다!<br><a href="/login">로그인으로 이동</a>',
        );
      }
    } else {
      // 아이디 잘못 입력한 경우
      res.status(400); // 사용자 잘못
      res.send(
        '해당 ID가 존재하지 않습니다!<br><a href="/register">회원가입으로 이동</a>',
      );
    }
  });
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/'); // localhost:4000 으로 리다이렉트
  });
});

module.exports = router;
