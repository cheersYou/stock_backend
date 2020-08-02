const mongoose = require("mongoose");
const config = require("config");
const conn = mongoose.createConnection(config.INDUSTRY_MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const Schema = mongoose.Schema;

const getIndustryList = function(collectName) {
  try {
    return conn.model(
      collectName,
      new Schema({
        日期: String,
        结果: Array
      }),
      collectName
    );
  } catch {
    return conn.collection(collectName);
  }
};
const getIndustryByDate = async () => {
  let list = [];
  let cols = await conn.db.collections();
  for (let i in cols) {
    let name = cols[i].collectionName.trim();
    if (name.indexOf("20") > -1) {
      list.push(name);
    }
  }
  return list;
};
const getIndustryByName = async () => {
  let list = [];
  let cols = await conn.db.collections();
  for (let i in cols) {
    let name = cols[i].collectionName.trim();
    if (name.indexOf("20") < 0) {
      list.push(name);
    }
  }
  return list;
};
module.exports = { getIndustryByName, getIndustryByDate, getIndustryList };
