const express = require('express');

const router = express.Router();

// http://localhost:4000/users 요청에 대한 처리
router.get('/', (req, res) => {
  res.render('users', { user: '송민선' });
});

module.exports = router;
