// DB 관련 모든 것을 처리하는 라우터
const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  // DB 와 통신
  userDB.getUsers((data) => {
    res.send(data);
  });
});

module.exports = router;
