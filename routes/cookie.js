const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // 쿠키를 만들어 보내기
  res.cookie('alert', true, {
    expires: new Date(Date.now() + 1000 * 60), // 60초 뒤 만료
    httpOnly: true, // 통신 시에만
  });
  console.log(req.cookies);
  res.render('index');
});

module.exports = router;
