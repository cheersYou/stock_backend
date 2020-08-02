const mongoose = require("mongoose");
const config = require("config");
const conn = mongoose.createConnection(config.FUND_MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const Schema = mongoose.Schema;

const getFundList = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        日期: Date,
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
const getAllFundsList = async () => {
  let list = [];
  let cols = await conn.db.collections();
  for (let i in cols) {
    list.push(cols[i].collectionName.trim());
  }
  return list;
};

module.exports = { getFundList, getAllFundsList };
