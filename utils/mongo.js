const mongo = require("mongodb").MongoClient;
const config = require("config");
const { DEFAULT_MONGO_URL } = config;

module.exports = {
  // 异步获取回调值的好方法
  getDB: function(callback) {
    try {
      mongo.connect(
        DEFAULT_MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(err, db) {
          if (err) throw err;
          callback(db);
        }
      );
    } catch {
      console.error("数据库连接失败！");
    }
  }
};

// const getMongoDB = function(dbname) {
//   return db.db[dbname];
// };

// const createCollect = function(collectName) {
//   return new Promise(resolve => {
//     try {
//       db.createCollection(collectName, function(err, res) {
//         if (err) throw err;
//         resolve(res);
//       });
//     } catch {
//       resolve(null);
//     }
//   });
// };

// const getCollect = function() {
//   return new Promise(resolve => {
//     db.collections().then(list => {
//       list.forEach(item => {
//         if (item.collectionName.indexOf(collectName) > -1) {
//           resolve(item);
//         }
//       });
//     });
//   });
// };

// const insert = function(sql) {
//   try {
//     if (sql.length) {
//       cur_collect.insertMany(sql, function(err, res) {
//         if (err) throw err;
//         console.log("插入成功！" + res);
//       });
//     } else {
//       cur_collect.insertOne(sql, function(err, res) {
//         if (err) throw err;
//         console.log("插入成功！" + res);
//       });
//     }
//   } catch {
//     console.error("插入失败！");
//   }
// };
// const select = function(collect, sql, options = {}) {
//   return new Promise(resolve => {
//     if (sql) {
//       try {
//         process(collect.find(sql)).toArray(function(err, result) {
//           if (err) throw err;
//           resolve(result);
//         });
//       } catch {
//         resolve([]);
//       }
//     }
//   });
// };
// module.exports = {
//   getMongoDB,
//   createCollect,
//   getCollect,
//   select,
//   insert
// };
