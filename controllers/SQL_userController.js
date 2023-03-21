// mydb 스키마까지 접속된 상태
const connection = require('./dbConnect');

const userDB = {
  // 중복 회원 찾기
  userCheck: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userId}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  // 회원가입하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) values ('${newUser.id}', '${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
