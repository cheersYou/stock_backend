const mongoose = require("mongoose");
const config = require("config");
const conn = mongoose.createConnection(config.CONCEPT_MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const Schema = mongoose.Schema;

const getConceptList = function(collectName) {
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
const getConceptByDate = async () => {
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
const getConceptByName = async () => {
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
module.exports = { getConceptByName, getConceptByDate, getConceptList };
