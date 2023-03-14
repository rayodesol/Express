// 게시판 관련 기능들
const express = require('express');

// 라우터
const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quam impedit reprehenderit expedita quibusdam consectetur vitae, ipsum velit repudiandae soluta. Ab voluptas nam veniam optio fugit doloribus, culpa placeat vero?',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quam impedit reprehenderit expedita quibusdam consectetur vitae, ipsum velit repudiandae soluta. Ab voluptas nam veniam optio fugit doloribus, culpa placeat vero?',
  },
];

// 모든 기능은 router 에 만듦
// 글 전체 목록 보여주기
// localhost:4000/board/ 접속 시 실행
router.get('/', (req, res) => {
  // 보낼 데이터들
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length }); // ARTICLE: ARTICLE 을 ARTICLE 로만 작성 가능.
});

// 글 쓰기
// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가
router.post('/write', (req, res) => {
  // board_write.ejs 에서 입력되지 않는 경우가 없기 때문에 예외 처리할 필요 없음.
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };

    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    // title 또는 content 가 제대로 안 들어온 경우
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
// 글이 존재해야 수정할 수 있으므로 파라미터로 글 정보 받기
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res) => {
  // 목록에 등록된 글만 삭제하므로 예외 처리할 필요 없음.
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  ARTICLE.splice(arrIndex, 1);

  // redirect 가 아닌 send
  res.send('삭제 완료!');
  // redirect은 delete 을 따라가므로
  // res.redirect('/board');
});

// 모듈로 빼기
module.exports = router;
