const Router = require("koa-router");
const mongoUtils = require("../../utils/mongo");
const { getRandomColor } = require("../../utils/common");
const Module = require("../../modal/stock");
const Module50 = require("../../modal/stock50");
const Module300 = require("../../modal/stock300");
const ModuleHK = require("../../modal/stockhk");
const ModuleUS = require("../../modal/stockus");
const ModuleChina = require("../../modal/stockuschina");
let router = new Router();

function process(func, options) {
  const { limit, limitNum, sort, sortSql } = options;
  let res = func;
  if (limit && limitNum) {
    res = func.limit(limitNum);
  }
  if (sort && sortSql) {
    res = res.sort(sortSql);
  }
  return res;
}

router.get("stocklist", async ctx => {
  let { name } = ctx.request.query; // queryString
  let list = [Module, Module50, Module300, ModuleHK, ModuleUS, ModuleChina];
  let res = [];
  for (let i = 0; i < list.length; i++) {
    let StockList = list[i].getStockList(name);
    res = await StockList.find({});
    if (res && res.length) {
      break;
    }
  }
  ctx.response.body = res;
});

router.get("stocktables", async ctx => {
  let list = await Module.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
router.get("stocktables50", async ctx => {
  let list = await Module50.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
router.get("stocktables300", async ctx => {
  let list = await Module300.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
router.get("stocktableshk", async ctx => {
  let list = await ModuleHK.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
router.get("stocktableschina", async ctx => {
  let list = await ModuleChina.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
router.get("stocktablesus", async ctx => {
  let list = await ModuleUS.getAllStocksList();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "stock",
    list: temps || []
  };
  ctx.response.body = res;
});
module.exports = router;
