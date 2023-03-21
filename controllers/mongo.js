const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  // console.log(test);

  // 조건에 맞는 애들을 지워줌. {} -> 모든 것을 지움. 컬렉션 내부를 비움.
  // 조건, 콜백 순으로 인자 받음.
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: '송민선',
        nickName: 'cielo',
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        // client.close();

        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
