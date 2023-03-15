// 서버 접속용 코드
// 어디서든 이 파일만 부르면 mysql 과 통신가능한 코드
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 아이디를 따로 만들었다면 그 아이디로
  password: '12345678',
  port: '3306',
  database: 'mydb',
});

// 실행
connection.connect();

// 어디서나 쓰기 위해 모듈로 빼줌
module.exports = connection;
