// MySQL 을 위한 코드
// const connection = require('./dbConnect');

// mongoDB 를 위한 코드
const { ObjectId } = require('mongodb'); // 오타 나면 undefined 값이 오므로 오타 조심!!

// mongoDB 접속용 클라이언트 모듈 불러오기
const mongoClient = require('./mongoConnect');

// 에러가 발생하면 메인 페이지로 이동하게끔
const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>';

// 게시판 불러오기
const getAllArticles = async (req, res) => {
  try {
    // mongoDB 에 접속.
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const allArticleCursor = board.find({}); // 데이터 가리키기..?
    const ARTICLE = await allArticleCursor.toArray();

    res.render('db_board', {
      // 객체 안에 담아 데이터 보내기
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG); // send 는 + 로 연결해야
  }
};

const writeArticle = async (req, res) => {
  try {
    // mongoDB 에 접속.
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    // mySQL 과 혼용...?
    const newArticle = {
      USERID: req.session.userId, // req.body 못 받아서 req.session 으로 처리...?
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    await board.insertOne(newArticle);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG); // 에러 상황에 맞게 다 다르게 해야하지만, 지금은 그냥 동일하게 처리
  }
};

const getArticle = async (req, res) => {
  try {
    // mongoDB 에 접속.
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });

    // db_board_modify.ejs 를 그리고, selectedArticle 데이터 전달.
    res.render('db_board_modify', { selectedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 실습 - 수정 기능 완성
const modifyArticle = async (req, res) => {
  try {
    // mongoDB 에 접속.
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    // 무조건 유니크한 값으로 찾아야 -> _id 값을 찾아야.
    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { TITLE: req.body.title, CONTENT: req.body.content } },
    );
    // 결과 보내기
    res.status(200);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 글 삭제
const deleteArticle = async (req, res) => {
  try {
    // mongoDB 에 접속.
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    // ejs 에서 파라미터 값으로 전달하기 때문에 req.params.id
    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};

// // MySQL 을 위한 코드들
// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticles: (cb) => {
//     connection.query('SELECT * from mydb.board', (err, data) => {
//       if (err) throw err; // 에러 던지기
//       console.log(data); // 확인용
//       cb(data); // 데이터 전달. dbBoard.js 의 익명함수로 들어감.
//     });
//   },

//   // 게시글 추가하기
//   // 인자로, 받을 데이터, 데이터 보낼 콜백함수 순
//   writeArticle: (newArticle, cb) => {
//     // 벡틱에서 Enter 치면 개행문자가 들어감
//     connection.query(
//       `INSERT INTO mydb.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}', '${newArticle.title}', '${newArticle.content}');`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },

//   // 특정 ID 값을 가지는 게시글 찾기
//   getArticle: (id, cb) => {
//     connection.query(
//       `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data); // 데이터 전달
//       },
//     );
//   },

//   // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
//   // id, 수정 내용, 콜백함수(에러처리, 성공 시 콜백) 순
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },

//   // 특정 ID를 가지는 게시글 삭제하기
//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
