const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// // insertOne
// async function main() {
//   await client.connect();
//   const test = client.db('kdt5').collection('test');

//   const deleteManyResult = await test.deleteMany({});
//   if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

//   const insertOneResult = await test.insertOne({ name: 'pororo', age: 5 });
//   if (!insertOneResult.acknowledged) return '데이터 삽입 에러 발생';
//   console.log(insertOneResult);
// }

// // try-catch 문 사용
// async function main() {
//   // 에러가 발생할 거 같은 부분은 try 로 묶음.
//   try {
//     await client.connect();
//     const test = client.db('kdt5').collection('test');

//     await test.deleteMany({});
//     await test.insertOne({ name: 'pororo', age: 5 });
//   } catch (err) {
//     console.error(err);
//   }
// }

// // 삭제, 수정
// // insertMany
// async function main() {
//   await client.connect();
//   const test = client.db('kdt5').collection('test');

//   const deleteManyResult = await test.deleteMany({});
//   if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

//   const insertManyResult = await test.insertMany([
//     { name: 'pororo', age: 5 },
//     { name: 'crong', age: 4 },
//     { name: 'loopy', age: 6 },
//   ]);
//   if (!insertManyResult.acknowledged) return '데이터 삽입 에러 발생';

//   // // deleteMany - 5살 이상인 데이터 삭제
//   // const deleteManyResultSec = await test.deleteMany({ age: { $gte: 5 } });
//   // console.log(deleteManyResultSec);

//   // updateMany - 5살 이상인 데이터 이름 수정
//   const updateManyResult = await test.updateMany(
//     { age: { $gte: 5 } },
//     { $set: { name: '5살 이상' } },
//   );
//   console.log(updateManyResult);
// }

// 검색
async function main() {
  // try-catch 문
  try {
    await client.connect();
    const test = client.db('kdt5').collection('test');

    await test.deleteMany({});

    await test.insertMany([
      { name: 'pororo', age: 5 },
      { name: 'crong', age: 4 },
      { name: 'loopy', age: 6 },
    ]);

    const findCursor = test.find({ age: { $gte: 5 } });
    const dataArr = await findCursor.toArray();
    return dataArr;
  } catch (err) {
    console.error(err);
  }

  // await client.connect();
  // const test = client.db('kdt5').collection('test');

  // const deleteManyResult = await test.deleteMany({});
  // if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

  // const insertManyResult = await test.insertMany([
  //   { name: 'pororo', age: 5 },
  //   { name: 'crong', age: 4 },
  //   { name: 'loopy', age: 6 },
  // ]);
  // if (!insertManyResult.acknowledged) return '데이터 삽입 에러 발생';

  // const findCursor = test.find({ age: { $gte: 5 } });
  // const dataArr = await findCursor.toArray(); // findCursor 에서 데이터 뽑아내기
  // console.log(dataArr);
}

main();
