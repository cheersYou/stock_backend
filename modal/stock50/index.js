const mongoose = require("mongoose");
const config = require("config");
// mongoose.connect(DEFAULT_MONGO_URL); 默认连接方式
const conn = mongoose.createConnection(config.STOCK50_MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const Schema = mongoose.Schema;
const getStockList = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        日期: String,
        收盘: Number,
        开盘: Number,
        高峰: Number,
        低峰: Number,
        交易量: String,
        跌涨幅: String
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};

const getAllStocksList = async () => {
  let list = [];
  let cols = await conn.db.collections();
  for (let i in cols) {
    list.push(cols[i].collectionName.trim());
  }
  return list;
};

module.exports = { getStockList, getAllStocksList };
