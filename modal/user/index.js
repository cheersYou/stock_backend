const mongoose = require("mongoose");
const config = require("config");
const conn = mongoose.createConnection(config.USER_MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var Schema = mongoose.Schema;

// String Number Date Buffer Boolean Mixed ObjectId Array
// 对应一个document
const userLogin = function(collectName) {
  try {
    // 添加第三个参数的原因：https://blog.csdn.net/u014155400/article/details/47279507
    return conn.model(
      collectName,
      new Schema({
        name: String,
        password: String,
        code: String
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};

const userRegistry = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        name: String,
        password: String,
        code: String
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};

const userInfo = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        code: String,
        defaultFunds: Array,
        defaultStocks: Array,
        selfAddFunds: Array,
        selfAddStocks: Array,
        selfPortals: Array
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};
const naiCha = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        code: String,
        results: Array
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};
// 使用modules.exports导出User模块
module.exports = { userLogin, userRegistry, userInfo, naiCha };
