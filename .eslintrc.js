// module.exports = {
//   extends: ['airbnb-base'],

//   // 원하는 것만 바꿔서 사용가능
//   rules: {
//     // CRLF, LF 문제 자동 해결
//     'linebreak-style': 0,

//     // console.log 쓰면 밑줄 뜨는것을 막음
//     'no-console': 'off',

//     // ++ 연산자 사용 가능
//     'no-plusplus:': 'off',
//   },
// };

module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'nonblock-statement-body-position': 'off',
    'import/no-extraneous-dependencies': 'off',
    curly: 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    es6: true,
  },
};
