const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie');

  // // 쿠키를 만들어 보내기
  // res.cookie('alert', true, {
  //   expires: new Date(Date.now() + 1000 * 60), // 60초 뒤 만료
  //   httpOnly: true, // 통신 시에만
  // });
  // console.log(req.cookies);
  // res.render('index');
});

// 쿠키 만드는 백엔드 코드
// 주소 요청은 http://localhost:4000/cookie/cook
router.get('/cook', (req, res) => {
  // 쿠키 발행 코드
  res.cookie('alert', true, {
    maxAge: 1000 * 5, // 5초 동안 생존하는 쿠키
  });
  res.status(200); // 통신 성공 여부
  res.json('쿠키 굽기 성공!'); // 통신 결과만 json 으로 변경해서 프론트에 전달
  // res.status(200).json('쿠키 굽기 성공!'); 이렇게 1줄로도 작성 가능
});

module.exports = router;
