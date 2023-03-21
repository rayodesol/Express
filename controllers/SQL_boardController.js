const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기
  getAllArticles: (cb) => {
    connection.query('SELECT * from mydb.board', (err, data) => {
      if (err) throw err; // 에러 던지기
      console.log(data); // 확인용
      cb(data); // 데이터 전달. dbBoard.js 의 익명함수로 들어감.
    });
  },

  // 게시글 추가하기
  // 인자로, 받을 데이터, 데이터 보낼 콜백함수 순
  writeArticle: (newArticle, cb) => {
    // 벡틱에서 Enter 치면 개행문자가 들어감
    connection.query(
      `INSERT INTO mydb.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}', '${newArticle.title}', '${newArticle.content}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  // 특정 ID 값을 가지는 게시글 찾기
  getArticle: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data); // 데이터 전달
      },
    );
  },

  // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
  // id, 수정 내용, 콜백함수(에러처리, 성공 시 콜백) 순
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: (id, cb) => {
    connection.query(
      `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = boardDB;
