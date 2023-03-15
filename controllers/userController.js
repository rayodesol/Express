// mydb 스키마까지 접속된 상태
const connection = require('./dbConnect');

const userDB = {
  // 회원 정보를 모두 가져다 주는. 쓰임을 위해 함수로 정의한 것.
  getUsers: (cb) => {
    // 인자가 에러, 데이터 순으로 들어감.
    connection.query('SELECT * FROM mydb.user;', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data); // 원하는 데이터가 콜백으로 전달. 데이터를 읽은 후 데이터를 넣어 전달하므로 콜백 사용.
    });
  },
};

module.exports = userDB;
