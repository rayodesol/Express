const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env;
// const MONGO_DB_URI =
//   'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      // 설정값 지정
      dbName: 'kdt5',
      useNewUrlParser: true, // 필수 옵션
    });

    console.log('몽구스 접속 성공');

    // 에러가 발생하면 콜백 형태로 에러 처리.
    // 몽구스가 몽고디비랑 문제 있을 때.
    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다!');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

connect();

module.exports = connect;
