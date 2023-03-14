const express = require('express');

// 라우터; 필요한 기능은 라우터에 모두 넣어놓고 모듈로 빼준다
const router = express.Router();

// 라우터한테 이런 요청 받으면 이렇게 처리해주란 코드. 미들웨어.
// get 방식으로 '/' 주소로 요청 들어오면 이걸 실행해라!
// localhost:4000/
router.get('/', (req, res) => {
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요!' }); // 뷰파일을 그려준다. 그려주고 싶은 뷰파일명 기입.
});

// 모듈로 빼줌
module.exports = router;
