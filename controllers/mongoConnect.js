const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGO_DB_URI } = process.env;

const client = new MongoClient(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// 어느 파일에서나 require로 mongoDB 데이터 사용 가능!
module.exports = client;
