// ... 를 컨트롤 해주는 모델
const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
  // 생성자 함수
  {
    // 프로퍼티에 대한 설정값
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-user', // 컬렉션 이름 설정
  },
);

module.exports = mongoose.model('User', userSchema); // 밖에서는 User 로 지칭하겠다
// mongoose 이기에 쓸 수 있음. module 의 기본 함수는 아님.
