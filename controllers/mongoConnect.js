const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://songminseon95:qorehlfRjdit!@cluster0.ikt7r7r.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// 어느 파일에서나 require로 mongoDB 데이터 사용 가능!
module.exports = client;
