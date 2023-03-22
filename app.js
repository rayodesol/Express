const express = require('express'); // commonJS 방식
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// 중요한 내용 부분
const app = express(); // express 프레임워크를 실행시켜 저장
const { PORT } = process.env; // 포트번호 지정. 3000번대는 react와 겹치므로 안 쓰는 것을 추천.

// 서버 설정이 들어가는 부분
app.use(cors()); // cors 패키지를 쓰라는.
app.set('view engine', 'ejs'); // 뷰 엔진 적용
app.use(express.static('public')); // public 이란 폴더를 static 폴더로 만듦
app.use(express.json()); // 라우터 위에 쓰기!! bodyParser 는 옛날 것! express 로 쓰기!
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('cielo')); // 쿠키를 만들어 브라우저에 뿌릴 수 있게 됨.
app.use(
  session({
    secret: 'song', // 기억할 수 있는 암호
    resave: false,
    saveUninitialized: true, // 일단 세션 만들고 시작

    // maxAge 가 세션 속성값보다 선행돼서 이 부분이 있다면 브라우저를 꺼도 게시판 열림.
    // cookie: {
    //   maxAge: 1000 * 60 * 60, // 1시간
    // },
  }),
);

// 라우터 설정 부분
const mainRouter = require('./routes'); // /index.js 생략 가능
const userRouter = require('./routes/users'); // .js 생략 가능
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// 주소 등록
app.use('/', mainRouter); // 이 주소로 들어오는 애들은 모두 mainRouter 가 처리한다
app.use('/users', userRouter); // /users 주소로 들어오면 이 라우터가 처리
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// 에러 출력. 4개 인자를 모두 작성해야.
// 매개변수에 next 없으면 에러 받아 올 수 없음.
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

// 서버를 최초 실행시켜주는 메소드
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다!`);
});
