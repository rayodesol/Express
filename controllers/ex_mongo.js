const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// 실습
// connect() 인자는 err 뿐.
client.connect((err) => {
  // 호출된 client
  const member = client.db('kdt5').collection('member');

  // 모든 데이터 삭제
  member.deleteMany({}, (deleteManyErr, deleteManyResult) => {
    if (deleteManyErr) throw deleteManyErr;

    member.insertMany(
      [
        { name: '김민정', age: 24 },
        { name: '이유림', age: 26 },
        { name: '이찬호', age: 26 },
        { name: '김정혁', age: 26 },
        { name: '송민선', age: 29 },
      ],
      (insertManyErr, insertManyResult) => {
        if (insertManyErr) throw insertManyErr;

        member.insertOne(
          { name: '이효석', age: 39 },
          (insertOneErr, insertOneResult) => {
            if (insertOneErr) throw insertOneErr;

            member.deleteOne(
              { name: '김정혁' },
              (deleteOneErr, deleteOneResult) => {
                if (deleteOneErr) throw deleteOneErr;

                member.updateOne(
                  { name: '이효석' },
                  { $set: { name: '김정혁', age: 26 } },
                  (updateOneErr, updateOneResult) => {
                    if (updateOneErr) throw updateOneErr;

                    const cursor = member.find({ age: { $gte: 25 } });

                    cursor.toArray((toArrErr, toArrDate) => {
                      if (toArrErr) throw toArrErr;
                      console.log(toArrDate);
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  });
});
