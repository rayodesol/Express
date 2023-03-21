const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    // client에 접속
    await client.connect();

    const member = client.db('kdt5').collection('member');

    await member.deleteMany({});

    await member.insertMany([
      { name: '김민정', age: 23 },
      { name: '이유림', age: 24 },
      { name: '이찬호', age: 24 },
      { name: '김정혁', age: 24 },
      { name: '송민선', age: 27 },
    ]);

    await member.insertOne({ name: '최두루', age: 30 });

    await member.deleteOne({ name: '김정혁' });

    await member.updateOne(
      { name: '최두루' },
      { $set: { name: '김정혁', age: 24 } },
    );

    const findCursor = member.find({ age: { $gte: 25 } });
    const dataArr = await findCursor.toArray();
    console.log(dataArr);
  } catch (err) {
    console.error(err);
  }
}

main();
