const express = require('express');
// const boardDB = require('../controllers/boardController'); // 컨트롤러 불러오기
const {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    console.log('사인드 쿠키', req.signedCookies.user);
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스 입니다!<br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

// mongoDB 버전 코드들
// 특정 주소에 대한 미들웨어들

// 게시판 페이지 호출
router.get('/', isLogin, getAllArticles);

// 글쓰기 모드로 이동
// mySQL 버전과 동일
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 글쓰기
router.post('/write', isLogin, writeArticle);

// 글 수정 모드로 이동
// 주소 앞에 dbBoard/ 가 있는 상태
// 해당 주소로 요청이 들어오면, getArticle 이 처리한다!!
router.get('/modify/:id', isLogin, getArticle);

// 글 수정
router.post('/modify/:id', isLogin, modifyArticle);

// 글 삭제
router.delete('/delete/:id', isLogin, deleteArticle);

// // mySQL 버전 코드
// // http://localhost:4000/dbBoard
// router.get('/', isLogin, (req, res) => {
//   // if-else문 대신 isLogin 함수 사용!!!
//   // if (req.session.login === true) {
//   //   // if (req.session.login) 로 써도 됨.

//   boardDB.getAllArticles((data) => {
//     // 객체 형태로, 배열로 들어옴.
//     const ARTICLE = data; // 데이터베이스에서 받아온 데이터 넣어주기
//     const articleCounts = ARTICLE.length;
//     const { userId } = req.session; // 구조분해할당
//     res.render('db_board', { ARTICLE, articleCounts, userId });
//   });

//   // } else {
//   //   res.status(400);
//   //   res.send(
//   //     '로그인이 필요한 서비스 입니다!<br><a href="/login">로그인 페이지로 이동</a>',
//   //   );
//   // }
// });

// mySQL 버전 코드들
// // 글쓰기 페이지 호출
// router.get('/write', isLogin, (req, res) => {
//   res.render('db_board_write');
// });

// // 데이터베이스에 글쓰기
// router.post('/write', isLogin, (req, res) => {
//   // USERID --> req.session.userId 에 구현해둠.
//   if (req.body.title && req.body.content) {
//     const newArticle = {
//       userId: req.session.userId,
//       title: req.body.title,
//       content: req.body.content,
//     };
//     boardDB.writeArticle(newArticle, (data) => {
//       // console.log(data);
//       // 쿼리 성공여부 판단
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글쓰기 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다!');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 글 수정 모드로 이동
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticle(req.params.id, (data) => {
//     // 데이터가 하나라도 찾아지면,
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] });
//     } else {
//       // 이 에러는 발생할 일이 없지만 혹시나 해서.
//       const err = new Error('해당 ID 값을 가지는 게시글이 없습니다!');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// // 글 수정하기
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       // 글 1개를 수정하므로 1이 들어오는 것이 맞음
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 수정 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 글 삭제하기
// router.delete('/delete/:id', isLogin, (req, res) => {
//   boardDB.deleteArticle(req.params.id, (data) => {
//     if (data.affectedRows >= 1) {
//       // 성공 코드인 200 도 같이 보내 줄 수 있음.
//       // redirect 는 delete 로 보내니 쓰면 안됨...?
//       res.status(200).send('삭제 성공');
//     } else {
//       const err = new Error('삭제 실패');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// router.get('/getAll', (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
