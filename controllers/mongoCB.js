const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insertOne
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   // 데이터 모두 지우기. 지우는데 시간이 걸리므로 콜백함수.
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 에러가 발생하지 않으면 deleteErr 가 undefined 값이 들어옴.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   // 데이터 삽입.
//   // 넣고 싶은 데이터가 첫번째 인자.
//   // 시간이 걸리므로 콜백함수가 두번째 인자.
//   test.insertOne(
//     {
//       name: 'pororo',
//       age: 5,
//     },
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);
//     },
//   );

//   // // 23.03.20 수업
//   // // console.log(test);

//   // // 조건에 맞는 애들을 지워줌. {} -> 모든 것을 지움. 컬렉션 내부를 비움.
//   // // 조건, 콜백 순으로 인자 받음.
//   // test.deleteMany({}, (deleteErr, deleteResult) => {
//   //   if (deleteErr) throw deleteErr;
//   //   console.log(deleteResult);
//   //   test.insertOne(
//   //     {
//   //       name: '송민선',
//   //       nickName: 'cielo',
//   //     },
//   //     (insertErr, insertResult) => {
//   //       console.log(insertResult);
//   //       // client.close();

//   //       const findCursor = test.find({});
//   //       findCursor.toArray((err, data) => {
//   //         console.log(data);
//   //       });
//   //     },
//   //   );
//   // });
// });

// insertMany
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   // 데이터 모두 지우기. 지우는데 시간이 걸리므로 콜백함수.
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 에러가 발생하지 않으면 deleteErr 가 undefined 값이 들어옴.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   // 데이터 삽입.
//   // 넣고 싶은 데이터가 첫번째 인자. 배열로 넣음.
//   // 시간이 걸리므로 콜백함수가 두번째 인자.
//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);
//     },
//   );
// });

// deleteOne 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 데이터 3개가 정상적으로 삽입된 이후.
//       test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
//         if (deleteOneErr) throw deleteOneErr;
//         console.log(deleteOneResult);
//       });

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// deleteMany 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 5살 이상인 애를 지움.
//       test.deleteMany(
//         { age: { $gte: 5 } },
//         (deleteManyErr, deleteManyResult) => {
//           if (deleteManyErr) throw deleteManyErr;
//           console.log(deleteManyResult);
//         },
//       );

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// update 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 이름이 루피인 데이터를 찾아 이름을 한글로 수정.
//       test.updateOne(
//         { name: 'loopy' },
//         { $set: { name: '루피' } },
//         (updateErr, updateResult) => {
//           if (updateErr) throw updateErr;
//           console.log(updateResult);
//         },
//       );

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// updateMany 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 5살 이상인 데이터들의 이름을 수정.
//       test.updateMany(
//         { age: { $gte: 5 } },
//         { $set: { name: '5살 이상인 친구들' } },
//         (updateErr, updateResult) => {
//           if (updateErr) throw updateErr;
//           console.log(updateResult);
//         },
//       );

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// findOne 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 이름이 루피인 데이터 1개 찾기
//       // 해당 쿼리를 수행한 결과가 아닌, 찾은 데이터가 결과로 들어옴.
//       test.findOne({ name: 'loopy' }, (findErr, fineData) => {
//         if (findErr) throw findErr;
//         console.log(fineData);
//       });

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// find 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 이름이 루피인 데이터 다 찾기
//       const findCursor = test.find({ name: 'loopy' });
//       console.log(findCursor);
//       // toArray()로 배열로 뽑아오기
//       findCursor.toArray((toArrErr, toArrData) => {
//         if (toArrErr) throw toArrErr;
//         console.log(toArrData);
//       });

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// find 쿼리 - 모든 데이터 출력
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // 모든 데이터 찾기
//       const findCursor = test.find({});
//       console.log(findCursor);
//       // toArray()로 배열로 뽑아오기
//       findCursor.toArray((toArrErr, toArrData) => {
//         if (toArrErr) throw toArrErr;
//         console.log(toArrData);
//       });

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );
// });

// // 실습
// // connect() 인자는 err 뿐.
// client.connect((err) => {
//   // 호출된 client
//   const member = client.db('kdt5').collection('member');

//   // 모든 데이터 삭제
//   member.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//   });

//   // insertMany - 같은 줄 사람들 이름, 나이 추가
//   member.insertMany(
//     [
//       { name: '김민정', age: 23 },
//       { name: '이유림', age: 24 },
//       { name: '이찬호', age: 24 },
//       { name: '김정혁', age: 24 },
//       { name: '송민선', age: 27 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log('같은 줄 사람들 추가');
//       console.log(insertResult);

//       // client.close(); // 콜백함수에선 위치가 여기!
//     },
//   );

//   // insertOne - 앞 사람 이름, 나이 추가
//   member.insertOne(
//     { name: '신상아', age: 31 },
//     (insertOneErr, insertOneResult) => {
//       if (insertOneErr) throw insertOneErr;
//       console.log('앞 사람 추가');
//       console.log(insertOneResult);
//     },
//   );

//   // deleteOne - 옆 사람 도큐먼트 삭제
//   member.deleteOne({ name: '김정혁' }, (deleteOneErr, deleteOneResult) => {
//     if (deleteOneErr) throw deleteOneErr;
//     console.log('옆 사람 삭제');
//     console.log(deleteOneResult);
//   });

//   // update - 앞 사람 정보를 옆 사람 정보로 변경
//   member.updateOne(
//     { name: '신상아' },
//     { $set: { name: '김정혁', age: 24 } },
//     (updateErr, updateResult) => {
//       if (updateErr) throw updateErr;
//       console.log(updateResult);
//     },
//   );

//   // 25살 이상인 사람들 전부 찾아 콘솔로 출력
//   const findCursor = member.find({ age: { $gte: 25 } });

//   // toArray()로 배열로 뽑아오기
//   findCursor.toArray((toArrErr, toArrData) => {
//     if (toArrErr) throw toArrErr;
//     console.log(toArrData);
//   });
// });
